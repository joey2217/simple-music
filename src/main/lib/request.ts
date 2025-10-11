export const reqId = crypto.randomUUID();

export interface ResponseData<T = unknown> {
  code: 200;
  curTime: number;
  data: T;
  msg: string;
  profileId: string;
  reqId: string;
  tId: string;
}

export async function fetcher<R = unknown>(input: string, init?: RequestInit): Promise<R> {
  const response = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
    },
  });
  const json: ResponseData<R> = await response.json();
  if (response.ok && json.code === 200) {
    return json.data;
  } else {
    throw new Error(json.msg);
  }
}

function get<R = unknown>(url: string, query?: Record<string, unknown>, init?: RequestInit) {
  let input = url;
  if (query == null) {
    query = {};
  }
  query.reqId = reqId;
  query.httpsStatus = 1;
  const params = Object.fromEntries(
    Object.entries(query)
      .filter(([, value]) => value != null && value !== "")
      .map(([key, value]) => [key, String(value)]),
  );
  const queryString = new URLSearchParams(params).toString();
  if (queryString) {
    input += `?${queryString}`;
  }
  return fetcher<R>(input, {
    ...init,
    method: "GET",
  });
}

function post<R = unknown, D = unknown>(url: string, data?: D, init?: RequestInit) {
  return fetcher<R>(url, {
    ...init,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

function put<R = unknown, D = unknown>(url: string, data?: D, init?: RequestInit) {
  return fetcher<R>(url, {
    ...init,
    method: "put",
    body: data ? JSON.stringify(data) : undefined,
  });
}

function remove<R = unknown>(url: string, query?: Record<string, unknown>, init?: RequestInit) {
  let input = url;
  if (query) {
    const queryString = new URLSearchParams(query as Record<string, string>).toString();
    input += `?${queryString}`;
  }
  return fetcher<R>(input, {
    ...init,
    method: "DELETE",
  });
}

export const request = {
  request: fetcher,
  get,
  post,
  put,
  delete: remove,
};

export default request;
