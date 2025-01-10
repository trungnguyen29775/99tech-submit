import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface UserAttributes {
    user_id: number;
    password: string;
    email: string;
    phoneNum?: string | null;
    name: string;
    isAdmin: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'user_id'>;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public user_id!: number;
    public password!: string;
    public email!: string;
    public phoneNum!: string | null;
    public name!: string;
    public isAdmin!: string;
}

export default (sequelize: Sequelize): typeof User => {
    User.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phoneNum: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isAdmin: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'users',
            timestamps: false,
        },
    );

    return User;
};
