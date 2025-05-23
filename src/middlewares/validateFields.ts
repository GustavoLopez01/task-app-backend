import {
  Request,
  Response,
  NextFunction
} from 'express'
import { validationResult } from 'express-validator'

export const validateFields = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      res.json({
        success: false,
        errors: result.array().map((error) => ({ msg: error.msg }))
      })
      return
    }
    next()
  } catch (error) {
    console.log(`Ocurrió un error al validar los campos ${error}`);
  }
}