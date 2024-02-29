# React + TypeScript + Vite

https://ui.shadcn.com/docs/installation

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

> https://m.music.migu.cn/migumusic/h5/song/info?copyrightId=69918307280

 
 ```txt
@migu music@
[00:06.043] 演唱：许飞
[00:08.523] 作词：杜菁菁
[00:09.987] 作曲：郭亦浓
[00:11.850] 编曲：何诗蒙
[00:13.152] 吉他：郭亦浓
[00:14.639] 混音：张晟玮
[00:15.965] 制作人：郭亦浓
[00:17.174] 监制：索以
[00:18.215] 统筹：权布布
[00:19.261] 企划：唱故事的人
[00:20.028] 出品：新华网
[00:20.632]
[00:22.103] 时针到了出发的点
[00:26.054] 车票陪我到了窗前
[00:30.041] 腊月的炊烟、妈妈的侧脸
[00:33.957] 我在循环的歌里想念
[00:38.186] 空气轻轻到了鼻尖
[00:41.945] 摇晃的心到了天边
[00:45.977] 一站又一站、清晨到夜晚
[00:49.932] 我知道家的路不再遥远
[00:54.736] 有多少小心地问啊 就有多少湿了的眼
[01:03.971] 围成的团圆 沾着光的时间
[01:11.048] 你到哪儿了 到哪儿了
[01:15.493] 外面冷吗 路还好走吗
[01:20.019] 我在路上 在路上
[01:24.107] 和儿时一样伴着暖阳
[01:27.225] 你到哪儿了 到哪儿了
[01:31.758] 车准时吗 路还很远吗
[01:35.770] 我在路上 在路上
[01:39.989] 回家的月光在为我照亮
[01:48.201]
[01:52.284] 说不出的到了心里
[01:56.165] 藏不住的到了眼底
[02:00.181] 白了的发际 颤抖的手臂
[02:04.033] 我多想在下一秒就拥抱你
[02:08.761] 有多少小心地问啊 就有多少湿了的眼
[02:17.920] 围成的团圆 沾着光的时间
[02:24.575]
[02:25.041] 你到哪儿了 到哪儿了
[02:29.888] 外面冷吗 路还好走吗
[02:34.078] 我在路上 在路上
[02:38.027] 和儿时一样伴着暖阳
[02:41.222] 你到哪儿了 到哪儿了
[02:45.378] 车准时吗 路还很远吗
[02:50.121] 我在路上 在路上
[02:54.139] 回家的月光在为我照亮
[03:02.235] 收拾好的房间等了多少年
[03:05.997] 早做好的饭菜又热了多少遍
[03:10.196] 有人盼着有人念 两颗心永不会断的线
[03:19.376] 你到哪儿了 到哪儿了
[03:23.674] 外面冷吗 路还好走吗
[03:28.095] 我在路上 在路上
[03:32.104] 和儿时一样伴着暖阳
[03:35.169] 你到哪儿了 到哪儿了
[03:39.907] 车准时吗 路还很远吗
[03:44.041] 我在路上 在路上
[03:48.004] 回家的月光在为我照亮
[03:56.094] 回家的月光在为我照亮
[04:16.094] 版权声明：未经著作权人书面许可，任何人不得以任何方式使用（包括翻唱、翻录等）
 ```