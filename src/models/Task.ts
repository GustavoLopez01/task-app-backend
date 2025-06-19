import {
  Table,
  Model,
  Column,
  DataType,
  Default,
} from 'sequelize-typescript'

@Table({ tableName: 'task' })
class Task extends Model {

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
  declare title: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare description: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare number: number

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare isCompleted: boolean

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare categoryId: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare userId: number
}

export default Task