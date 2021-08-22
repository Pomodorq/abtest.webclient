import { BarDatum } from '@nivo/bar';
import { http } from 'api/http';
import { ProfilerMsg } from 'model/ProfilerMsg';

export interface LifetimeIntervalCount extends BarDatum {
  lifetimeInterval: string;
  count: number;
}

const getProfilerMsgsFromHeader = (response: Response): ProfilerMsg[] => {
  const keyValuesStr = response.headers.get('Profiler-Info');
  if (!keyValuesStr) return [];
  let result: ProfilerMsg[] = [];
  keyValuesStr.split(',').forEach((keyValue) => {
    result.push({
      actionName: keyValue.split('=')[0],
      time: parseFloat(keyValue.split('=')[1]),
    });
  });
  return result;
};

export const getLifetimeCountsByIntervals = async (
  projectId: number,
  profilerLog?: (x: ProfilerMsg) => void,
): Promise<LifetimeIntervalCount[]> => {
  const result = await http<LifetimeIntervalCount[]>({
    path: `/projects/${projectId}/users/distribution/interval`,
  });
  if (result.ok && result.body) {
    if (profilerLog)
      getProfilerMsgsFromHeader(result.response).forEach((x) => profilerLog(x));
    return result.body;
  } else {
    return [];
  }
};
