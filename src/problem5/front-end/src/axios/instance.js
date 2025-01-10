import axios from 'axios';
import severUrl from '../constant/severUrl';

const instance = axios.create({
    baseURL: severUrl,
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' },
});
export default instance;
