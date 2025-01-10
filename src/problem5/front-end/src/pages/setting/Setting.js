import React, { useContext, useState } from 'react';
import './setting.css';
import instance from '../../axios/instance';
import StateContext from '../../redux/Context';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../redux/Action';

export default function Setting() {
    const navigate = useNavigate();
    const [state, setState] = useContext(StateContext);
    const [showUpdate, setShowUpdate] = useState(false);
    const [name, setName] = useState(state.userData.name);
    const [email, setEmail] = useState(state.userData.email);
    const [phoneNum, setPhoneNum] = useState(state.userData.phoneNum);
    const handleUpdate = (e) => {
        e.preventDefault();
        instance
            .put('/update-info', {
                user_id: state.userData.userId,
                name: name,
                email: email,
                phoneNum: phoneNum,
            })
            .then((response) => setState(getUserData(response.data)))
            .catch((err) => console.log(err));
        navigate('/');
    };
    return (
        <div className="profile-section">
            {state.login ? (
                <>
                    <div className="profile-photo">
                        <img src="/image/default-avt-image.jpg" />
                    </div>
                    <div className="profile-detail">
                        <form onSubmit={(e) => handleUpdate(e)} onClick={(e) => e.stopPropagation()}>
                            <div className="profile-input">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => {
                                        setShowUpdate(true);
                                        setName(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="profile-input">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={(e) => {
                                        setShowUpdate(true);
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="profile-input">
                                <label htmlFor="mob">Mobile No.</label>
                                <input
                                    type="text"
                                    id="mob"
                                    value={phoneNum}
                                    onChange={(e) => {
                                        setShowUpdate(true);
                                        setPhoneNum(e.target.value);
                                    }}
                                />
                            </div>
                            {showUpdate && <button type="submit">UPDATE</button>}
                        </form>
                    </div>
                </>
            ) : (
                <div className="no-user">
                    <h1>You are not Logged In!,Please Login</h1>
                    <button>Login</button>
                </div>
            )}
        </div>
    );
}
