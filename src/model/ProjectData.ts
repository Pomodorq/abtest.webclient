import { UserData } from 'model/UsersData';
import { http } from 'api/http';

export interface ProjectData {
  $state: 'exist' | 'new';
  projectId?: number | null;
  name: string;
  projectUsers?: UserData[] | null;
}

export const getProjects = async (): Promise<ProjectData[]> => {
  const result = await http<ProjectData[]>({
    path: `/projects`,
  });
  if (result.ok && result.body) {
    return result.body;
  } else {
    return [];
  }
};

export const postProject = async (
  project: ProjectData,
): Promise<ProjectData | undefined> => {
  const result = await http<ProjectData, ProjectData>({
    path: `/projects`,
    method: 'post',
    body: project,
  });
  if (result.ok && result.body) {
    return result.body;
  } else {
    return undefined;
  }
};
