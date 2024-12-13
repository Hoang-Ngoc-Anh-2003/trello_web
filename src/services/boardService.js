/* eslint-disable no-useless-catch */
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatter'
import {boardModel} from '~/models/boardModel'
import { StatusCodes } from 'http-status-codes'
const createNew = async (reqBody) =>{
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    //goi toi tang Model de xu ly luu ban ghi newBoard vao DB
    const createdBoard = await boardModel.createNew(newBoard)
    //console.log(createdBoard)

    //lay ban ghi board sau khi goi (optional)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    //console.log(getNewBoard)

    //tra kq ve , trong service luon phai co return
    return getNewBoard
  } catch (error) {
    throw error
  }
}

const getDetails = async (boardId) =>{
  try {
    console.log(boardId)
    //goi toi tang Model de xu ly luu ban ghi newBoard vao DB
    const board = await boardModel.getDetails(boardId)
    if(!board) { //xu ly error k ton tai board
      throw new ApiError(StatusCodes.NOT_FOUND,'Board not found!')
    }
    //tra kq ve , trong service luon phai co return
    return board
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetails
}