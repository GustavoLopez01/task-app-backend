import { Sequelize } from 'sequelize-typescript'

const connection = new Sequelize({
  dialect: 'mysql',
  username: 'root',
  database: 'taskapp',
  password: 'root',
  host: 'localhost',
  port: 3306,
  models: [__dirname + '/../models/**/*.ts']
})

export default connection