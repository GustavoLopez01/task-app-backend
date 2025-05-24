import { Router } from 'express'
import { param, checkSchema } from 'express-validator'
import {
  create,
  getAll,
  getById,
  update
} from '../controllers/UserController'
import { verifyToken } from '../middlewares/Jwt'
import { validateFields } from '../middlewares/validateFields'
import { userSchema } from '../schemas/userSchema'

const router = Router()

router.get('/',
  verifyToken,
  getAll
)

router.get('/:id',
  param('id').notEmpty().isNumeric().withMessage('Parámetro id es requerido'),
  verifyToken,
  validateFields,
  getById
)

router.post('/',
  checkSchema(userSchema),
  validateFields,
  create,
)

router.put('/:id',
  param('id').notEmpty().isNumeric().withMessage('Parámetro id es requerido'),
  checkSchema(userSchema),
  verifyToken,
  validateFields,
  update,
)

export default router