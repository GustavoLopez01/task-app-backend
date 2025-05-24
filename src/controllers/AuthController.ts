import { Request, Response } from 'express'
import { createToken } from '../middlewares/Jwt';

export const auth = (req: Request, res: Response) => {
  try {
    const { email } = req.body
    const token = createToken(email)

    if (token) {
      res.status(200).json({
        success: true,
        token
      })
      return
    }

    res.status(200).json({
      success: false,
      message: "Ocurrió un error al generar el token"
    })
  } catch (error) {
    console.error(`Ocurrió un error al generar el jwt del usuario ${error}`);
  }
}