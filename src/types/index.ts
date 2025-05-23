export type TaskBody = {
  id: number,
  title: string,
  description: string,
  categoryId: number,
  number: number
}

export type SaveTask = Omit<TaskBody, 'id'>
