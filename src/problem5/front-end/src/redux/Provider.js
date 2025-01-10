import { useReducer } from 'react';
import StateContext from './Context';
import Reducer, { initState } from './Reducer';
function StateProvider({ children }) {
    const [state, dispatch] = useReducer(Reducer, initState);
    return <StateContext.Provider value={[state, dispatch]}>{children}</StateContext.Provider>;
}
export default StateProvider;
