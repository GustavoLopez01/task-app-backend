import { Router } from 'express'
import { body, param } from 'express-validator'
import { validateFields } from '../middlewares/validateFields'
import {
  getAll,
  getById,
  save,
  update
} from '../controllers/TaskController'
import { verifyToken } from '../middlewares/Jwt'

const router = Router()

router.get('/',
  verifyToken,
  getAll
)

router.get('/:id',
  param('id').notEmpty().isNumeric().withMessage('El parámetro id es requerido'),
  verifyToken,
  validateFields,
  getById
)

router.post('/',
  body('title').notEmpty().trim().withMessage('El campo titulo es requerido.'),
  body('description').notEmpty().trim().withMessage('El campo descripción es requerido.'),
  body('categoryId').notEmpty().isNumeric().withMessage('El campo categoria es requerido.'),
  body('number').notEmpty().isNumeric().withMessage('El campo número es requerido.'),
  verifyToken,
  validateFields,
  save
)

router.put('/:id',
  param('id').notEmpty().isNumeric().withMessage('El campo id es requerido.'),
  body('title').notEmpty().trim().withMessage('El campo titulo es requerido.'),
  body('description').notEmpty().trim().withMessage('El campo descripción es requerido.'),
  body('categoryId').notEmpty().isNumeric().withMessage('El campo categoria es requerido.'),
  body('number').notEmpty().isNumeric().withMessage('El campo número es requerido.'),
  verifyToken,
  validateFields,
  update
)

export default router