import { MongoClient, ServerApiVersion } from 'mongodb'
import {env} from '~/config/environment'
//khoi tao db not connected
let trelloDatabaseInstance = null
//khoi tao íntance de connect mongodb
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

export const CONNECT_DB = async () =>{
  //goi ket noi toi atlas
  await mongoClientInstance.connect()
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)

}
//dong ket noi DB khi can
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

export const GET_DB= () => {
  if (!trelloDatabaseInstance) throw new Error('MUST CONNECT TO DB FIRST!')
  return trelloDatabaseInstance
}

