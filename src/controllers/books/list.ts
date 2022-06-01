import { Request, Response, NextFunction } from 'express'
import Book from '@/models/book'

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (error) {
    next(error)
  }
}
