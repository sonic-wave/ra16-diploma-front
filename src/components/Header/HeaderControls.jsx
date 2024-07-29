import { useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addSearchTerm, clearSearchList } from '../../redux/slices/searchSlice';
import { useNavigate } from 'react-router-dom';
import { fetchCatalog } from '../../redux/slices/catalogSlice';
import './HeaderControls.css';


export const HeaderControls = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debounceTimeout, setDebounceTimeout] = useState(null);
    const [invisible, setInvisible] = useState(true);
    const inputRef = useRef();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const searchList = useAppSelector(state => state.searchList.searchList);
    const { catalog , loading, error } = useAppSelector((state) => state.catalog);
    const cartList = useAppSelector(state => state.cartList.cartList);


    const expanderClickHandler = () => {
        if (inputRef.current.value !== '') {
            dispatch(fetchCatalog(`items?q=${inputRef.current.value}`));
            navigate('/catalog');
            inputRef.current.value = '';
        }

        setInvisible(!invisible);

        if (invisible) {
            setTimeout(() => inputRef.current.focus(), 0)
        }
    }

    const inputChangeHandler = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const newTimeout = setTimeout(() => {
            if (value) {
                dispatch(addSearchTerm(value));
            } else {
                dispatch(clearSearchList());
            }
        }, 500);

        setDebounceTimeout(newTimeout);
    };

const cartClickHandler = () => {
    navigate('/cart')
}

    return (
        <div className="header-controls">
            <div className="header-controls-pics">
                <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={expanderClickHandler}></div>
                <div className="header-controls-pic header-controls-cart" onClick={cartClickHandler}>
                    {cartList.length > 0 && <div className="header-controls-cart-full">{cartList.length}</div>}
                    <div className="header-controls-cart-menu"></div>
                </div>
            </div>
            <form data-id="search-form" className={invisible ? "header-controls-search-form form-inline invisible" : "header-controls-search-form form-inline"}>
                <input className="form-control" placeholder="Поиск" ref={inputRef} onChange={inputChangeHandler} />
            </form>
        </div>
    )
}

