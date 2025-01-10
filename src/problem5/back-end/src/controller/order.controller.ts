import { Application, Router } from 'express';
import { create, view } from '../service/order.service';

export default (app: Application): void => {
    const router = Router();

    router.post('/create-order', create);
    router.post('/view-order', view);

    app.use('/', router);
};
