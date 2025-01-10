import { Application, Router } from 'express';
import { addAddress, viewAddress, removeAddress } from '../service/address.service';

export default (app: Application): void => {
    const router = Router();

    router.post('/add-address', addAddress);
    router.post('/view-address', viewAddress);
    router.post('/delete-address', removeAddress);

    app.use('/', router);
};
