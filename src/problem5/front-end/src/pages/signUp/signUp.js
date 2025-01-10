import React, { useContext, useEffect, useState } from 'react';
import './signUp.css';
import { useNavigate } from 'react-router-dom';
import instance from '../../axios/instance';
import Loading from '../../components/loadingScreen/loading';
import StateContext from '../../redux/Context';
import { getUserData, logged } from '../../redux/Action';
import { LOGGED } from '../../constant/constant.redux';
function SignUp() {
    const navigate = useNavigate();
    const [state, dispatchState] = useContext(StateContext);
    const [registerState, setRegisterState] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerName, setRegisterName] = useState('');

    useEffect(() => {
        if (registerState === 'succeed') {
            dispatchState({ type: LOGGED });
            navigate('/');
        }
    }, [registerState]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setRegisterState('onSignUp');
        instance
            .post('/sign-up', {
                name: registerName,
                email: registerEmail,
                password: registerPassword,
            })
            .then((res) => {
                if (res.status === 200) {
                    setTimeout(() => {
                        dispatchState(getUserData(res.data));
                        setRegisterState('succeed');
                    }, 1000);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handelRegisterEmailChange = (event) => {
        setRegisterEmail(event.target.value);
    };
    const handelRegisterPasswordChange = (event) => {
        setRegisterPassword(event.target.value);
    };
    const handelRegisterNameChange = (event) => {
        setRegisterName(event.target.value);
    };

    return (
        <div className="auth">
            {registerState === 'onSignUp' ? <Loading /> : ''}
            <div className="form-container">
                <div className="logo">
                    <img src="https://cdn-icons-png.flaticon.com/512/4039/4039232.png" alt="" />
                </div>
                <form onSubmit={(e) => handleSubmit(e)} className="register-form">
                    <input
                        value={registerName}
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={(e) => handelRegisterNameChange(e)}
                    />
                    <input
                        value={registerEmail}
                        name="email"
                        placeholder="Email"
                        onChange={(e) => handelRegisterEmailChange(e)}
                    />
                    <input
                        value={registerPassword}
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => handelRegisterPasswordChange(e)}
                    />
                    <button type="submit">Register</button>
                </form>
                <div className="forget">
                    <p>Already have account?</p> <span onClick={() => navigate('/')}>Sign in</span>
                </div>
            </div>
        </div>
    );
}
export default SignUp;
