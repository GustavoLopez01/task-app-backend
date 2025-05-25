import {
  Column,
  DataType,
  HasMany,
  Model,
  Table
} from 'sequelize-typescript'
import Task from './Task'

@Table({ tableName: 'category' })
class Category extends Model {

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
    type: DataType.STRING,
    allowNull: false
  })
  declare description: string

  @HasMany(() => Task, 'categoryId')
  declare tasks: Task[]
}

export default Category