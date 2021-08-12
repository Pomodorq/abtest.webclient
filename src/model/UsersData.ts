import { http } from '../api/http';

export interface ProjectData {
  projectId: number;
  name: string;
  projectUsers?: UserDataServer[] | null;
}

export interface UserDataServer {
  id: number;
  userId: number;
  projectId: number;
  dateRegistration: string;
  dateLastActivity: string;
  project?: ProjectData | null;
}

export interface UserData {
  id: number;
  userId: number;
  projectId: number;
  dateRegistration: Date;
  dateLastActivity: Date;
  project?: ProjectData | null;
}

export const mapUserFromServer = (user: UserDataServer): UserData => ({
  ...user,
  dateRegistration: new Date(user.dateRegistration),
  dateLastActivity: new Date(user.dateLastActivity),
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

// export const getUser = async (userId: number): Promise<UserData | null> => {
//   const result = await http<UserDataServer>({
//     path: `/users/${userId}`,
//   });
//   if (result.ok && result.body) {
//     return mapUserFromServer(result.body);
//   } else {
//     return null;
//   }
// };

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
  });
  return result.ok;
};
