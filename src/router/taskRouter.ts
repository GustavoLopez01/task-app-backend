import { Router } from 'express'
import { param, checkSchema, body } from 'express-validator'
import { validateFields } from '../middlewares/validateFields'
import {
  deleteById,
  getAll,
  getAllByUserAndCategoryId,
  getAllByUserId,
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

router.get('/:userId/user-tasks',
  param('userId').isNumeric().withMessage('Parámetro userId es requerido'),
  verifyToken,
  validateFields,
  getAllByUserId
)

router.get('/:userId/category-tasks',
  param('userId').isNumeric().withMessage('Parámetro userId es requerido'),
  body('categoryId').isNumeric().withMessage('Parámetro categoryId es requerido'),
  verifyToken,
  validateFields,
  getAllByUserAndCategoryId
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

router.delete('/:id',
  param('id').notEmpty().isNumeric().withMessage('Parámetro id es requerido.'),
  verifyToken,
  validateFields,
  deleteById
)

export default router