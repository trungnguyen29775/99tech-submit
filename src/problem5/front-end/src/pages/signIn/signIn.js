import React, { useContext, useEffect } from 'react';
import './signIn.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../../axios/instance';
import StateContext from '../../redux/Context';
import { LOGGED } from '../../constant/constant.redux';
import { getUserData } from '../../redux/Action';

export default function SignIn() {
    const navigate = useNavigate();
    const [state, dispatchState] = useContext(StateContext);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // Use Effect
    useEffect(() => {
        if (state.login) navigate('/');
    }, [state]);

    const handleSignIn = (event) => {
        event.preventDefault();
        instance
            .post('/sign-in', {
                email: loginEmail,
                password: loginPassword,
            })
            .then((response) => {
                dispatchState(getUserData(response.data));
                dispatchState({ type: LOGGED });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handlChangeEmailLogin = (event) => {
        setLoginEmail(event.target.value);
    };

    const handlChangePasswordLogin = (event) => {
        setLoginPassword(event.target.value);
    };

    return (
        <div className="auth">
            <div className="form-container">
                <div className="logo">
                    <img src="https://cdn-icons-png.flaticon.com/512/4039/4039232.png" alt="" />
                </div>
                <form action="/signin" method="GET" onSubmit={(e) => handleSignIn(e)}>
                    <input
                        value={loginEmail}
                        name="email"
                        placeholder="Email"
                        onChange={(e) => handlChangeEmailLogin(e)}
                    />
                    <input
                        value={loginPassword}
                        type="password"
                        name="password"
                        id=""
                        placeholder="Password"
                        onChange={(e) => handlChangePasswordLogin(e)}
                    />
                    <div className="text">
                        <a>Forget Password?</a>
                    </div>
                    <button type="submit">Login</button>
                </form>
                <div className="forget">
                    <p>New user?</p> <span onClick={() => navigate('/sign-up')}>Register</span>
                </div>
            </div>
        </div>
    );
}
