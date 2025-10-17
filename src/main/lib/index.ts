// import { LyricRow } from '../types/player'

/**
 * 洗牌算法
 */
export function shuffle<T = unknown>(list: T[]) {
  const arr = list.slice();
  let n = arr.length;
  let random;
  while (0 !== n) {
    random = (Math.random() * n--) >>> 0; // 无符号右移位运算符向下取整
    //或者改写成 random = Math.floor(Math.random() * n--)
    [arr[n], arr[random]] = [arr[random], arr[n]]; // ES6的解构赋值实现变量互换
  }
  return arr;
}

// const LYRIC_SPLITTER = '\r\n'
// const LYRIC_RE = /\[(\d{2}):(\d{2}).\d{2,3}\](.*)/

// export function parseLyric(lyricStr: string): LyricRow[] {
//   if (!lyricStr) {
//     return []
//   }
//   return lyricStr
//     .replace('@migu music@', '')
//     .split(LYRIC_SPLITTER)
//     .map((s) => {
//       const match = s.match(LYRIC_RE)
//       if (match) {
//         return {
//           time: parseInt(match[1]) * 60 + parseInt(match[2]),
//           words: match[3],
//         }
//       }
//       return {
//         words: s,
//       }
//     })
// }
