import { Router } from 'express'
import { verifyToken } from '../middlewares/Jwt'
import { param, checkSchema } from 'express-validator'
import {
  create,
  getAll,
  getById
} from '../controllers/CategoryController'
import { validateFields } from '../middlewares/validateFields'
import { categorySchema } from '../schemas/categorySchema'

const router = Router()

router.get('/',
  verifyToken,
  getAll
)

router.get('/:id',
  param('id').isNumeric().withMessage('Parámetro id es requerido'),
  verifyToken,
  validateFields,
  getById
)

router.post('/',
  checkSchema(categorySchema),
  verifyToken,
  create
)

export default router