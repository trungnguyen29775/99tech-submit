import {
    ADDRESS,
    ADD_FAVORITE,
    FAVORITE,
    GET_FAVORITE_DATA,
    GET_USER_DATA,
    HOME,
    LOGGED,
    LOGOUT,
    ORDER,
    PAYMENT,
    REMOVE_FAVORITE,
    SETTING,
    ADD_ORDER,
    PLUS_ORDER,
    MINUS_ORDER,
    CANCEL_ORDER,
    GET_PRODUCT_DATA,
    ADD_PRODUCT,
    REMOVE_PRODUCT,
} from '../constant/constant.redux';

export const initState = {
    login: false,
    element: 'HOME',
    userData: {
        name: '',
        email: '',
        userId: '',
        isAdmin: '',
        phoneNum: '',
        favorite: [],
    },
    orderData: [],
    orderDataId: [],
    productData: [],
};

const Reducer = (state, action) => {
    switch (action.type) {
        case SETTING: {
            return {
                ...state,
                element: SETTING,
            };
        }
        case HOME: {
            return {
                ...state,
                element: HOME,
            };
        }

        case LOGOUT: {
            return {
                ...state,
                userData: {
                    name: '',
                    email: '',
                    userId: '',
                    isAdmin: '',
                    phoneNum: '',
                    favorite: [],
                },
                orderData: [],
                orderDataId: [],
                login: false,
            };
        }
        case GET_USER_DATA: {
            return {
                ...state,
                userData: action.payload,
            };
        }

        case LOGGED: {
            return {
                ...state,
                login: true,
            };
        }
        case ORDER:
            return {
                ...state,
                element: ORDER,
            };
        case ADDRESS: {
            return {
                ...state,
                element: ADDRESS,
            };
        }
        case FAVORITE: {
            return {
                ...state,
                element: FAVORITE,
            };
        }
        case ADD_FAVORITE:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    favorite: [...state.userData.favorite, action.payload],
                },
            };

        case REMOVE_FAVORITE:
            const indexOfFavorite = state.userData.favorite.indexOf(action.payload);
            console.log(indexOfFavorite);
            return {
                ...state,
                userData: {
                    ...state.userData,
                    favorite: state.userData.favorite
                        .slice(0, indexOfFavorite)
                        .concat(state.userData.favorite.slice(indexOfFavorite + 1, state.userData.favorite.length)),
                },
            };
        case GET_FAVORITE_DATA: {
            return {
                ...state,
                userData: {
                    ...state.userData,
                    favorite: action.payload,
                },
            };
        }

        case ADD_ORDER: {
            let newOrder = action.payload;
            const indexOfOrder = state.orderDataId.indexOf(action.payload.product_id);
            console.log(indexOfOrder);
            if (indexOfOrder === -1) {
                newOrder = { ...newOrder, count: 1 };
                return {
                    ...state,
                    orderDataId: [...state.orderDataId, action.payload.product_id],
                    orderData: [...state.orderData, newOrder],
                };
            } else {
                newOrder = { ...newOrder, count: state.orderData[indexOfOrder].count + 1 };

                return {
                    ...state,
                    orderData: state.orderData
                        .slice(0, indexOfOrder)
                        .concat(newOrder)
                        .concat(state.orderData.slice(indexOfOrder + 1, state.orderData.length)),
                };
            }
        }
        case PLUS_ORDER: {
            const indexOfOrder = state.orderData.indexOf(action.payload);
            let addQuantityOrder = state.orderData[indexOfOrder];
            addQuantityOrder = { ...addQuantityOrder, count: state.orderData[indexOfOrder].count + 1 };
            return {
                ...state,
                orderData: state.orderData
                    .slice(0, indexOfOrder)
                    .concat(addQuantityOrder)
                    .concat(state.orderData.slice(indexOfOrder + 1, state.orderData.length)),
            };
        }

        case MINUS_ORDER: {
            const indexOfOrder = state.orderData.indexOf(action.payload);
            let minusQuantityOrder = state.orderData[indexOfOrder];
            if (state.orderData[indexOfOrder].count === 0) return state;
            minusQuantityOrder = { ...minusQuantityOrder, count: state.orderData[indexOfOrder].count - 1 };
            return {
                ...state,
                orderData: state.orderData
                    .slice(0, indexOfOrder)
                    .concat(minusQuantityOrder)
                    .concat(state.orderData.slice(indexOfOrder + 1, state.orderData.length)),
            };
        }

        case CANCEL_ORDER: {
            const indexOfOrder = state.orderData.indexOf(action.payload);
            return {
                ...state,
                orderData: state.orderData
                    .slice(0, indexOfOrder)
                    .concat(state.orderData.slice(indexOfOrder + 1, state.orderData.length)),
            };
        }

        case GET_PRODUCT_DATA: {
            return {
                ...state,
                productData: action.payload,
            };
        }

        case ADD_PRODUCT: {
            return {
                ...state,
                productData: [...state.productData, action.payload],
            };
        }

        case REMOVE_PRODUCT: {
            const targetDelete = state.productData.indexOf(action.payload);
            return {
                ...state,
                productData: state.productData
                    .slice(0, targetDelete)
                    .concat(state.productData.slice(targetDelete + 1, state.productData.length)),
            };
        }

        default: {
            console.log('Hello');
            return state;
        }
    }
};
export default Reducer;
