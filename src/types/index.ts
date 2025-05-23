export type TaskBody = {
  id: number
  title: string
  description: string
  categoryId: number
  number: number
}

export type SaveTask = Omit<TaskBody, 'id'>


export type UserBody = {
  id: number
  name: string
  age: number
  email: string
}

export type NewUser = Omit<UserBody, 'id'>
