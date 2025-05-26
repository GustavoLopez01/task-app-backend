import User from '../models/User'
import { UserBody } from '../types'

export const validateExistUser = async (email: string) => {
  try {
    const response: UserBody = await User.findOne({
      where: { email }
    })
    return response?.id ? response.id : null
  } catch (error) {
    console.error(`Ocurrió un error al obtener el usaurio ${error}`);
  }
}