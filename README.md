# React + TypeScript + Vite

## [howler](https://www.npmjs.com/package/howler)


## [node-id3](https://www.npmjs.com/package/node-id3)

```js
E$e = (e, t) => {
        const n = cwe;
        return t == n.HQ ? t = "2" : t == n.SQ ? t = "3" : t == n.ZQ ? t = "4" : t = "1", `https://m.music.migu.cn/migumusic/h5/play/auth/getSongPlayInfo?copyrightId=${e}&type=${t}`
    }, Ud = e => `https://m.music.migu.cn/migumusic/h5/song/lyric?copyrightId=${e}`,
    M$e = e => `https://app.c.nf.migu.cn/MIGUM3.0/v1.0/content/querycontentbyId.do?needAll=0&columnId=${e}`,
    _$e = (e, t) => `https://app.c.nf.migu.cn/MIGUM3.0/bmw/singer-index/list/v1.0?templateVersion=3&tab=${e}-${t}`,
    A$e = e => `https://m.music.migu.cn/migumusic/h5/singer/getSingerDetail?singerId=${e}`,
    D$e = (e, t, n, o) => `https://m.music.migu.cn/migumusic/h5/singer/getSingerSAM?singerId=${e}&pageNo=${t}&pageSize=${n}&sam=${o}`,
    R$e = () => "https://m.music.migu.cn/migumusic/h5/playlist/allTag",
    B$e = (e, t, n) => `https://m.music.migu.cn/migumusic/h5/playlist/list?columnId=15127272&tagId=${e}&pageNum=${t}&pageSize=${n}`,
    L$e = (e, t, n) => `https://m.music.migu.cn/migumusic/h5/playlist/songsInfo?palylistId=${e}&pageNo=${t}&pageSize=${n}`,
    F$e = e => `https://m.music.migu.cn/migumusic/h5/album/info?albumId=${e}`,
    N$e = (e, t, n) => `https://m.music.migu.cn/migumusic/h5/search/all?text=${e}&pageNo=${t}&pageSize=${n}`,
    H$e = (e, t, n) => `https://m.music.migu.cn/migumusic/h5/search/songList?text=${e}&pageNo=${t}&pageSize=${n}`,
    z$e = () => "https://music.migu.cn/v3/api/search/hotwords";
```

```js
const t=["男歌手","女歌手","组合"],s=["华语","欧美","日韩"];
var h=e=>{c.value=e,r()},x=e=>{l.value=e,r()};
async function r(){_.value=!1,o.value=[],await P(p(s[l.value]),p(t[c.value]))
.then(e=>{e.length==0&&(_.value=!0),o.value=e})}
function p(e){return e==t[0]?"nan":e==t[1]?"nv":e==t[2]?"group":e==s[0]?"huayu":e==s[1]?"oumei":e==s[2]?"rihan":"nan"}
```

[banner](https://m.music.migu.cn/migumusic/h5/home/banner)