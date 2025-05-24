

export const userSchema = {
  name: {
    notEmpty: { errorMessage: 'Campo name es requerido' },
    isString: { errorMessage: 'Campo name es debe ser una cadena de caracteres' },
  },
  age: {
    notEmpty: { errorMessage: 'Campo age es requerido' },
    isNumeric: { errorMessage: 'Campo age debe ser un número' }
  },
  email: {
    isEmail: { errorMessage: 'Campo email debe ser un correo electronico' },
    notEmpty: { errorMessage: 'Campo email es requerido' },
  },
}