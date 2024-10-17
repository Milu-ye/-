export default (index, singerObjArr) => {
  const singers = singerObjArr && singerObjArr[index].ar
  const singerList =
    singers &&
    singers.map((item) => {
      return item.name
    })
  return singerList && singerList.join('/')
}
