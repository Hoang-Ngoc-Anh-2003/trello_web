/* eslint-disable no-useless-catch */
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatter'
import {boardModel} from '~/models/boardModel'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep} from 'lodash'
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
    //vid63, B1:cloneDeep tao ra 1 board moi khong anh huong board ban dau
    const resBoard = cloneDeep(board)
    //B2:dua card ve dung column cua no
    resBoard.columns.forEach(column => {
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
    })
    // B3:xoa mang card khoi board ban dau
    delete resBoard.cards

    //tra kq ve , trong service luon phai co return
    return resBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetails
}