import {
  Model,
  DataType,
  Table,
  Column,
  HasMany,
} from 'sequelize-typescript'
import Task from './Task'

@Table({ tableName: 'user' })
class User extends Model {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  declare id: number
  
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare name: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare age: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare email: string

  @HasMany(() => Task, 'userId')
  declare tasks: Task[]

}

export default User