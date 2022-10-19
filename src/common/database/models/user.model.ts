import { Column, Table, DataType, CreatedAt, UpdatedAt, DeletedAt, PrimaryKey, AllowNull, Unique, Model, Scopes, AutoIncrement } from "sequelize-typescript";


@Scopes(() => ({
    exposed: {
        attributes: ['firstName', 'lastName', 'username', 'email', 'createdAt', 'updatedAt']
    }
}))
@Table({
    timestamps: true,
    paranoid: true,
    tableName: 'users'
})
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    firstName: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    lastName: string;


    @AllowNull(false)
    @Unique
    @Column({ type: DataType.STRING })
    username: string;
    
    @AllowNull(false)
    @Unique
    @Column({ type: DataType.STRING })
    email: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    password: string;

    @CreatedAt
    createdAt: Date;
  
    @UpdatedAt
    updatedAt: Date;
  
    @DeletedAt
    deletedAt: Date;
}