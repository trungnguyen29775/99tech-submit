import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface ProductAttributes {
    product_id: number;
    name: string;
    type: string;
    price: string;
    rating: string;
    description: string;
    countInStock: string;
    image_path?: string | null;
}

type ProductCreationAttributes = Optional<ProductAttributes, 'product_id'>;

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public product_id!: number;
    public name!: string;
    public type!: string;
    public price!: string;
    public rating!: string;
    public description!: string;
    public countInStock!: string;
    public image_path!: string | null;
}

export default (sequelize: Sequelize): typeof Product => {
    Product.init(
        {
            product_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            rating: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            countInStock: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image_path: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'products',
            timestamps: false,
        },
    );

    return Product;
};
