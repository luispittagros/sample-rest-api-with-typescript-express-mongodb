import { Request, Response, NextFunction } from 'express'
import BookModel from '@/models/book'

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const { title, author, description, price } = req.body

    const book = await BookModel.findById(id)

    if (!book) {
      return res.status(404).json({
        message: 'Book not found',
      })
    }

    await book.update({
      title,
      author,
      description,
      price,
    })

    return res.status(200).json({
      message: 'Book updated successfully',
    })
  } catch (error) {
    next(error)
  }
}
