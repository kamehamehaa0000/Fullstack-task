import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import './config/env'
import ConnectToDatabase from './database/ConnectToDB'
import { mainRouter } from './routes/main.router'
import axios from 'axios'
const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('../public'))
ConnectToDatabase()

app.use('/api/v1/', mainRouter)
app.get('/', (req, res) => {
  res.send('Backend for Fullstack assignment')
})

app.listen(process.env.PORT, () => {
  console.log('Server started on port - ' + process.env.PORT)
})

// To keep pinging my backend on render to prevent it from stoping due to inactivity
const url = `https://fullstack-task-8087.onrender.com/`
const interval = 30000

function reloadWebsite() {
  axios
    .get(url)
    .then(() => {
      console.log('pinged backend successfully!!')
    })
    .catch((error) => {
      console.log("can't ping backend!")
    })
}
setInterval(reloadWebsite, interval)
