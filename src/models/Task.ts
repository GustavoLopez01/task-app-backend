import {
  Table,
  Model,
  Column,
  DataType,
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