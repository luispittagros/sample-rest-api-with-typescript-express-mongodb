import { Router } from 'express'

import { list, view, update, destroy } from '@/controllers/users'
import authMiddleware from '../middlewares/auth'

const router = Router()

router.get('/', list) // Not protected for testing purposes

router.get('/:id([a-zA-Z0-9]+)', authMiddleware(), view)

router.patch('/:id([a-zA-Z0-9]+)', authMiddleware(), update)

router.delete('/:id([a-zA-Z0-9]+)', authMiddleware(), destroy)

export default router
