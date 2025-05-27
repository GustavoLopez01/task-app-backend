import { Router } from 'express'
import { body } from 'express-validator'
import { auth } from '../controllers/AuthController'
import { validateFields } from '../middlewares/validateFields'
import { validateUserByPassword } from '../middlewares/validateUserByPassword'

const router = Router()

router.post('/login',
  body('email').notEmpty().isString().withMessage('Campo email es requerido'),
  body('password').notEmpty().isString().withMessage('Campo password es requerido'),
  validateFields,
  validateUserByPassword,
  auth
)

export default router