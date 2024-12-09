import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import {boardService} from '~/services/boardService'
const createNew = async (req, res, next) => { 
  try {
     //console.log('req.body:',req.body)
    // console.log('req.query:',req.query)
    // console.log('req.params:',req.params)
    // console.log('req.files:',req.files)
    // console.log('req.cookies:',req.cookies)
    // console.log('req.jwtDecoded:',req.jwtDecoded)

    //Dieu huong du lieu sang tang service

    const createdBoard =await boardService.createNew(req.body)
    // throw new ApiError(StatusCodes.BAD_GATEWAY,'testloitaptrung')

    
    //ket qua tra ve phia client
     res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew
}