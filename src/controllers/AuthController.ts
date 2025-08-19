import { Request, Response } from 'express'
import { createToken } from '../middlewares/Jwt';
import { BAD_REQUEST_CODE, SUCCESS_ACTION_CODE } from '../constants/codes'
import Auth from '../models/Auth';

export const authLogin = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    const token = createToken(email)
    if (token) {
      await createOrUpdateSession(email, true)
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

export const authLogout = async (req: Request, res: Response) => {
  try {
    const email = String(req.headers?.['userEmail'])
    await createOrUpdateSession(email, false)

    res.status(SUCCESS_ACTION_CODE).json({
      success: true,
      message: 'Sesión cerrada correctamente'
    })
  } catch (error) {
    console.error(`Ocurrió un error al cerrar la sesión del usaurio ${error}`);
    res.status(BAD_REQUEST_CODE).json({
      success: false,
      message: 'Ocurrió un error al cerrar la sesión del usuario'
    })
  }
}

const createOrUpdateSession = async (email: string, isActive: boolean) => {
  try {
    const existSession = await Auth.findOne({
      where: { email }
    })

    if (!existSession) {
      await Auth.create({ email, isActive })
      return
    }
    await Auth.update({ email, isActive }, { where: { email } })
  } catch (error) {
    console.error(`Ocurrió un error al agregar la sesión a la BD ${error}`);
  }
}

export const successToken = (req: Request, res: Response) => {
  try {
    res.status(SUCCESS_ACTION_CODE).json({
      success: true,
      message: 'El usuario esta autenticado.'
    })
  } catch (error) {
    console.error(`Ocurrió un error al validar el token ${error}`);
  }
} 