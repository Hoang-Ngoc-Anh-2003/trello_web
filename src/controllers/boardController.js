import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
const createNew = async (req, res, next) => { 
  try {
    // console.log('req.body:',req.body)
    // console.log('req.query:',req.query)
    // console.log('req.params:',req.params)
    // console.log('req.files:',req.files)
    // console.log('req.cookies:',req.cookies)
    // console.log('req.jwtDecoded:',req.jwtDecoded)

    //Dieu huong du lieu sang tang service
    // throw new ApiError(StatusCodes.BAD_GATEWAY,'testloitaptrung')
    
    //ket qua tra ve phia client
    // res.status(StatusCodes.CREATED).json({ message: 'POST from controller: API create new boards' })
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew
}