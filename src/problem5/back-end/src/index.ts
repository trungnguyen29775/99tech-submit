import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './models';
import userController from './controller/user.controller';
import addressController from './controller/address.controller';
import productsController from './controller/products.controller';
import favoriteController from './controller/favorite.controller';
import orderController from './controller/order.controller';
import orderListController from './controller/order_list.controller';
import { insertProductsByType } from './service/product.service';
const app: Application = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.sequelize.sync({ alter: true }).then(() => {
    console.log('Database synchronized');
    insertProductsByType();
});

// Routes
userController(app);
addressController(app);
productsController(app);
favoriteController(app);
orderController(app);
orderListController(app);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
