import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import HomeLayout from './layout/homeLayout/homeLayout';
import StateContext from './redux/Context';
import { useContext, useEffect } from 'react';
import SignUp from './pages/signUp/signUp';
import SignIn from './pages/signIn/signIn';
import Payment from './pages/payment/payment';

function App() {
    const [state, setState] = useContext(StateContext);
    const navigate = useNavigate();
    useEffect(() => {
        // if(!state.login)
        //     navigate('/')
        console.log(state);
    }, [state]);

    return (
        <Routes>
            <Route path="/" element={<HomeLayout />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/sign-in" element={<SignIn />} />
        </Routes>
    );
}

export default App;
