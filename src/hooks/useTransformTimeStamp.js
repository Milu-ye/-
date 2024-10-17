//将时间戳转化为分秒时间字符串
export default (timestamp) => {
  const time = `${Math.floor(timestamp / 60) < 10 ? '0' + Math.floor(timestamp / 60) : Math.floor(timestamp / 60)}:${Math.floor(timestamp % 60) < 10 ? '0' + Math.floor(timestamp % 60) : Math.floor(timestamp % 60)}`
  return time
}
