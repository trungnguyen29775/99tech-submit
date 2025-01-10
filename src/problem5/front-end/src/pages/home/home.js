import './home.css';
import { IoIosSearch } from 'react-icons/io';
import instance from '../../axios/instance';
import TypleList from '../../components/typeList/typeList';
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import StateContext from '../../redux/Context';
import Header from '../../components/header/header';
import { getProductData } from '../../redux/Action';

function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [state, dispatchState] = useContext(StateContext);
    const foodList = document.querySelectorAll('.menu-type');
    const [type, setType] = useState('Pizza');
    const [active, setActive] = useState(0);

    useEffect(() => {
        instance
            .get('/view-product')
            .then((response) => {
                if (response.status === 200) dispatchState(getProductData(response.data));
            })
            .catch((err) => console.log(err));
    }, []);

    const handleFoodType = (i) => {
        const active = document.querySelector('.menu-type.active');
        active.classList.remove('active');
        foodList[i].classList.add('active');
        switch (i) {
            case 0:
                setType('Pizza');
                break;
            case 1:
                setType('Burger');
                break;
            case 2:
                setType('Sandwich');
                break;
            case 3:
                setType('Smoothy');
                break;
            case 4:
                setType('Snack');
                break;
            case 5:
                setType('Drink');
                break;
            default:
                setType('Pizza');
                break;
        }
    };

    return (
        <div className="home-wrapper">
            <Header />
            {/* Home content */}
            <div className="home-content-container">
                {/* Content 1 */}
                <div className="home-welcome">
                    <img className="home-welcom__img" src="/image/pizza-shipper.png" />
                    <div className="welcome-title-container">
                        <span className="header">Hello {state.userData.name}</span>
                        <span>
                            Get Free delivery <span className="highlight">50000 VND</span> and above
                        </span>
                        <button className="welcome__button">Order Now!</button>
                    </div>
                </div>
                {/* Content 2 */}
                <div className="home-menu-container">
                    <span className="menu-header">Menu</span>
                    <div className="menu-type-container">
                        <div className="menu-type active" onClick={() => handleFoodType(0)}>
                            <div className="menu-type-image-container">
                                <img src="/image/pizza.png" />
                            </div>
                            <span>Pizza</span>
                        </div>

                        <div className="menu-type " onClick={() => handleFoodType(1)}>
                            <div className="menu-type-image-container">
                                <img src="/image/burger.png" />
                            </div>
                            <span>Burger</span>
                        </div>

                        <div className="menu-type " onClick={() => handleFoodType(2)}>
                            <div className="menu-type-image-container">
                                <img src="/image/sandwitch.png" />
                            </div>
                            <span>Sandwitch</span>
                        </div>

                        <div className="menu-type " onClick={() => handleFoodType(3)}>
                            <div className="menu-type-image-container">
                                <img src="/image/smoothy.png" />
                            </div>
                            <span>Smoothy</span>
                        </div>

                        <div className="menu-type " onClick={() => handleFoodType(4)}>
                            <div className="menu-type-image-container">
                                <img src="/image/popcorn.png" />
                            </div>
                            <span>Snack</span>
                        </div>

                        <div className="menu-type " onClick={() => handleFoodType(5)}>
                            <div className="menu-type-image-container">
                                <img src="/image/drink.png" />
                            </div>
                            <span>Drink</span>
                        </div>
                    </div>
                    <div className="type-list-container">
                        {state.productData
                            .filter((product) => product.type.toLowerCase() === type.toLowerCase())
                            .map((item, key) => (
                                <TypleList data={item} key={key} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
