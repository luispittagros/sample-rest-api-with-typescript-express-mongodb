import { Schema, model } from 'mongoose'

export enum BookStatus {
  BORROWED = 'BORROWED',
  AVAILABLE = 'AVAILABLE',
}

export enum BookAction {
  BORROWED = 'BORROWED',
  RETURNED = 'RETURNED',
}

export interface IBookHistory {
  user: string
  date: Date
  action: BookAction
}

export interface IBook {
  title: string
  description: string
  price: number
  author: string
  status: BookStatus
  history: IBookHistory[]
}

const BookHistorySchema = new Schema<IBookHistory>({
  user: String,
  action: String,
  date: Date,
})

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  author: { type: String, required: true },
  status: { type: String, required: true },
  history: { type: [BookHistorySchema], required: true },
})

const Book = model<IBook>('Book', BookSchema)

export default Book
