import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import {columnService} from '~/services/columnService'
const createNew = async (req, res, next) => { 
  try {

    //Dieu huong du lieu sang tang service
    const createdColumn =await columnService.createNew(req.body)

    // throw new ApiError(StatusCodes.BAD_GATEWAY,'testloitaptrung')
    
    //ket qua tra ve phia client
     res.status(StatusCodes.CREATED).json(createdColumn)
  } catch (error) {
    next(error)
  }
}

export const columnController = {
  createNew
}