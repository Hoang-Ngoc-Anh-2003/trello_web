import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import {cardService} from '~/services/cardService'
const createNew = async (req, res, next) => { 
  try {

    //Dieu huong du lieu sang tang service
    const createdCard =await cardService.createNew(req.body)

    // throw new ApiError(StatusCodes.BAD_GATEWAY,'testloitaptrung')
    
    //ket qua tra ve phia client
     res.status(StatusCodes.CREATED).json(createdCard)
  } catch (error) {
    next(error)
  }
}


export const cardController = {
  createNew
}