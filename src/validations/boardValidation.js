import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import {BOARD_TYPES} from '~/utils/constants'
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
export const boardValidation = {
  createNew
}