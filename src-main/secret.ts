// /* eslint-disable */
// // @ts-nocheck

// import { app, session } from "electron";

// export function f(t, e) {
//   if (null == e || e.length <= 0) return null;
//   for (var n = "", i = 0; i < e.length; i++) n += e.charCodeAt(i).toString();
//   var o = Math.floor(n.length / 5),
//     r = parseInt(n.charAt(o) + n.charAt(2 * o) + n.charAt(3 * o) + n.charAt(4 * o) + n.charAt(5 * o)),
//     c = Math.ceil(e.length / 2),
//     l = Math.pow(2, 31) - 1;
//   if (r < 2) return null;
//   var d = Math.round(1e9 * Math.random()) % 1e8;
//   for (n += d; n.length > 10; ) n = (parseInt(n.substring(0, 10)) + parseInt(n.substring(10, n.length))).toString();
//   n = (r * n + c) % l;
//   var f = "",
//     h = "";
//   for (i = 0; i < t.length; i++)
//     (h += (f = parseInt(t.charCodeAt(i) ^ Math.floor((n / l) * 255))) < 16 ? "0" + f.toString(16) : f.toString(16)),
//       (n = (r * n + c) % l);
//   for (d = d.toString(16); d.length < 8; ) d = "0" + d;
//   return (h += d);
// }

// const filter = {
//   urls: ["https://www.kuwo.cn/*"],
// };

// const KUWO_URL = "https://www.kuwo.cn";

// const secret_cookies_key = "Hm_Iuvt_cdb524f42f23cer9b268564v7y735ewrq2324";
// const cookieArr = [
//   {
//     name: "Hm_lvt_cdb524f42f0ce19b169a8071123a4797",
//     value: "1747998937",
//   },
//   { name: "HMACCOUNT", value: "3E88140C4BD6BF25" },
//   { name: "_ga", value: "GA1.2.2122710619.1747998937" },
//   { name: "_gid", value: "GA1.2.1827944406.1747998937" },
//   { name: "gtoken", value: "RNbrzHWRp6DY" },
//   { name: "gid", value: "d55a4884-42aa-4733-98eb-e7aaffc6122e" },
//   { name: "JSESSIONID", value: "us1icx6617iy1k1ksiuykje71" },
//   {
//     name: "Hm_lpvt_cdb524f42f0ce19b169a8071123a4797",
//     value: (Date.now() / 1000).toString(),
//   },
//   { name: "_gat", value: "1" },
//   {
//     name: "_ga_ETPBRPM9ML",
//     value: "GS2.2.s1747998937$o1$g1$t1748000535$j45$l0$h0",
//   },
// ];
// const secret_cookies = {
//   name: secret_cookies_key,
//   value: "jbikFazGJzBjt2bhSJGMxGfkM5zNYcis",
// };

// let secret = "4932e2c95746126c945fe2fb3f88d3455b85b69a4fbdfa6c44b501d7dfe50cff04eb9a8e";

// let cookies = cookieArr
//   .concat(secret_cookies)
//   .map((c) => `${c.name}=${c.value}`)
//   .join("; ");

// app.whenReady().then(() => {
//   session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
//     details.requestHeaders["cookie"] = cookies;
//     details.requestHeaders["secret"] = secret;
//     details.requestHeaders["host"] = "www.kuwo.cn";
//     details.requestHeaders["referer"] = "https://www.kuwo.cn/";
//     details.requestHeaders["User-Agent"] =
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0";
//     // console.log("onBeforeSendHeaders secret", secret);
//     callback({ requestHeaders: details.requestHeaders });
//   });
// });

// async function refreshCookie() {
//   try {
//     const res = await fetch("https://www.kuwo.cn/favicon.ico?v=1");
//     // Hm_Iuvt_cdb524f42f23cer9b268564v7y735ewrq2324=mnReCYRwZrmikSyfn6R6R8kn8JkNBjCR; path=/; expires=Wed, 22 Oct 2025 07:32:13 GMT
//     const cookieStr = res.headers.get("set-cookie");
//     const arr = cookieStr.split(";");
//     const cookie = Object.fromEntries(
//       arr.map((item) => {
//         const [key, value] = item.split("=");
//         return [key.trim(), value.trim()];
//       }),
//     ) as Record<typeof secret_cookies_key | "path" | "expires", string>;
//     const value = cookie[secret_cookies_key];
//     cookies = `${secret_cookies_key}=${value}`;
//     session.defaultSession.cookies.set({
//       url: KUWO_URL,
//       name: secret_cookies_key,
//       value,
//       expirationDate: new Date(cookie.expires).getTime() / 1000,
//     });
//     secret_cookies.value = value;
//     secret = f(value, secret_cookies_key);
//   } catch (error) {
//     console.error(error, "refreshCookie error");
//   }
// }

// function initCookie() {
//   session.defaultSession.cookies
//     .get({
//       url: KUWO_URL,
//       name: secret_cookies_key,
//     })
//     .then((cookies) => {
//       console.log("initCookie cookies", cookies.length);
//       if (cookies.length === 0) {
//         refreshCookie();
//       } else {
//         const value = cookies[0].value;
//         secret = f(value, secret_cookies_key);
//       }
//     })
//     .catch((error) => {
//       refreshCookie();
//       console.log(error, "initCookie error");
//     });
// }
