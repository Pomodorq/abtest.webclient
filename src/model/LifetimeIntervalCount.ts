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
      time: parseInt(keyValue.split('=')[1]),
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

export const getLifetimeCountsByRange = async (
  projectId: number,
): Promise<LifetimeIntervalCount[]> => {
  const result = await http<LifetimeIntervalCount[]>({
    path: `/projects/${projectId}/users/distribution/range`,
  });
  if (result.ok && result.body) {
    return result.body;
  } else {
    return [];
  }
};

export const getRollingRetention = async (
  projectId: number,
  days: number,
  date: Date | null = null,
): Promise<number | null> => {
  let path =
    `/projects/${projectId}/users/rolling-retention?days=${days}` +
    (date ? `&date=${date?.toISOString()}` : '');
  const result = await http<number>({
    path,
  });
  if (result.ok && result.body) {
    return result.body;
  } else {
    return null;
  }
};
