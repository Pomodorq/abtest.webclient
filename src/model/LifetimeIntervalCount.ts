import { BarDatum } from '@nivo/bar';
import { http } from 'api/http';

export interface LifetimeIntervalCount extends BarDatum {
  lifetimeInterval: string;
  count: number;
}

export const getLifetimeCountsByIntervals = async (
  projectId: number,
): Promise<LifetimeIntervalCount[]> => {
  const result = await http<LifetimeIntervalCount[]>({
    path: `/projects/${projectId}/users/distribution/interval`,
  });
  if (result.ok && result.body) {
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
