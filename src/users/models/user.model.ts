import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Scopes,
  Table,
  Unique,
  Validate,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/models/roles.models';

@Scopes(() => ({
  withoutTimestamp: {
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt'],
    },
  },
  withoutPassword: {
    attributes: {
      exclude: ['password'],
    },
  },
  withRole: {
    include: {
      model: Role.scope('withoutTimestamp'),
      as: 'role',
    },
  },
}))
@Table({
  tableName: 'users',
  underscored: true,
  paranoid: true,
})
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column
  name: string;

  @Unique
  @Column
  username: string;

  @Column
  get password() {
    return this.getDataValue('password');
  }

  set password(value: string) {
    this.setDataValue('password', bcrypt.hashSync(value, 10));
  }

  @Unique
  @Validate({
    isEmail: true,
  })
  @Column
  email: string;

  @Unique
  @Column
  phone: string;

  @Default('new')
  @Column
  status: string;

  @Column
  doc: string;

  @Column
  avatar?: string;

  @ForeignKey(() => Role)
  @Column(DataType.UUID)
  roleId: string;

  @BelongsTo(() => Role, 'roleId')
  role: Role;

  comparePasswordSync(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
