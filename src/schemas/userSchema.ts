export const userSchema = {
  name: {
    custom: {
      options: (value: any) => {
        return typeof value === 'string' && value.trim().length > 0
      },
      errorMessage: 'Campo name es requerido'
    }
  },
  age: {
    custom: {
      options: (value: any) => {
        return typeof value === 'number' && value > 0
      },
      errorMessage: 'Campo age es requerido'
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