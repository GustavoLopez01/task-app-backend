import { Router } from 'express'
import { param, checkSchema } from 'express-validator'
import {
  create,
  getAll,
  getById,
  getByToken,
  update
} from '../controllers/UserController'
import { verifyToken } from '../middlewares/Jwt'
import { validateFields } from '../middlewares/validateFields'
import { userSchema } from '../schemas/userSchema'
import { validateUserByPassword } from '../middlewares/validateUserByPassword'

const router = Router()

router.get('/',
  verifyToken,
  getAll
)

router.get('/get-user', 
  verifyToken,
  getByToken
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
  validateUserByPassword,
  validateFields,
  update,
)

export default router