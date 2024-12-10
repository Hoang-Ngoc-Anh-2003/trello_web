/* eslint-disable no-useless-catch */
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatter'
import {boardModel} from '~/models/boardModel'
const createNew = async (reqBody) =>{
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    //goi toi tang Model de xu ly luu ban ghi newBoard vao DB
    const createdBoard = await boardModel.createNew(newBoard)
    console.log(createdBoard)

    //lay ban ghi board sau khi goi (optional)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    console.log(getNewBoard)

    //tra kq ve , trong service luon phai co return
    return getNewBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}