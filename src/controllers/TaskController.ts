import { Request, Response } from 'express'
import Task from '../models/Task'
import Category from '../models/Category'
import { validateExistUser } from '../helpers/validations'
import type {
  Categorybody,
  SaveTask,
  TaskBody
} from '../types'
import {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  SUCCESS_ACTION_CODE
} from '../constants/codes'

export const getAll = async (req: Request, res: Response) => {
  try {
    const response: TaskBody[] = await Task.findAll()
    if (Array.isArray(response)) {
      res.status(SUCCESS_ACTION_CODE).json({
        success: true,
        tasks: response
      })
      return
    }
    res.status(SUCCESS_ACTION_CODE).json({
      success: false,
      tasks: []
    })
  } catch (error) {
    console.log(`Ocurrió un error al obtener las tareas ${error}`);
    res.status(BAD_REQUEST_CODE).json({
      success: false,
      message: 'Ocurrió un error al obtener las tareas'
    })
  }
}

export const getAllByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const response: TaskBody[] = await Task.findAll({
      where: { userId }
    })

    if (Array.isArray(response)) {
      res.status(SUCCESS_ACTION_CODE).json({
        success: true,
        data: response
      })
      return
    }

    res.status(SUCCESS_ACTION_CODE).json({
      success: false,
      message: `No existe usuario con id ${userId}`
    })
  } catch (error) {
    console.error(`Ocurrió un error al obtener las tareas del usuario ${error}`);
    res.status(BAD_REQUEST_CODE).json({
      success: false,
      message: 'Ocurrió un error al obtener las tareas del usuario'
    })
  }
}

export const getAllByUserAndCategoryId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const { categoryId } = req.body

    const response: Categorybody = await Category.findOne({
      include: [{
        model: Task,
        where: {
          userId
        }
      }],
      where: {
        id: categoryId
      }
    })

    if (response?.id) {
      res.status(SUCCESS_ACTION_CODE).json({
        success: true,
        data: response
      })
      return
    }

    res.status(SUCCESS_ACTION_CODE).json({
      success: false,
      message: `No existe categoria con id ${categoryId}`
    })
  } catch (error) {
    console.error(`Ocurrió un error al obtener las tareas del usaurio ${error}`);
    res.status(BAD_REQUEST_CODE).json({
      success: false,
      message: 'Ocurrió un error al obtener las tareas del usuario'
    })
  }
}

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const response: TaskBody = await Task.findByPk(id)

    if (response?.id) {
      res.status(SUCCESS_ACTION_CODE).json({
        success: true,
        task: response
      })
      return
    }

    res.status(SUCCESS_ACTION_CODE).json({
      success: true,
      Task: `No existe tarea con id ${id}`
    })
  } catch (error) {
    console.error(`Ocurrió un error al obtener la tarea ${error}`);
    res.status(BAD_REQUEST_CODE).json({
      success: false,
      message: 'Ocurrió un error al obtener la tarea'
    })
  }
}

export const save = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      categoryId,
      number,
    } = req.body

    const userEmail = String(req.headers['userEmail'])
    const userId = await validateExistUser(userEmail)
    if (!userId) {
      res.status(NOT_FOUND_CODE).json({
        success: false,
        message: `No existe usuario con email ${userEmail}`
      })
      return
    }

    const response: TaskBody = await Task.create({
      title,
      description,
      categoryId,
      number,
      userId
    })

    if (response?.id) {
      res.status(SUCCESS_ACTION_CODE).json({
        success: true,
        task: response
      })
      return
    }

    res.status(BAD_REQUEST_CODE).json({
      success: false,
      message: 'Ocurrió un error al crear la tarea'
    })
  } catch (error) {
    console.log(`Ocurrió un error al guardar la tarea ${error}`);
    res.status(BAD_REQUEST_CODE).json({
      success: false,
      message: 'Ocurrió un error al guardar la tarea'
    })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const response: TaskBody = await Task.findByPk(id)

    if (response?.id) {
      const {
        title,
        description,
        categoryId,
        number,
      } = req.body

      const userEmail = String(req.headers['userEmail'])
      const userId = await validateExistUser(userEmail)
      if (!userId) {
        res.status(NOT_FOUND_CODE).json({
          success: false,
          message: `No existe usuario con email ${userEmail}`
        })
        return
      }

      const updateTask: SaveTask = {
        title,
        description,
        categoryId,
        number,
      }

      await Task.update({ ...updateTask }, { where: { id } })
      const updatedTask = (await Task.findByPk(id)).dataValues
      res.status(SUCCESS_ACTION_CODE).json({
        success: true,
        task: { ...updatedTask, id: response?.id }
      })
      return
    }

    res.status(SUCCESS_ACTION_CODE).json({
      success: false,
      message: `No existe tarea con id ${id}`
    })
  } catch (error) {
    console.error(`Ocurrió un error al actualizar la tarea ${error}`);
    res.status(BAD_REQUEST_CODE).json({
      success: false,
      message: 'Ocurrió un error al actualizar la tarea'
    })
  }
}

export const completedTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    const response = await Task.findByPk(id)

    if (response) {
      await Task.update({ ...response, isCompleted: true }, { where: { id } })
      res.status(SUCCESS_ACTION_CODE).json({
        success: true,
        message: `La tarea con id ${id} se actualizo correctamente.`
      })
      return
    }

    res.status(NOT_FOUND_CODE).json({
      success: false,
      message: `No existe tarea con ${id}`
    })
  } catch (error) {
    console.error(`Ocurrió un error al completar la tarea ${error}`);
    res.status(BAD_REQUEST_CODE).json({
      success: false,
      message: 'Ocurrió un error al completar la tarea'
    })
  }
}

export const deleteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const response = await Task.findByPk(id)
    if (response) {
      await response.destroy()
      res.status(SUCCESS_ACTION_CODE).json({
        success: true,
        message: 'Se eliminó la tarea correctamente'
      })
      return
    }
    res.status(NOT_FOUND_CODE).json({
      success: false,
      message: `la tarea con id ${id} no existe`
    })
  } catch (error) {
    console.error(`Ocurrió un error al eliminar la tarea ${error}`)
    res.status(BAD_REQUEST_CODE).json({
      success: false,
      message: 'Ocurrió un error al actualizar la tarea'
    })
  }
}