import './rightSideBar.css';
import { FiShoppingCart } from 'react-icons/fi';
import { FaRegBell, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import StateContext from '../../redux/Context';
import { navPayment, plusOrder, minusOrder, cancelOrder, addProduct } from '../../redux/Action';
import instance from '../../axios/instance';
import Loading from '../loadingScreen/loading';
import Succeed from '../succeed/succeed';

const productTypes = ['Pizza', 'Burger', 'Sandwich', 'Smoothy', 'Snack', 'Drink'];

function RightSideBar() {
    const navigate = useNavigate();
    const [state, dispatchState] = useContext(StateContext);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        price: '',
        countInStock: '',
        rating: '',
        imagePath: '',
        description: '',
    });
    const [addFoodState, setAddFoodState] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddProduct = async (event) => {
        event.preventDefault();
        setAddFoodState('onAdding');
        try {
            const response = await instance.post('/add-product', formData);
            if (response.status === 200) {
                setAddFoodState('addFoodNotify');
                setFormData({
                    name: '',
                    type: '',
                    price: '',
                    countInStock: '',
                    rating: '',
                    imagePath: '',
                    description: '',
                });
                dispatchState(addProduct(response.data));
            }
        } catch (err) {
            console.error(err);
            setAddFoodState('error');
        }
    };

    const handlePaymentClick = () => {
        dispatchState(navPayment());
        navigate('/payment');
    };

    const handleOrderAction = (action, data) => {
        switch (action) {
            case 'plus':
                dispatchState(plusOrder(data));
                break;
            case 'minus':
                dispatchState(minusOrder(data));
                break;
            case 'cancel':
                dispatchState(cancelOrder(data));
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (addFoodState === 'addFoodNotify' || addFoodState === 'error') {
            const timer = setTimeout(() => setAddFoodState(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [addFoodState]);

    return (
        <div className="right-side-bar-wrapper">
            {addFoodState === 'onAdding' && <Loading />}
            {addFoodState === 'addFoodNotify' && <Succeed />}
            {addFoodState === 'error' && (
                <div className="error-message">
                    <span>Failed to add product. Please try again.</span>
                </div>
            )}
            <div className="right-side-bar-header">
                {state.login ? (
                    <img src="/image/default-avt-image.jpg" alt="User Avatar" />
                ) : (
                    <button onClick={() => navigate('/sign-in')} className="right-side-bar-header__button">
                        Login
                    </button>
                )}
                {!state.userData.isAdmin && (
                    <div className="header-icon--center">
                        <FiShoppingCart />
                    </div>
                )}
                <div className="header-icon--center">
                    <FaRegBell />
                    <div className="num-cart--up">
                        <span>0</span>
                    </div>
                </div>
            </div>
            {!state.userData.isAdmin && (
                <div className="slogan-container">
                    <img src="/image/right-side-bar-image.png" alt="Slogan" />
                    <span className="slogan">
                        Safe Delivery <span className="hightlight">@</span> your doors
                    </span>
                </div>
            )}
            {state.userData.isAdmin ? (
                <div className="add-product-form-container">
                    <form className="add-product-form" onSubmit={handleAddProduct}>
                        <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name Food" />
                        <select name="type" onChange={handleInputChange} value={formData.type}>
                            <option value="" disabled>
                                Select Type
                            </option>
                            {productTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        <input
                            name="price"
                            onChange={handleInputChange}
                            placeholder="Price Food"
                            value={formData.price}
                        />
                        <input
                            name="countInStock"
                            onChange={handleInputChange}
                            placeholder="Count In Stock"
                            value={formData.countInStock}
                        />
                        <input
                            name="rating"
                            onChange={handleInputChange}
                            placeholder="Rating"
                            value={formData.rating}
                        />
                        <input
                            name="imagePath"
                            onChange={handleInputChange}
                            placeholder="Image Path"
                            value={formData.imagePath}
                        />
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Describe Food"
                        />
                        <div className="admin-add-product-container">
                            <button type="submit" className="admin-add-product">
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="right-side-bar-order-container">
                    <div className="header">
                        <span>Order</span>
                        <span className="view-all">View All</span>
                    </div>
                    <div className="right-side-bar-order-list">
                        {state.orderData?.map((item, index) => (
                            <div className="order" key={index}>
                                <div className="order-img-container">
                                    <img src={item.image_path} alt={item.name} />
                                </div>
                                <div className="order-detail">
                                    <span className="order-detail-header">{item.name}</span>
                                    <span>Quantity: {item.countInStock}</span>
                                    <div className="edit-order-container">
                                        <button onClick={() => handleOrderAction('minus', item)}>
                                            <span>-</span>
                                        </button>
                                        <span>{item.count}</span>
                                        <button onClick={() => handleOrderAction('plus', item)}>
                                            <span>+</span>
                                        </button>
                                        <button className="danger" onClick={() => handleOrderAction('cancel', item)}>
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {state.orderData?.length > 0 && (
                            <button className="right-side-bar-payment__button" onClick={handlePaymentClick}>
                                PROCEED TO CHECKOUT
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default RightSideBar;
