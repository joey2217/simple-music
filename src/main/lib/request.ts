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

const BASE_URL = "https://www.kuwo.cn";

export async function fetcher<R = unknown>(input: string, init?: RequestInit): Promise<R> {
  const url = input.startsWith("http") ? new URL(input) : new URL(input, BASE_URL);
  url.searchParams.set("reqId", reqId);
  url.searchParams.set("httpsStatus", "1");
  const res = await fetch(url, init);
  const json: ResponseData<R> = await res.json();
  if (res.ok) {
    if (json.code === 200) {
      return json.data;
    } else {
      console.error("fetch error with code", res, json);
      throw new Error(json.msg);
    }
  } else {
    console.error("fetch error", res);
    throw new Error("fetch error");
  }
}
