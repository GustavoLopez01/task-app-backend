import { Router } from 'express'
import { param, checkSchema } from 'express-validator'
import { validateFields } from '../middlewares/validateFields'
import {
  getAll,
  getById,
  save,
  update
} from '../controllers/TaskController'
import { verifyToken } from '../middlewares/Jwt'
import { taskSchema } from '../schemas/taskSchema'

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
  checkSchema(taskSchema),
  verifyToken,
  validateFields,
  save
)

router.put('/:id',
  param('id').notEmpty().isNumeric().withMessage('Parámetro id es requerido.'),
  checkSchema(taskSchema),
  verifyToken,
  validateFields,
  update
)

export default router