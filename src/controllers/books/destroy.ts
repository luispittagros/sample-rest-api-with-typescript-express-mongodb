import { Request, Response, NextFunction } from 'express'
import Book from '@/models/book'

export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params

    const book = await Book.findByIdAndDelete(id)

    res.status(200).json({
      message: 'Book deleted successfully',
      book,
    })
  } catch (error) {
    next(error)
  }
}
