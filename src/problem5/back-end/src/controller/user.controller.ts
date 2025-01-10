import { Application, Router } from 'express';
import { login, signup, updateInfo } from '../service/user.service';

export default (app: Application): void => {
    const router = Router();

    router.post('/sign-in', login);
    router.post('/sign-up', signup);
    router.put('/update-info', updateInfo);

    app.use('/', router);
};
