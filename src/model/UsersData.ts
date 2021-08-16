import { http } from '../api/http';
import { ProjectData } from 'model/ProjectData';

export interface UserDataServer {
  id: number;
  userId: number;
  projectId: number;
  dateRegistration: string;
  dateLastActivity: string;
  project?: ProjectData | null;
}

export interface UserData {
  $state: 'exist' | 'new';
  id?: number | null;
  userId: number;
  projectId: number;
  dateRegistration: Date;
  dateLastActivity: Date;
  project?: ProjectData | null;
}

export const mapUserFromServer = (user: UserDataServer): UserData => ({
  ...user,
  dateRegistration: new Date(user.dateRegistration + '-00:00'),
  dateLastActivity: new Date(user.dateLastActivity + '-00:00'),
  $state: 'exist',
});

export const getUsers = async (projectId: number): Promise<UserData[]> => {
  const result = await http<UserDataServer[]>({
    path: `/projects/${projectId}/users`,
  });
  if (result.ok && result.body) {
    return result.body.map(mapUserFromServer);
  } else {
    return [];
  }
};

export const postUser = async (
  user: UserData,
  projectId: number,
): Promise<UserData | undefined> => {
  const result = await http<UserDataServer, UserData>({
    path: `/projects/${projectId}/users`,
    method: 'post',
    body: user,
  });
  if (result.ok && result.body) {
    return mapUserFromServer(result.body);
  } else {
    return undefined;
  }
};

export const postUsers = async (
  users: UserData[],
  projectId: number,
): Promise<boolean> => {
  const result = await http<boolean, UserData[]>({
    path: `/projects/${projectId}/users/many`,
    method: 'post',
    body: users,
    nobody: true,
  });
  return result.ok;
};

export const deleteUsers = async (projectId: number): Promise<boolean> => {
  const result = await http({
    path: `/projects/${projectId}/users`,
    method: 'delete',
    nobody: true,
  });
  return result.ok;
};
