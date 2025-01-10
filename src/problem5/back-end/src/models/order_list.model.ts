import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface OrderListAttributes {
    order_list_id: number;
    quantity: number;
}

type OrderListCreationAttributes = Optional<OrderListAttributes, 'order_list_id'>;

class OrderList extends Model<OrderListAttributes, OrderListCreationAttributes> implements OrderListAttributes {
    public order_list_id!: number;
    public quantity!: number;
}

export default (sequelize: Sequelize): typeof OrderList => {
    OrderList.init(
        {
            order_list_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'order_lists',
            timestamps: false,
        },
    );

    return OrderList;
};
