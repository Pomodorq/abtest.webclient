import { webAPIUrl } from '../AppSettings';

export interface HttpRequest<REQB> {
  path: string;
  method?: string;
  body?: REQB;
}
export interface HttpResponse<RESB> {
  ok: boolean;
  body?: RESB;
  problem?: ProblemDetails;
  response: Response;
}

export interface ProblemDetails {
  type?: string;
  title: string;
  status: number;
  detail?: string;
}

export const http = async <RESB, REQB = undefined>(
  config: HttpRequest<REQB>,
): Promise<HttpResponse<RESB>> => {
  const request = new Request(`${webAPIUrl}${config.path}`, {
    method: config.method || 'get',
    headers: {
      'Content-Type': 'application/json',
    },
    body: config.body ? JSON.stringify(config.body) : undefined,
  });

  const response = await fetch(request);

  const contentType = response.headers.get('content-type');

  let body;
  if (
    contentType &&
    (contentType.indexOf('application/json') !== -1 ||
      contentType.indexOf('application/problem+json') !== -1)
  ) {
    body = await response.json();
  }

  if (!body) {
    return { ok: response.ok, response };
  }

  if (response.ok) {
    return { ok: response.ok, body, response };
  } else {
    return { ok: response.ok, problem: body, response };
  }
};
