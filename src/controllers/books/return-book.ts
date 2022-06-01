import { Request, Response, NextFunction } from 'express'
import BookModel, { BookAction, BookStatus } from '@/models/book'

export const returnBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const book = await BookModel.findById(req.params.id).exec()

    if (!book) {
      return res.status(404).json({
        message: 'Book not found',
      })
    }

    if (book.status !== BookStatus.BORROWED) {
      return res.status(400).json({
        message: 'Book is not borrowed',
      })
    }

    const user = req.user as any

    // Only return book if it was borrowed by the current user

    const borrower = book.history.find(
      (history) => history.action === BookAction.BORROWED,
    )

    if (borrower.user !== user.id) {
      return res.status(401).json({
        message: 'Book was not borrowed by you',
      })
    }

    book.status = BookStatus.AVAILABLE

    book.history.push({
      user: user.id,
      action: BookAction.RETURNED,
      date: new Date(),
    })

    await book.save()

    res.status(200).json({
      message: 'Book returned',
    })
  } catch (error) {
    next(error)
  }
}
