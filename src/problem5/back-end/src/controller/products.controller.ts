import { Application, Router } from 'express';
import { view, create, remove, search } from '../service/product.service';

export default (app: Application): void => {
    const router = Router();

    router.get('/view-product', view);
    router.post('/add-product', create);
    router.post('/delete-product', remove);
    router.post('/search-product', search);

    app.use('/', router);
};
