import {
  Column,
  Table,
  Model,
  DataType,
} from 'sequelize-typescript'

@Table({ tableName: 'auth' })
class Auth extends Model {

  @Column({
    type: DataType.STRING
  })
  declare email: string

  @Column({
    type: DataType.BOOLEAN
  })
  declare isActive: boolean

}

export default Auth