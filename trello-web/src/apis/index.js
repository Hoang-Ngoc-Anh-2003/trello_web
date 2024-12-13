import axios from 'axios'
import { API_ROOT } from '~/utils/constants'
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)//http://localhost:8017/v1/boards/${boardId}
  //axios se tra ve kq qua obj property board la data
  return response.data
}