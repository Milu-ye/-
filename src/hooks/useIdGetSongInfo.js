import { cloudeRequest } from '@/utils/request'
const getSongInfo = async (ids) => {
  const { data } = await cloudeRequest.get('/song/detail', {
    params: {
      ids
    }
  })
  return data
}
export default getSongInfo;
