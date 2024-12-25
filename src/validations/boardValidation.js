import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import {BOARD_TYPES} from '~/utils/constants'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
const createNew = async (req, res, next) => { 
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required':'Title is required',
      'string.empty':'Title is not allowed to be empty',
      'string.min':'Title min 3 chars',
      'string.max':'Title max 50 chars',
      'string.trim':'Title must not have leading or trailing whitespace'
    }), // string,batbuoc/soluongkitumin/max
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC,BOARD_TYPES.PRIVATE).required()

  })

  try {
    // console.log('req.body:',req.body)

    await correctCondition.validateAsync(req.body,{abortEarly:false}) //kiem tra req.body tu fe gui len co dung voi DK cua doi tuong correctCondition ko
    
    next()//dua req sang tang xu ly khac 
    // res.status(StatusCodes.CREATED).json({ message: 'POST from Validation: API create new boards' })

  } catch (error) {
    // console.log(error)
    // console.log(new Error(error))
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,errorMessage)
    next(customError)
    
  }

}

const update = async (req, res, next) => {
  // Lưu ý chúng ta không dùng hàm required() trong trường hợp Update
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE),
    columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
  })

  try {
    // Chỉ định abortEarly: false để trường hợp có nhiều lỗi validation thì trả về tất cả lỗi (video 52)
    // Đối với trường hợp update, cho phép Unknown để không cần đẩy 1 số field lên
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })
    // Validate dữ liệu xong xuôi hợp lệ thì cho request đi tiếp sang Controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}
export const boardValidation = {
  createNew,
  update
}