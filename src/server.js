/* eslint-disable no-console */

import express from 'express'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'
import {env} from '~/config/environment'
import 'dotenv/config'
import {APIs_V1} from '~/routes/v1'
const START_SERVER = () => {

  const app = express()

  app.use('/v1', APIs_V1)
  // app.get('/', (req, res) => {
  //   res.end('<h1>Hello World!</h1><hr>')
  // })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`3.Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}/`)
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