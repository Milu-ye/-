import { preventRepeatedLoading, cloudeRequest } from './request'
export const getaccountInfo = () => {
  return cloudeRequest({
    url: '/user/account',
    method: 'get'
  })
}

// const searchPlayListLimit = 50
// const getSearchPlayListLimit = async (keywords) => {
//   const {
//     data: {
//       result: { playlistCount }
//     }
//   } = await preventRepeatedLoading({
//     url: '/cloudsearch',
//     method: 'get',
//     params: {
//       limit: 100,
//       type: 1000,
//       keywords
//     }
//   })
//   return playlistCount
// }
//获得搜索歌单
export const getSearchPlaylist = (keywords) => {
  return preventRepeatedLoading({
    url: '/cloudsearch',
    method: 'get',
    params: {
      limit: 100,
      type: 1000,
      keywords
    }
  })
}
//获得最近播放的歌单
export const getHistoryPlaylist = () => {
  return preventRepeatedLoading({
    url: '/record/recent/playlist',
    params: {
      limit: 100
    }
  })
}

//获得歌单内的歌曲
export const getSongsInPlaylist = (id) => {
  return cloudeRequest({
    url: '/playlist/track/all',
    method: 'get',
    params: {
      id
    }
  })
}
