import { Router } from 'express'
import { login, signUp, activate } from '@/controllers/auth'

const router = Router()

router.post('/signup', signUp)
router.post('/login', login)
router.post('/activate/:code', activate)

export default router
