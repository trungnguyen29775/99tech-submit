import Reducer, { initState } from './Reducer';

const store = {
    reducer: Reducer,
    initState: initState,
};
export * as action from './Action';
export default store;
