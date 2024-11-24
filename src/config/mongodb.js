const MONGODB_URI = 'mongodb+srv://trelloweb:252525@cluster0.s83zs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const DATABASE_NAME = 'trello-web-dbname'
import { MongoClient, ServerApiVersion } from 'mongodb'
//khoi tao db not connected
let trelloDatabaseInstance = null
//khoi tao íntance de connect mongodb
const mongoClientInstance = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

export const CONNECT_DB = async () =>{
  //goi ket noi toi atlas
  await mongoClientInstance.connect()
  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME)
}
//dong ket noi DB khi can
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

export const GET_DB= () => {
  if (!trelloDatabaseInstance) throw new Error('MUST CONNECT TO DB FIRST!')
  return trelloDatabaseInstance
}
