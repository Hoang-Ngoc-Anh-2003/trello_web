/* eslint-disable no-useless-catch */

import {cardModel} from '~/models/cardModel'
import {columnModel} from '~/models/columnModel'

const createNew = async (reqBody) =>{
  try {
    const newCard = {
      ...reqBody
    }
    //goi toi tang Model de xu ly luu ban ghi newBoard vao DB
    const createdCard = await cardModel.createNew(newCard)
    //console.log(createdCard)

    //lay ban ghi card sau khi goi (optional)
    const getNewCard = await cardModel.findOneById(createdCard.insertedId)
    //console.log(getNewCard)

    if(getNewCard) {
      //cap nhat lai mang cardOrderids trong collection columns
      await columnModel.pushCardOrderIds(getNewCard)
    }

    //tra kq ve , trong service luon phai co return
    return getNewCard
  } catch (error) {
    throw error
  }
}


export const cardService = {
  createNew
}