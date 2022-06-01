import { Request, Response, NextFunction } from 'express'
import Book, { BookStatus } from '@/models/book'

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, author, description, price } = req.body

    const book = await Book.create({
      title,
      author,
      description,
      price,
      status: BookStatus.AVAILABLE,
    })

    res.status(201).json(book)
  } catch (error) {
    next(error)
  }
}
