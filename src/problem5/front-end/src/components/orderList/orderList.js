import React from 'react';
import './orderList.css';
import { useContext, useEffect, useState } from 'react';
import instance from '../../axios/instance';
import StateContext from '../../redux/Context';

function OrderList(props) {
    const data = props.data;
    const [products, setProducts] = useState([]);
    const [state, dispatchState] = useContext(StateContext);
    const [showDetail, setShowDetail] = useState(false);
    const [list, setList] = useState([]);
    useEffect(() => {
        instance
            .get('/view-product')
            .then((response) => {
                if (response.status === 200) setProducts(response.data);
            })
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        instance
            .post('/view-order-list', {
                order_id: data.order_id,
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setList(response.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const handleDetail = () => {
        setShowDetail(!showDetail);
        console.log(data);
    };
    return (
        <div className="order-list-element">
            <div className="order-brief">
                <div classeName="order-price">
                    <b>Total Price: </b>
                    {data.totalPrice} VND
                </div>
                <div className="order-payment-method">
                    <b>Payment: </b> {data.paymentMethod}
                </div>
                <div className="order-address">
                    <b>Delivery To: </b> {data.shippingAddress}
                </div>
                <div classname="order-detail-btn">
                    <button onClick={handleDetail}>{showDetail ? 'Hide' : 'Show detail'}</button>
                </div>
            </div>
            {showDetail && (
                <div className="order-detail">
                    {list.map((item) => {
                        return (
                            <div className="order-detail-item">
                                <div className="order-detail-name">
                                    {products.filter((product) => product.product_id == item.product_id)[0].name}
                                </div>
                                <div classname="order-detail-quantity">{item.quantity}</div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default OrderList;
