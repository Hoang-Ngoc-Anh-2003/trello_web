/* eslint-disable no-console */

import express from 'express'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'

const START_SERVER = () => {

  const app = express()
  const hostname = 'localhost'
  const port = 8017

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`3.Hello , I am running at ${hostname}:${port}/`)
  })
  //thuc hien cac tac vu cleanup trc khi dung sever
  exitHook(()=>{
    console.log('4.disconecting from mongoosedb atlas...')
    CLOSE_DB()
    console.log('5.disconected from mongoosedb atlas')
  })
}
//when connected to db thi moi dc start sever (IIFE)
(async () => {
  try {
    console.log('1.connecting to mongodb atlas...')
    await CONNECT_DB()
    console.log('2.connected to mongodb atlas!')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

//C2:when connected to db thi moi dc start sever
// console.log('1.connecting to mongodb atlas...')
// CONNECT_DB()
//   .then(() => { console.log('2.connected to mongodb atlas!') })
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })