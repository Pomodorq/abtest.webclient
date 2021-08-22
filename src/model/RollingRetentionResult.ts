import { http, HttpResponse } from '../api/http';

export interface RollingRetentionResult {
  value: number;
}

export const getRollingRetention = async (
  projectId: number,
  days: number,
): Promise<HttpResponse<RollingRetentionResult>> => {
  let path = `/projects/${projectId}/users/rolling-retention?days=${days}`;
  const result = await http<RollingRetentionResult>({
    path,
  });
  return result;
};
