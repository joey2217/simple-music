/**
 * 洗牌算法
 */
export function shuffle<T = unknown>(list: T[]) {
  const arr = list.slice()
  let n = arr.length
  let random
  while (0 !== n) {
    random = (Math.random() * n--) >>> 0 // 无符号右移位运算符向下取整
    //或者改写成 random = Math.floor(Math.random() * n--)
    ;[arr[n], arr[random]] = [arr[random], arr[n]] // ES6的解构赋值实现变量互换
  }
  return arr
}
