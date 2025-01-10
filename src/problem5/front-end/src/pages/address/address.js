import Header from '../../components/header/header';
import './address.css';
import { useState, useEffect, useContext } from 'react';
import StateContext from '../../redux/Context';
import instance from '../../axios/instance';

function Address() {
    const [addressData, setAddressData] = useState([]);
    const [state, dispatchState] = useContext(StateContext);
    const [addressState, setAddressState] = useState('');
    const [name, setName] = useState('');
    const [mobNum, setMobNum] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [address, setAddress] = useState('');
    const [town, setTown] = useState('');
    const [stateAddress, setStateAddress] = useState();
    const [city, setCity] = useState('');
    const hideAddAddressForm = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const formContainer = event.target.closest('.add-address-form-container');
        const homeWrapper = document.querySelector('.home-layout-wrapper');
        homeWrapper.classList.remove('overflow-hidden');
        console.log(formContainer.classList);
        formContainer.classList.add('hide');
    };

    const handleShowAddAddressForm = (event) => {
        const formContainer = document.querySelector('.add-address-form-container');
        const homeWrapper = document.querySelector('.home-layout-wrapper');
        homeWrapper.classList.add('overflow-hidden');
        formContainer.classList.remove('hide');
        console.log(addressData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setAddressState('onAdding');
        instance
            .post('/add-address', {
                name: name,
                pinCode: pinCode,
                address: address,
                town: town,
                state: stateAddress,
                city: city,
                userId: state.userData.userId,
            })
            .then((res) => {
                if (res.status === 200) {
                    console.log('hello');
                    setTimeout(() => {
                        setAddressState('showNotify');
                    }, 1000);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        hideAddAddressForm(event);
    };
    const deleteAddress = () => {};
    useEffect(() =>
        //---------------------Call API get user address----------
        {
            instance
                .post('/view-address', {
                    userId: state.userData.userId,
                })
                .then((response) => {
                    setAddressData(response.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }, []);

    return (
        <div className="address-wrapper">
            <div className="add-address-form-container hide" onClick={(e) => hideAddAddressForm(e)}>
                <form
                    className="add-address-form"
                    onSubmit={(e) => handleSubmit(e)}
                    onClick={(e) => e.stopPropagation()}
                >
                    <span className="address-form__span">ADD ADDRESS</span>
                    <input
                        className="address-form__input"
                        placeholder="Name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="address-form__input"
                        placeholder="Mobile No."
                        name="mobNum"
                        type="text"
                        value={mobNum}
                        onChange={(e) => setMobNum(e.target.value)}
                    />
                    <input
                        className="address-form__input"
                        placeholder="Pin Code"
                        name="pinCode"
                        type="text"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                    />
                    <input
                        className="address-form__input"
                        placeholder="Address"
                        name="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                        className="address-form__input"
                        placeholder="Town/Locality"
                        name="town"
                        type="text"
                        value={town}
                        onChange={(e) => setTown(e.target.value)}
                    />
                    <input
                        className="address-form__input"
                        placeholder="State"
                        name="stateAddress"
                        type="text"
                        value={stateAddress}
                        onChange={(e) => setStateAddress(e.target.value)}
                    />
                    <input
                        className="address-form__input"
                        placeholder="City"
                        name="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button className="address-form__button" type="submit">
                        ADD ADDRESS
                    </button>
                </form>
            </div>
            <Header />
            {state.login ? (
                <div className="address-content">
                    <span className="address-header">Your Address</span>
                    <div className="address-list-container">
                        <div className="add-address-container">
                            <span className="address-notify">No Address found! Add one</span>
                            <button className="add-address__button" onClick={(e) => handleShowAddAddressForm(e)}>
                                Add Address
                            </button>
                        </div>
                        <div className="address-list">
                            {addressData ? (
                                addressData?.map((address, i) => (
                                    <div className="og-add" key={address?.address_id}>
                                        <p>{address.name}</p>
                                        <span>
                                            <b>Address :</b>
                                            {address?.address},<b>Town :</b>
                                            {address?.town}
                                        </span>
                                        <span>
                                            <b>City :</b>
                                            {address?.city},<b>State :</b>
                                            {address?.state} -<b>Pin code :</b>
                                            {address?.pinCode}{' '}
                                        </span>
                                        <span>
                                            <b>Mobile No:</b>
                                            {address?.mobNo}
                                        </span>
                                        <div className="btns">
                                            <button
                                                className={`btn ${address?.address_id}`}
                                                onClick={(e) => deleteAddress(e)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h3 style={{ padding: '20px 0' }}>No Address found! Add one</h3>
                            )}
                        </div>
                    </div>
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

export default Address;
