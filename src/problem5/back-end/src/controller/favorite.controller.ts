import { Application, Router } from 'express';
import { addFavorite, viewFavorite, removeFavorite } from '../service/favorite.service';

export default (app: Application): void => {
    const router = Router();

    router.post('/add-favorite', addFavorite);
    router.post('/view-favorite', viewFavorite);
    router.post('/delete-favorite', removeFavorite);

    app.use('/', router);
};
