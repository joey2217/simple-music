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

const BASE_URL = "https://wapi.kuwo.cn";

export async function fetcher<R = unknown>(input: string): Promise<R> {
  const url = new URL(input, BASE_URL);
  url.searchParams.set("reqId", reqId);
  url.searchParams.set("httpsStatus", "1");
  const res = await fetch(url);
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

// async function _fetcher<R = unknown>(input: string, init?: RequestInit): Promise<R> {
//   const res = await fetch(`${BASE_URL}${input}`, {
//     ...init,
//     headers: {
//       ...init?.headers,
//     },
//   });
//   const json: ResponseData<R> = await res.json();
//   if (res.ok) {
//     if (json.code === 200) {
//       return json.data;
//     } else {
//       console.error("fetch error with code", res, json);
//       throw new Error(json.msg);
//     }
//   } else {
//     console.error("fetch error", res);
//     throw new Error("fetch error");
//   }
// }

// function get<R = unknown>(url: string, query?: Record<string, unknown>, init?: RequestInit) {
//   let input = url;
//   if (query == null) {
//     query = {};
//   }
//   query.reqId = reqId;
//   query.httpsStatus = 1;
//   const params = Object.fromEntries(
//     Object.entries(query)
//       .filter(([, value]) => value != null && value !== "")
//       .map(([key, value]) => [key, String(value)]),
//   );
//   const queryString = new URLSearchParams(params).toString();
//   if (queryString) {
//     input += `?${queryString}`;
//   }
//   return _fetcher<R>(input, {
//     ...init,
//     method: "GET",
//   });
// }

// function post<R = unknown, D = unknown>(url: string, data?: D, init?: RequestInit) {
//   return _fetcher<R>(url, {
//     ...init,
//     method: "POST",
//     body: data ? JSON.stringify(data) : undefined,
//   });
// }

// function put<R = unknown, D = unknown>(url: string, data?: D, init?: RequestInit) {
//   return _fetcher<R>(url, {
//     ...init,
//     method: "put",
//     body: data ? JSON.stringify(data) : undefined,
//   });
// }

// function remove<R = unknown>(url: string, query?: Record<string, unknown>, init?: RequestInit) {
//   let input = url;
//   if (query) {
//     const queryString = new URLSearchParams(query as Record<string, string>).toString();
//     input += `?${queryString}`;
//   }
//   return _fetcher<R>(input, {
//     ...init,
//     method: "DELETE",
//   });
// }

// export const request = {
//   request: _fetcher,
//   get,
//   post,
//   put,
//   delete: remove,
// };

// export default request;
