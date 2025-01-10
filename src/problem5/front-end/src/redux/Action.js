import { type } from '@testing-library/user-event/dist/type';
import {
    ADDRESS,
    GET_USER_DATA,
    GET_ADDRESS_DATA,
    HOME,
    LOGGED,
    ORDER,
    SETTING,
    PAYMENT,
    FAVORITE,
    PLUS_ORDER,
    MINUS_ORDER,
    ADD_ORDER,
    CANCEL_ORDER,
    ADD_FAVORITE,
    REMOVE_FAVORITE,
    GET_FAVORITE_DATA,
    GET_PRODUCT_DATA,
    ADD_PRODUCT,
    REMOVE_PRODUCT,
} from '../constant/constant.redux';

export const navSetting = () => {
    return {
        type: SETTING,
    };
};

export const navHome = () => {
    return {
        type: HOME,
    };
};

export const getUserData = (payload) => {
    return {
        type: GET_USER_DATA,
        payload,
    };
};

export const getAddressData = (payload) => {
    return {
        type: GET_ADDRESS_DATA,
        payload,
    };
};

export const logged = () => {
    return {
        type: LOGGED,
    };
};

export const navOrder = () => {
    return {
        type: ORDER,
    };
};

export const navAddress = () => {
    return {
        type: ADDRESS,
    };
};

export const navPayment = () => {
    return {
        type: PAYMENT,
    };
};

export const navFavorite = () => {
    return {
        type: FAVORITE,
    };
};

export const addFavorite = (payload) => {
    return {
        type: ADD_FAVORITE,
        payload,
    };
};

export const removeFavorite = (payload) => {
    return {
        type: REMOVE_FAVORITE,
        payload,
    };
};

export const getFavoriteData = (payload) => {
    return {
        type: GET_FAVORITE_DATA,
        payload,
    };
};

export const addOrder = (payload) => {
    return {
        type: ADD_ORDER,
        payload,
    };
};

export const plusOrder = (payload) => {
    return {
        type: PLUS_ORDER,
        payload,
    };
};

export const minusOrder = (payload) => {
    return {
        type: MINUS_ORDER,
        payload,
    };
};

export const cancelOrder = (payload) => {
    return {
        type: CANCEL_ORDER,
        payload,
    };
};

export const getProductData = (payload) => {
    return {
        type: GET_PRODUCT_DATA,
        payload,
    };
};

export const addProduct = (payload) => {
    return {
        type: ADD_PRODUCT,
        payload,
    };
};

export const removeProduct = (payload) => {
    return {
        type: REMOVE_PRODUCT,
        payload,
    };
};
