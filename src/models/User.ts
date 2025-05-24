import {
  Model,
  DataType,
  Table,
  Column,
} from 'sequelize-typescript'

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

}

export default User