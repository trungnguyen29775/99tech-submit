import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface AddressAttributes {
    address_id: number;
    name: string;
    address: string;
    pinCode: string;
    town: string;
    city: string;
    userId: string;
    state: string;
}

type AddressCreationAttributes = Optional<AddressAttributes, 'address_id'>;

class Address extends Model<AddressAttributes, AddressCreationAttributes> implements AddressAttributes {
    public address_id!: number;
    public name!: string;
    public address!: string;
    public pinCode!: string;
    public town!: string;
    public city!: string;
    public userId!: string;
    public state!: string;
}

export default (sequelize: Sequelize): typeof Address => {
    Address.init(
        {
            address_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            pinCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            town: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'addresses',
            timestamps: false,
        },
    );

    return Address;
};
