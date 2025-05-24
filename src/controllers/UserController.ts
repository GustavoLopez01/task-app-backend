import { Request, Response } from 'express'
import User from '../models/User'
import { validateExistUser } from '../helpers/validations'
import type { NewUser, UserBody } from '../types'
import {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  SUCCESS_ACTION_CODE
} from '../constants/codes';

export const getAll = async (req: Request, res: Response) => {
  try {
    const response = await User.findAll()
    if (Array.isArray(response)) {
      res.status(SUCCESS_ACTION_CODE).json({
        success: true,
        users: response
      })
      return
    }

    res.status(BAD_REQUEST_CODE).json({
      success: false,
      users: []
    })
  } catch (error) {
    console.error(`Ocurrió un error al obtener la lista de usuarios ${error}`);
    res.status(BAD_REQUEST_CODE).json({
      success: false,
      message: 'Ocurrió un error al obtener la lista de usuarios'
    })
  }
}

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const response: UserBody = await User.findByPk(id)
    if (response.id) {
      res.status(SUCCESS_ACTION_CODE).json({
        success: true,
        user: response
      })
      return
    }

    res.status(NOT_FOUND_CODE).json({
      success: false,
      message: `No existe usaurio con id ${id}`
    })
  } catch (error) {
    console.error(`Ocurrió un error al obtener el usuario ${error}`);
    res.status(NOT_FOUND_CODE).json({
      success: false,
      message: 'Ocurrió un error al obtener el usuario'
    })
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const {
      name,
      age,
      email,
    } = req.body

    const existUser = await validateExistUser(email)
    if (existUser) {
      res.status(NOT_FOUND_CODE).json({
        success: false,
        message: `Ya existe usuario registrado con email ${email}`
      })
      return
    }

    const newUser: NewUser = { name, age, email }
    const response: UserBody = await User.create({ ...newUser })

    if (response.id) {
      res.status(SUCCESS_ACTION_CODE).json({
        success: true,
        user: response
      })
      return
    }

    res.status(BAD_REQUEST_CODE).json({
      success: false,
      message: 'Ocurrió un error crear al usuario'
    })
  } catch (error) {
    console.error(`Ocurrió un error al crear al usuario ${error}`);
    res.status(BAD_REQUEST_CODE).json({
      success: false,
      message: 'Ocurrió un error al crear al usuario'
    })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const {
      name,
      age,
      email,
    } = req.body

    const existUser = await validateExistUser(email)
    if (!existUser) {
      res.status(NOT_FOUND_CODE).json({
        success: false,
        message: `No existe usuario con email ${email}`
      })
    }

    const { id } = req.params
    const updateUser: NewUser = { name, age, email, }
    await User.update(
      { ...updateUser },
      { where: { id } }
    )

    res.status(SUCCESS_ACTION_CODE).json({
      success: true,
      user: { ...updateUser, id }
    })
  } catch (error) {
    console.error(`Ocurrió un error al actualizar al usuario ${error}`);
    res.status(BAD_REQUEST_CODE).json({
      success: true,
      message: 'Ocurrió un error al actualizar al usuario'
    })
  }
} 