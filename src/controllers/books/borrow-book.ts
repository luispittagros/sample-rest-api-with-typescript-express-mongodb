import { Request, Response, NextFunction } from 'express'
import Book, { BookAction, BookStatus } from '@/models/book'

export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user as any

    // Only active users can borrow books
    if (!user.active) {
      return res.status(400).json({
        message: 'You must be active to borrow books',
      })
    }

    const book = await Book.findById(req.params.id)

    if (!book) {
      return res.status(404).json({
        message: 'Book not found',
      })
    }

    if (book.status === BookStatus.BORROWED) {
      return res.status(400).json({
        message: 'Book is already borrowed',
      })
    }

    book.status = BookStatus.BORROWED

    book.history.push({
      user: user.id,
      action: BookAction.BORROWED,
      date: new Date(),
    })

    await book.save()

    res.status(200).json({
      message: 'Book taken',
    })
  } catch (error) {
    next(error)
  }
}
