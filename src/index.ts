import 'dotenv/config'

import express from 'express'
import { json } from 'body-parser'
import compression from 'compression'
import routes from '@/routes/index'
import connectDatabase from '@/database'
import '@/auth'

export const app = express()

app.use(json())
app.use(compression())

app.use('/', routes)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`⚡ Server running on port ${port}`)
})
;(async () => {
  await connectDatabase()
})()
