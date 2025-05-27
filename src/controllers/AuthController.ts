import { Request, Response } from 'express'
import { createToken } from '../middlewares/Jwt';
import { BAD_REQUEST_CODE, SUCCESS_ACTION_CODE } from '../constants/codes'

export const auth = (req: Request, res: Response) => {
  try {
    const { email } = req.body
    const token = createToken(email)

    if (token) {
      res.status(SUCCESS_ACTION_CODE).json({
        success: true,
        token
      })
      return
    }

    res.status(BAD_REQUEST_CODE).json({
      success: false,
      message: "Ocurrió un error al generar el token"
    })
  } catch (error) {
    console.error(`Ocurrió un error al generar el jwt del usuario ${error}`);
  }
}