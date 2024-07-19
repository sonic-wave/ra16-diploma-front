import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearSearchList } from '../../redux/slices/searchSlice';
import { fetchCatalog } from '../../redux/slices/catalogSlice';

export const CatalogSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debounceTimeout, setDebounceTimeout] = useState(null);
    const dispatch = useAppDispatch();
    const searchList = useAppSelector(state => state.searchList.searchList);

    useEffect(() => {
        if (searchList.length > 0) {
            setSearchTerm(searchList);
        }
    }, [searchList]);


    const handleAddSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const newTimeout = setTimeout(() => {
            if (value) {
                dispatch(fetchCatalog(`items?q=${value}`));
                dispatch(clearSearchList());
            } else {
                dispatch(clearSearchList());
                dispatch(fetchCatalog(`items`));
            }
        }, 500);

        setDebounceTimeout(newTimeout);
    };

    return (
        <form className="catalog-search-form form-inline">
            <input className="form-control" placeholder="Поиск" value={searchTerm} onChange={handleAddSearch} />
        </form>
    )
}


