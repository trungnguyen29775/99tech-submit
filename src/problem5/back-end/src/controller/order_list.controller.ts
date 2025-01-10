import { Application, Router } from 'express';
import { addProduct, viewList } from '../service/order_list.service';

export default (app: Application): void => {
    const router = Router();

    router.post('/create-order-list', addProduct);
    router.post('/view-order-list', viewList);

    app.use('/', router);
};
