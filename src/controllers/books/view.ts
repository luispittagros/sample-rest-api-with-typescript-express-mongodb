import { Request, Response, NextFunction } from 'express'
import BookModel from '@/models/book'

export const view = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const book = await BookModel.findById(id).exec()

    if (!book) {
      return res.status(404).json({
        message: 'Book not found',
      })
    }

    return res.status(200).json({
      data: book,
    })
  } catch (error) {
    next(error)
  }
}
