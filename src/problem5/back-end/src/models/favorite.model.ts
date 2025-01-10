import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface FavoriteAttributes {
    favorite_id: number;
}

type FavoriteCreationAttributes = Optional<FavoriteAttributes, 'favorite_id'>;

class Favorite extends Model<FavoriteAttributes, FavoriteCreationAttributes> implements FavoriteAttributes {
    public favorite_id!: number;
}

export default (sequelize: Sequelize): typeof Favorite => {
    Favorite.init(
        {
            favorite_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
        },
        {
            sequelize,
            tableName: 'favorite',
            timestamps: false,
        },
    );

    return Favorite;
};
