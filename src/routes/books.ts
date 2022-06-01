import { Router } from 'express'

import {
  list,
  view,
  create,
  update,
  destroy,
  borrowBook,
  returnBook,
} from '@/controllers/books'
import authMiddleware from '../middlewares/auth'

const router = Router()

// Routes not protected for testing purposes

router.get('/', list)

router.post('/', create)

router.get('/:id([a-zA-Z0-9]+)', view)

router.patch('/:id([a-zA-Z0-9]+)', update)

router.delete('/:id([a-zA-Z0-9]+)', destroy)

// Routes protected by auth middleware to identify user
router.post('/:id([a-zA-Z0-9]+)/borrow', authMiddleware(), borrowBook)

router.post('/:id([a-zA-Z0-9]+)/return', authMiddleware(), returnBook)

export default router
