import Joi from 'joi'
import {ObjectId, ReturnDocument} from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import {BOARD_TYPES} from '~/utils/constants'
import {columnModel} from '~/models/columnModel'
import {cardModel}  from '~/models/cardModel'
//define collection (name&schema )
const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({ //correction data,
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  type: Joi.string().valid(BOARD_TYPES.PUBLIC,BOARD_TYPES.PRIVATE).required(),

  columnOrderIds: Joi.array().items(Joi.string()).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

// Chỉ định ra những Fields mà chúng ta không muốn cho phép cập nhật trong hàm update()
const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const validateBeforeCreate = async (data) =>{
  return await  BOARD_COLLECTION_SCHEMA.validateAsync(data,{abortEarly:false})
}

const createNew = async (data) =>{
  try {
    const validData = await validateBeforeCreate(data)
    const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
    return createdBoard
  } catch (error) {
    throw new Error(error) //khong nhay error sang tang controller. tao 1 error moi co stack trace
  }
}

const findOneById = async (id) =>{
  try {
    console.log('id:',id)
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({_id: new ObjectId(id)})
    return result
  } catch (error) {
    throw new Error(error)
  }
}
//query tong hop (aggregate) de lay toan bo Column va Cards thuoc ve Board do
const getDetails = async (id) =>{
  try {
  // console.log('id:',id)
    // const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({_id: new ObjectId(id)})
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
      { $match: {
        _id: new ObjectId(id),
        _destroy: false
      } },
      { $lookup:{
        from: columnModel.COLUMN_COLLECTION_NAME,
        localField: '_id', //khoa chinh
        foreignField: 'boardId', //khoa ngoai cua column ket noi board,
        as: 'columns'
      } },
      { $lookup:{
        from: cardModel.CARD_COLLECTION_NAME,
        localField: '_id',
        foreignField: 'boardId',
        as: 'cards'
      } }
    ]).toArray()
    console.log(result)
    return result[0] || null
  } catch (error) {
    throw new Error(error)
  }
}
//push gia tri columnid vao cuoi mang columnOrderIds
const pushColumnOrderIds = async(column) =>{
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(column.boardId)},
      { $push: { columnOrderIds:new ObjectId(column._id) }},
      { ReturnDocument: 'after' }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }

}

const update = async (boardId, updateData) => {
  try {
    // Lọc những field mà chúng ta không cho phép cập nhật linh tinh
    Object.keys(updateData).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
        delete updateData[fieldName]
      }
    })

    // Đối với những dữ liệu liên quan ObjectId, biến đổi ở đây
    if (updateData.columnOrderIds) {
      updateData.columnOrderIds = updateData.columnOrderIds.map((_id) => new ObjectId(_id))
    }

    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: new ObjectId(boardId)
        },
        {
          $set: updateData
        },
        {
          returnDocument: 'after' // Sẽ trả về kết quả mới sau khi cập nhật
        }
      )
    return result
  } catch (error) {
    throw new Error(error)
  }
}
export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  pushColumnOrderIds,
  findOneById,
  getDetails,
  update
}

// boardId: 67655e4843da9dde923534b3
//columnId: 6765631b1011866caa62ac97
//cardId: 6765648c1011866caa62ac99