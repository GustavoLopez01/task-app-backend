import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User'
import { UserBody } from '../types'
import {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  UNAUTHORIZED_CODE
} from '../constants/codes'

export const validateUserByPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      email,
      password
    } = req.body

    const response: UserBody = await User.findOne({
      where: { email }
    })

    if (!response) {
      res.status(NOT_FOUND_CODE).json({
        success: false,
        message: `No existe usuario con email ${email}`
      })
      return
    }

    const isValid = await verifyPassword(password, response.password)
    if (!isValid) {
      res.status(UNAUTHORIZED_CODE).json({
        success: false,
        message: 'La contraseña es incorrecta'
      })
      return
    }

    next()
  } catch (error) {
    console.error(`Ocurrió un error al consultar al usuario ${error}`);
    res.status(BAD_REQUEST_CODE).json({
      success: false,
      message: 'Ocurrió un error al verificar el email del usuario'
    })
  }
}

export const verifyPassword = async (textPassword: string, hashPassword: string) => {
  try {
    return await bcrypt.compare(textPassword, hashPassword)
  } catch (error) {
    console.error(`Ocurrió un error al verificar la contraseña del usuario ${error}`);
  }
} 