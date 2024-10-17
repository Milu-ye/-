import { cloudeRequest } from '@/utils/request'
const preventRepeatedLoading = (() => {
  let isLoadingWeb = []
  return function (config) {
    if (isLoadingWeb.indexOf(config.url) != -1) {
      return
    } else {
      isLoadingWeb.push(config.url)
      return cloudeRequest({
        ...config
      }).then((res) => {
        isLoadingWeb.splice(isLoadingWeb.indexOf(config.url), 1)
        return res
      })
    }
  }
})()
export { preventRepeatedLoading, cloudeRequest }
