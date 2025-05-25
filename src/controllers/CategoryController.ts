import { Request, Response } from 'express'
import Category from '../models/Category'
import Task from '../models/Task'
import type { Categorybody } from '../types'
import {
  BAD_REQUEST_CODE,
  SUCCESS_ACTION_CODE
} from '../constants/codes'

export const getAll = async (req: Request, res: Response) => {
  try {
    const response = await Category.findAll({
      include: [Task]
    })

    if (Array.isArray(response)) {
      res.status(SUCCESS_ACTION_CODE).json({
        success: true,
        categories: response
      })
      return
    }

    res.status(BAD_REQUEST_CODE).json({
      success: false,
      message: 'Ocurrió un error al obtener las categorias'
    })
  } catch (error) {
    console.error(`Ocurrió un error al obtener las categorias ${error}`);
    res.status(BAD_REQUEST_CODE).json({
      success: false,
      message: 'Ocurrió un error al obtener las categorias'
    })
  }
}

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const response: Categorybody = await Category.findByPk(id)

    if (response.id) {
      res.status(SUCCESS_ACTION_CODE).json({
        success: true,
        category: response
      })
      return
    }

    res.status(SUCCESS_ACTION_CODE).json({
      success: false,
      message: `No existe categoria con id ${id}`
    })
  } catch (error) {
    console.error(`Ocurrió un error al consultar la categoria ${error}`);
    res.status(BAD_REQUEST_CODE).json({
      success: false,
      message: 'Ocurrió un error al consultar la categoria'
    })
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description
    } = req.body

    const response: Categorybody = await Category.create({
      name,
      description
    })

    if (response.id) {
      res.status(SUCCESS_ACTION_CODE).json({
        success: true,
        category: response
      })
      return
    }

    res.status(BAD_REQUEST_CODE).json({
      success: false,
      message: 'Ocurrió un error al crear la categoria'
    })
  } catch (error) {
    console.error(`Ocurrió un error al crear la categoria ${error}`);
    res.status(BAD_REQUEST_CODE).json({
      success: false,
      message: 'Ocurrió un error al crear la categoria'
    })
  }
}