import { Router } from 'express'
import { body } from 'express-validator'
import { auth } from '../controllers/AuthController'
import { validateFields } from '../middlewares/validateFields'

const router = Router()

router.post('/login',
  body('email').notEmpty().isString().withMessage('El campo email es requerido'),
  validateFields,
  auth
)

export default router