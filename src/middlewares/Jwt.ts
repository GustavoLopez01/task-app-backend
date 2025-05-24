import { 
  Request, 
  Response, 
  NextFunction
} from 'express'
import jwt from 'jsonwebtoken'

export const createToken = (email: string) => {
  try {
    const privateKey = process.env.PRIVATE_KEY
    const token = jwt.sign({
      email
    }, privateKey, { expiresIn: 60 * 60 })
    return token
  } catch (error) {
    console.error(`Ocurrió un error al crear el token del usuario ${error}`);
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["token-x"]
    const finalToken = typeof token === "string" ? token : ""
    const privateKey = process.env.PRIVATE_KEY
    let isValid = true
    jwt.verify(finalToken, privateKey, function (err, decoded) {
      if (err) {
        isValid = false
        return
      }
      return
    })

    if (!isValid) {
      res.status(201).json({
        success: false,
        message: 'El token no es valido'
      })
      return
    }

    next()
  } catch (error) {
    console.error(`Ocurrió un error al verficar el token del usuario ${error}`);
  }
}