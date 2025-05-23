import {
  Table,
  Model,
  Column,
  DataType,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript'

@Table({ tableName: 'Task' })
export class Task extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
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
  declare categoryId: number

  @Column({
    type: DataType.INTEGER
  })
  declare number: number
}
