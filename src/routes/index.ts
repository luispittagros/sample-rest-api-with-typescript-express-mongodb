import { Router } from 'express'

import auth from './auth'
import books from './books'
import users from './users'
import NotFound from './404'

const router = Router()

router.use('/auth', auth)

router.use('/users', users)

router.use('/books', books)

router.use(NotFound)

export default router
