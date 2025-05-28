import { Router } from 'express'
import { body } from 'express-validator'
import { authLogin, authLogout } from '../controllers/AuthController'
import { validateFields } from '../middlewares/validateFields'
import { validateUserByPassword } from '../middlewares/validateUserByPassword'
import { verifyToken } from '../middlewares/Jwt'

const router = Router()

router.post('/login',
  body('email').notEmpty().isString().withMessage('Campo email es requerido'),
  body('password').notEmpty().isString().withMessage('Campo password es requerido'),
  validateFields,
  validateUserByPassword,
  authLogin
)

router.post('/logout',
  verifyToken,
  authLogout
)

export default router