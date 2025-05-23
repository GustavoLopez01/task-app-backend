import { Router } from 'express'
import { body, param } from 'express-validator'
import { validateFields } from '../middlewares/validateFields'
import { 
  getAll, 
  getById, 
  save, 
  update
} from '../controllers/TaskController'

const router = Router()

router.get('/',
  getAll
)

router.get('/:id',
  getById
)

router.post('/',
  body('title').notEmpty().trim().withMessage('El campo titulo es requerido.'),
  body('description').notEmpty().trim().withMessage('El campo descripción es requerido.'),
  body('categoryId').notEmpty().isNumeric().withMessage('El campo categoria es requerido.'),
  body('number').notEmpty().isNumeric().withMessage('El campo número es requerido.'),
  validateFields,
  save
)

router.put('/:id',
  param('id').notEmpty().isNumeric().withMessage('El campo id es requerido.'),
  body('title').notEmpty().trim().withMessage('El campo titulo es requerido.'),
  body('description').notEmpty().trim().withMessage('El campo descripción es requerido.'),
  body('categoryId').notEmpty().isNumeric().withMessage('El campo categoria es requerido.'),
  body('number').notEmpty().isNumeric().withMessage('El campo número es requerido.'),
  validateFields,
  update
)

export default router