import { app, session } from "electron";

const filter = {
  urls: ["https://www.kuwo.cn/*"],
};

const headers = {
  cookie:
    "Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1747998937; HMACCOUNT=3E88140C4BD6BF25; _ga=GA1.2.2122710619.1747998937; _gid=GA1.2.1827944406.1747998937; gtoken=RNbrzHWRp6DY; gid=d55a4884-42aa-4733-98eb-e7aaffc6122e; JSESSIONID=us1icx6617iy1k1ksiuykje71; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1748000521; _gat=1; _ga_ETPBRPM9ML=GS2.2.s1747998937$o1$g1$t1748000535$j45$l0$h0; Hm_Iuvt_cdb524f42f23cer9b268564v7y735ewrq2324=jbikFazGJzBjt2bhSJGMxGfkM5zNYcis",
  secret: "4932e2c95746126c945fe2fb3f88d3455b85b69a4fbdfa6c44b501d7dfe50cff04eb9a8e",
};

app.whenReady().then(() => {
  session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    details.requestHeaders["cookie"] = headers.cookie;
    details.requestHeaders["secret"] = headers.secret;
    details.requestHeaders["host"] = "www.kuwo.cn";
    details.requestHeaders["referer"] = "https://www.kuwo.cn/";
    details.requestHeaders["User-Agent"] =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0";
    callback({ requestHeaders: details.requestHeaders });
  });
});

async function fetchHeaders() {
  const res = await fetch("https://cdn.jjdd.site/data/kuwo.json");
  const json = await res.json();
  Object.assign(headers, json);
}
fetchHeaders();
