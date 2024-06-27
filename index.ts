import express, { Express, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'

//import getRawBody from 'raw-body';
//import contentType from 'content-type';
import helmet from 'helmet'

//import { logger } from './logger/logger';
import dbConnection from './database'
import rootRoutes from './routes/index'

import { initModels } from './models'

import { initController } from './controllers/initController'

export const app: Express = express()

dotenv.config()

const corsOptions = {
  origin: 'http://localhost:5173', // Change to your frontend's URL
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}

app.use(cors(corsOptions))

app.use(cookieParser())

// Security with helmet
app.use(helmet())

// Security with content type max allowed 1mb
/*app.use(function (req, res, next) {
    if (!['POST', 'PUT', 'DELETE'].includes(req.method)) {
      next()
      return
    }
    getRawBody(req, {
      length: req.headers['content-length'],
      limit: '1mb',
      encoding: contentType.parse(req).parameters.charset
    }, function (err, string) {
      if (err) {
        logger.error(`ContentType Error: ${err}`);
        return next(err)
      }
      res.send(string)
      next()
    })
})*/

app.use(express.urlencoded({ extended: true, limit: '1kb' }))

//express.json middleware from express
// This middleware parse the json oject from request body that we can use inside the code and attach it the object
// with the request object handlers
app.use(express.json({ limit: '1kb' }))

const initApp = async () => {
  try {
    // DB connection
    await dbConnection()

    // Creating tables in database
    await initModels()

    // Insert data in database
    await initController()
  } catch (err) {
    console.error('Unable to connect to the database:', err)
  }
}

initApp()

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

// Auth Routes & Controllers
app.use(rootRoutes)
