/* eslint-disable no-useless-catch */
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatter'
const createNew = async (reqBody) =>{
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    //goi toi tang Model de xu ly luu ban ghi newBoard vao DB



    //tra kq ve , trong service luon phai co return
    return newBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}