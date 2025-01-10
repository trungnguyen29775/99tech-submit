import { Sequelize } from 'sequelize';
import dbConfig from '../config/db.config';
import initializeAddressModel from './address.model';
import initializeOrderListModel from './order_list.model';
import initializeOrderModel from './order.model';
import initializeProductsModel from './products.model';
import initializeUserModel from './user.model';
import initializeFavoriteModel from './favorite.model';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
});

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.address = initializeAddressModel(sequelize);
db.order_list = initializeOrderListModel(sequelize);
db.order = initializeOrderModel(sequelize);
db.products = initializeProductsModel(sequelize);
db.user = initializeUserModel(sequelize);
db.favorite = initializeFavoriteModel(sequelize);

// -------------------------Relations------------------------

// Order List Relation
db.order_list.belongsTo(db.order, {
    foreignKey: 'order_id',
});
db.order.hasMany(db.order_list, {
    foreignKey: 'order_id',
});

// Order Relation
db.user.hasMany(db.order, {
    foreignKey: 'user_id',
});
db.order.belongsTo(db.user, {
    foreignKey: 'user_id',
});

// Address Relation
db.address.belongsTo(db.user, {
    foreignKey: 'user_id',
});
db.user.hasMany(db.address, {
    foreignKey: 'user_id',
});

// Product Relation
db.order_list.belongsTo(db.products, {
    foreignKey: 'product_id',
});
db.products.hasMany(db.order_list, {
    foreignKey: 'product_id',
});

// Favorite Relation
db.favorite.belongsTo(db.user, {
    foreignKey: 'user_id',
});
db.user.hasMany(db.favorite, {
    foreignKey: 'user_id',
});

db.favorite.belongsTo(db.products, {
    foreignKey: 'product_id',
});
db.products.hasMany(db.favorite, {
    foreignKey: 'product_id',
});

export default db;
