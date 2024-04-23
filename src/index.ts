import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandle } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import staticRouter from './routes/static.routes'
import searchRouter from './routes/search.routes'
config()

databaseService.connect().then(() => {
  databaseService.isIndexUser()
})
const app = express()
const PORT = process.env.PORT || 4000
initFolder()
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Trang chủ')
})
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/static', staticRouter)
app.use('/search', searchRouter)
// app.use('/static/video', express.static(UPLOAD_IMAGE_DIR)) video static mặc định express
app.use(defaultErrorHandle)
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} the server is running with port ${PORT}`)
})
