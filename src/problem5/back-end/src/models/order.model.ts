import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface OrderAttributes {
    order_id: number;
    shippingAddress: string;
    paymentMethod: string;
    shippingPrice: string;
    totalPrice: string;
    isPaid: boolean;
    isDelivered: boolean;
    isShipped: string;
    deliveryDate: string;
}

type OrderCreationAttributes = Optional<OrderAttributes, 'order_id'>;

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public order_id!: number;
    public shippingAddress!: string;
    public paymentMethod!: string;
    public shippingPrice!: string;
    public totalPrice!: string;
    public isPaid!: boolean;
    public isDelivered!: boolean;
    public isShipped!: string;
    public deliveryDate!: string;
}

export default (sequelize: Sequelize): typeof Order => {
    Order.init(
        {
            order_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            shippingAddress: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            paymentMethod: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            shippingPrice: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            totalPrice: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isPaid: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            isDelivered: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            isShipped: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            deliveryDate: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'orders',
            timestamps: false,
        },
    );

    return Order;
};
