export const taskSchema = {
  title: {
    custom: {
      options: (value: any) => {
        return typeof value === 'string' && value.trim().length > 0
      },
      errorMessage: 'Campo title es requerido'
    }
  },
  description: {
    custom: {
      options: (value: any) => {
        return typeof value === 'string' && value.trim().length > 0
      },
      errorMessage: 'Campo description es requerido'
    }
  },
  categoryId: {
    custom: {
      options: (value: any) => {
        return typeof value === 'number' && value > 0
      },
      errorMessage: 'Campo categoryId es requerido'
    }
  },
  number: {
    custom: {
      options: (value: any) => {
        return typeof value === 'number' && value > 0
      },
      errorMessage: 'Campo number es requerido'
    }
  }
}