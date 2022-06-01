import mongoose from 'mongoose'

export default function connectDatabase() {
  mongoose.connect(process.env.DATABASE_CONNECTION_STRING, () => {
    console.log('Connected to database')
  })
}
