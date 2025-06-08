export const userSchema = {
  name: {
    custom: {
      options: (value: any) => {
        return typeof value === 'string' && value.trim().length > 0
      },
      errorMessage: 'Campo nombre es requerido'
    }
  },
  age: {
    custom: {
      options: (value: any) => {
        return typeof value === 'number' && value > 0
      },
      errorMessage: 'Campo edad es requerido'
    }
  },
  email: {
    isEmail: { errorMessage: 'Campo email debe ser un correo electrónico' },
  },
  password: {
    custom: {
      options: (value: any) => {
        return typeof value === 'string' && value.trim().length > 0
      },
      errorMessage: 'Campo contraseña es requerido'
    }
  },
}