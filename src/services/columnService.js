/* eslint-disable no-useless-catch */

import { get } from 'lodash'
import {columnModel} from '~/models/columnModel'
import {boardModel} from '~/models/boardModel'

const createNew = async (reqBody) =>{
  try {
    const newColumn = {
      ...reqBody
    }
    //goi toi tang Model de xu ly luu ban ghi newBoard vao DB
    const createdColumn = await columnModel.createNew(newColumn)
    //console.log(createdColumn)

    //lay ban ghi column sau khi goi (optional)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)
    //console.log(getNewColumn)

    if (getNewColumn){
      //xu ly cau truc data o day trc khi tra data ve
      getNewColumn.cards= []
      //cap nhat lai mang columnids trong collection boarrds
      await boardModel.pushColumnOrderIds(getNewColumn)

    }

    //tra kq ve , trong service luon phai co return
    return getNewColumn
  } catch (error) {
    throw error
  }
}

export const columnService = {
  createNew
}