import { useEffect, useState } from 'react';
import './header.css';
import { IoIosSearch } from 'react-icons/io';
import instance from '../../axios/instance';
import TypleList from '../typeList/typeList';

function Header() {
    const [search, setSearch] = useState('');
    const [searchResult, setSetResult] = useState([]);
    const [searchState, setSearchState] = useState('no-search');
    useEffect(() => {
        if (search?.length > 0) {
            instance
                .post('/search-product', {
                    search: search,
                })
                .then((response) => {
                    if (response.data.length > 0) {
                        setSetResult(response.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setSetResult([]);
        }
    }, [search]);

    useEffect(() => {
        if (searchResult?.length > 0) {
            setSearchState('search-succeed');
        } else {
            setSearchState('no-search');
        }
        console.log(searchResult);
    }, [searchResult]);

    useEffect(() => {
        switch (searchState) {
            case 'no-search': {
                const searchDropBar = document.querySelector('.searh-item--drop-down');
                searchDropBar.classList.add('hide');
                break;
            }
            case 'search-succeed': {
                const searchDropBar = document.querySelector('.searh-item--drop-down');
                searchDropBar.classList.remove('hide');
                break;
            }
            default: {
                break;
            }
        }
    }, [searchState]);

    const handleChangeSearch = (event) => {
        setSearch(event.target.value);
    };

    const handelShowProduct = (event, payload) => {
        event.stopPropagation();
        console.log(payload);
    };

    return (
        <div className="home-header-container">
            <img className="logo__img" src="image/logo.png" />
            <div className="home-search-container">
                <div className="searh-item--drop-down">
                    {searchResult?.map((item, key) => {
                        return (
                            <div onClick={(e) => handelShowProduct(e, item)} className="search-item" key={key}>
                                <img className="search-item__img" src={item.image_path} />
                                <span className="search-item__span">{item.name}</span>
                            </div>
                        );
                    })}
                </div>
                <input
                    onChange={handleChangeSearch}
                    value={search}
                    className="home-search-container__input"
                    placeholder="Search for food"
                />
                <IoIosSearch fontSize={'25px'} />
            </div>
        </div>
    );
}

export default Header;
