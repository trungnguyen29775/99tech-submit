import { useContext, useEffect, useState } from 'react';
import Header from '../../components/header/header';
import './favorite.css';
import instance from '../../axios/instance';
import StateContext from '../../redux/Context';
import TypleList from '../../components/typeList/typeList';
import { getFavoriteData } from '../../redux/Action';

function Favorite() {
    const [state, dispatchState] = useContext(StateContext);

    useEffect(() => {
        instance
            .post('/view-favorite', { userId: state.userData.userId })
            .then((response) => {
                if (response.status === 200) {
                    dispatchState(getFavoriteData(response.data));
                }
            })
            .catch((err) => {});
    }, []);

    return (
        <div className="favorite-wrapper">
            <Header />
            {state.login ? (
                <div className="favorite-content-container">
                    <span className="favorite-content-header">My Wishlist</span>
                    {state.userData.favorite ? (
                        state.userData.favorite ? (
                            <div className="type-list-container">
                                {state.userData.favorite.map((item, index) => {
                                    return item !== null ? <TypleList data={item} key={index} nav={'favorite'} /> : '';
                                })}
                            </div>
                        ) : (
                            <div className="favorite-no-data-notify-container">
                                <img src="https://aquamarineexotic.com/adminpanel/assets/images/empty-wishlist.png" />
                            </div>
                        )
                    ) : (
                        ''
                    )}
                </div>
            ) : (
                <div className="no-user">
                    <h1>You are not Logged In!,Please Login</h1>
                    <button>Login</button>
                </div>
            )}
        </div>
    );
}

export default Favorite;
