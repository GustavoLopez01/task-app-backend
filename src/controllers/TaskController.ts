import { Request, Response } from 'express'
import { Task } from '../models/Task'
import type { SaveTask, TaskBody } from '../types'

export const getAll = async (req: Request, res: Response) => {
  try {
    const response: TaskBody[] = await Task.findAll()
    if (Array.isArray(response)) {
      res.status(200).json({
        success: true,
        tasks: response
      })
      return
    }
    res.status(200).json({
      success: false,
      tasks: []
    })
  } catch (error) {
    console.log(`Ocurrió un error al obtener las tareas ${error}`);
  }
}

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const response = await Task.findByPk(id)

    if (response?.id) {
      res.status(200).json({
        success: true,
        task: response
      })
      return
    }
    res.status(200).json({
      success: true,
      Task: null
    })
  } catch (error) {
    console.error(`Ocurrió un error al obtener la tarea ${error}`);
  }
}

export const save = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      categoryId,
      number
    } = req.body

    const task: SaveTask = {
      title,
      description,
      categoryId,
      number
    }

    const response: TaskBody = await Task.create(task)

    if (response?.id) {
      res.status(200).json({
        success: true,
        message: `Tarea ${title} registrada con exito!`
      })
      return
    }

    res.status(200).json({
      success: false,
      message: `Ocurrió un error al crear la tarea`
    })
  } catch (error) {
    console.log(`Ocurrió un error al guardar la tarea ${error}`);
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
        number
      } = req.body

      const updateTask: SaveTask = {
        title,
        description,
        categoryId,
        number
      }

      await Task.update({ ...updateTask }, { where: { id } })
      res.status(200).json({
        success: true,
        task: { ...updateTask, id }
      })
      return
    }

    res.status(200).json({
      success: false,
      message: `No existe tarea con id ${id}`
    })
  } catch (error) {
    console.error(`Ocurrió un error al actualizar la tarea ${error}`);
  }
}