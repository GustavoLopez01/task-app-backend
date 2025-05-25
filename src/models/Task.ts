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
    type: DataType.STRING
  })
  declare title: string

  @Column({
    type: DataType.STRING
  })
  declare description: string

  @Column({
    type: DataType.INTEGER
  })
  declare number: number

  @Column({
    type: DataType.INTEGER
  })
  declare categoryId: number

  @Column({
    type: DataType.INTEGER
  })
  declare userId: number
}

export default Task