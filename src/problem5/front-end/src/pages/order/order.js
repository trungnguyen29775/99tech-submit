import { useContext, useEffect, useState } from 'react';
import './order.css';
import StateContext from '../../redux/Context';
import instance from '../../axios/instance';
import Header from '../../components/header/header';
import OrderList from '../../components/orderList/orderList';

function Order() {
    const [state, dispatchState] = useContext(StateContext);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        console.log(order);
    }, [order]);

    useEffect(() => {
        instance
            .post('/view-order', {
                user_id: state.userData.userId,
            })
            .then((response) => {
                if (response.status === 200) setOrder(response.data);
            });
    }, []);

    return (
        <div className="order-wrapper">
            <Header />
            <div className="order-page-header">
                <span>My Orders</span>
            </div>
            <div className="order-page-content">
                {order[0] ? (
                    order?.map((order, index) => {
                        return <OrderList data={order} key={index} />;
                    })
                ) : (
                    <span>No Past Order</span>
                )}
            </div>
        </div>
    );
}

export default Order;
