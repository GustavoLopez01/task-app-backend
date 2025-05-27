import {
  Model,
  DataType,
  Table,
  Column,
  HasMany,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript'
import bcrypt from 'bcrypt'
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

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare password: string

  @HasMany(() => Task, 'userId')
  declare tasks: Task[]

  @BeforeCreate
  @BeforeUpdate
  static async encryptPassword(instance: User) {
    const password = await bcrypt.hash(
      instance.password, Number(process.env.SALT_ROUNDS)
    )
    instance.password = password
  }
}


export default User