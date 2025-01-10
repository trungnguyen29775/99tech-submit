import './leftSideBar.css';
import { FaHome, FaBoxOpen } from 'react-icons/fa';
import { IoIosHeartHalf } from 'react-icons/io';
import { FaRegFileAlt } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import StateContext from '../../redux/Context';
import { useContext } from 'react';
import { HOME, LOGOUT } from '../../constant/constant.redux';
import { navAddress, navFavorite, navHome, navOrder, navSetting } from '../../redux/Action';

function LeftSideBar() {
    const [state, dispatchState] = useContext(StateContext);
    const handleLeftSideNav = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const navDir = event.target.closest('.left-side-navigate-icon-container').classList[1];
        switch (navDir) {
            case 'home': {
                dispatchState(navHome(event));
                break;
            }
            case 'setting': {
                dispatchState(navSetting(event));
                break;
            }
            case 'order': {
                dispatchState(navOrder(event));
                break;
            }
            case 'address': {
                dispatchState(navAddress(event));
                break;
            }
            case 'favorite': {
                dispatchState(navFavorite(event));
                break;
            }
            default: {
                console.log(navDir);
                break;
            }
        }
    };

    const handleLogOut = (event) => {
        dispatchState({ type: LOGOUT });
    };

    return (
        <div className="left-side-container">
            <div className="left-side-navigate-container">
                <div
                    className={
                        state.element === 'HOME'
                            ? 'left-side-navigate-icon-container home active'
                            : 'left-side-navigate-icon-container home'
                    }
                    onClick={(e) => handleLeftSideNav(e)}
                >
                    <FaHome style={{ margin: 'auto' }} />
                </div>

                <div
                    className={
                        state.element === 'ORDER'
                            ? 'left-side-navigate-icon-container order active'
                            : 'left-side-navigate-icon-container order'
                    }
                    onClick={(e) => handleLeftSideNav(e)}
                >
                    <FaBoxOpen style={{ margin: 'auto' }} />
                </div>

                {state.userData?.isAdmin != 1 ? (
                    <div
                        className={
                            state.element === 'FAVORITE'
                                ? 'left-side-navigate-icon-container favorite active'
                                : 'left-side-navigate-icon-container favorite'
                        }
                        onClick={(e) => handleLeftSideNav(e)}
                    >
                        <IoIosHeartHalf style={{ margin: 'auto' }} />
                    </div>
                ) : (
                    ''
                )}

                {state.userData?.isAdmin != 1 ? (
                    <div
                        className={
                            state.element === 'ADDRESS'
                                ? 'left-side-navigate-icon-container address active'
                                : 'left-side-navigate-icon-container address'
                        }
                        onClick={(e) => handleLeftSideNav(e)}
                    >
                        <FaRegFileAlt style={{ margin: 'auto' }} />
                    </div>
                ) : (
                    ''
                )}

                <div
                    className={
                        state.element === 'SETTING'
                            ? 'left-side-navigate-icon-container setting active'
                            : 'left-side-navigate-icon-container setting'
                    }
                    onClick={(e) => handleLeftSideNav(e)}
                >
                    <IoSettingsOutline style={{ margin: 'auto' }} />
                </div>
            </div>
            <div className="left-side-navigate-icon-container logout" onClick={(e) => handleLogOut(e)}>
                <MdLogout style={{ margin: 'auto' }} />
            </div>
        </div>
    );
}
export default LeftSideBar;
