import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import taskRouter from './router/taskRouter'
import authRouter from './router/authRouter'
import userRouter from './router/userRouter'
import connection from './db/connection'

async function getConnection() {
  try {
    await connection.authenticate()
    connection.sync()
    console.log('Connection success')
  } catch (error) {
    console.log(`Ocurrió un error al crear la conexión ${error}`);
  }
}

getConnection()

const server = express()
const PORT = process.env.PORT || 3000

server.use(express.json())
server.use(cors())

server.use('/api/task', taskRouter)
server.use('/api/auth', authRouter)
server.use('/api/user', userRouter)

server.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
})