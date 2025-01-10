import './homeLayout.css';
import LeftSideBar from '../../components/leftSideBar/leftSideBar';
import RightSideBar from '../../components/rightSideBar/rightSideBar';
import Home from '../../pages/home/home';
import { useContext, useEffect, useState } from 'react';
import Setting from '../../pages/setting/Setting';
import StateContext from '../../redux/Context';

import Order from '../../pages/order/order';
import { ADDRESS, FAVORITE, HOME, ORDER, SETTING } from '../../constant/constant.redux';
import Address from '../../pages/address/address';
import Favorite from '../../pages/favorite/favorite';

function HomeLayout() {
    const [state, setState] = useContext(StateContext);
    return (
        <div className="home-layout-wrapper">
            <LeftSideBar />
            {state.element === HOME ? (
                <Home />
            ) : state.element === SETTING ? (
                <Setting />
            ) : state.element === ORDER ? (
                <Order />
            ) : state.element === ADDRESS ? (
                <Address />
            ) : state.element === FAVORITE ? (
                <Favorite />
            ) : (
                ''
            )}
            <RightSideBar />
        </div>
    );
}
export default HomeLayout;
