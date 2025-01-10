import './typeList.css';
import { FaStar } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import { useContext, useEffect, useState } from 'react';
import instance from '../../axios/instance';
import StateContext from '../../redux/Context';
import { FaRegHeart } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa';
import { FAVORITE, HOME } from '../../constant/constant.redux';
import { addOrder, addFavorite, navFavorite, navHome, removeFavorite, removeProduct } from '../../redux/Action';

function TypleList(props) {
    const [data, setData] = useState({});
    const [state, dispatchState] = useContext(StateContext);
    useEffect(() => {
        setData(props.data);
        console.log(props);
    }, [props]);
    const handleDeleteProduct = (e) => {
        e.stopPropagation();
        instance
            .post('/delete-product', { productId: data.product_id })
            .then((response) => {
                dispatchState(removeProduct(data));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleAddFavorite = (e) => {
        e.stopPropagation();
        instance
            .post('/add-favorite', {
                userId: state.userData.userId,
                productId: data.product_id,
            })
            .then((response) => {
                if (response.status === 200) dispatchState(addFavorite(data));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDeleteFavorite = (e) => {
        e.stopPropagation();
        instance
            .post('/delete-favorite', {
                userId: state.userData.userId,
                productId: data.product_id,
            })
            .then((response) => {
                if (response.status === 200) dispatchState(removeFavorite(data));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleAddFood = (e) => {
        e.stopPropagation();
        dispatchState(addOrder(data));
    };

    return (
        <div className="type-list-element">
            {state.login ? (
                state.userData.isAdmin == '1' ? (
                    <div className="delete-product-button" onClick={(e) => handleDeleteProduct(e)}>
                        <span style={{ margin: 'auto' }}>X</span>
                    </div>
                ) : state.userData.favorite ? (
                    state.userData.favorite.indexOf(data) === -1 ? (
                        <div className="favorite-product-button" onClick={(e) => handleAddFavorite(e)}>
                            <FaRegHeart style={{ margin: 'auto' }} />
                        </div>
                    ) : (
                        <div className="favorite-product-button" onClick={(e) => handleDeleteFavorite(e)}>
                            <FaHeart style={{ margin: 'auto' }} />
                        </div>
                    )
                ) : (
                    <div className="favorite-product-button" onClick={(e) => handleDeleteFavorite(e)}>
                        <FaHeart style={{ margin: 'auto' }} />
                    </div>
                )
            ) : (
                ''
            )}

            <div className="type-list-element-container">
                <img
                    className="type-list-element__img"
                    src={
                        'https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_limit,w_1200,h_630,dpr_1/https://assets.app.engoo.com/images/x7jPxj9YtJfv97hnC3mMmQog5VwuYojZ7tlrhczGXIV.jpeg'
                    }
                    alt={data.name}
                />
            </div>
            <span className="name-food">{data?.name}</span>
            <div className="star-container">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
            </div>
            <span className="price-food">Price: {data?.price}VND</span>
            <div className="number-left">
                <span>
                    <span className="highlight">Rs. </span>
                    {data?.countInStock}
                </span>

                <div className="add-food" onClick={(e) => handleAddFood(e)}>
                    <AiOutlinePlus style={{ margin: 'auto' }} />
                </div>
            </div>
        </div>
    );
}

export default TypleList;
