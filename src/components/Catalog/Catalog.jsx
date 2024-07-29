import { useState, useEffect } from 'react'
import { Categories } from '../Categories/Categories'
import { LoadMoreBtn } from '../LoadMoreBtn/LoadMoreBtn'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCatalog, fetchCatalogItem } from '../../redux/slices/catalogSlice';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from '../../functions/formatNumber';
import { Loader } from '../Loader/Loader';
import './Catalog.css';

export const Catalog = ({ children }) => {
    const [loadMore, setLoadMore] = useState('items');
    const [disabled, setDisabled] = useState(false);
    const [deleteButton, setDeleteButton] = useState(true);
    const [activeCategory, setActiveCategory] = useState(null);
    const { catalog, loading, error, notFound } = useAppSelector((state) => state.catalog);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if (catalog.length === 0 && !notFound) {
            dispatch(fetchCatalog('items'));
        }
    }, [])

    const categoryClickHandler = (options, categoryId) => {
        setDeleteButton(true);
        setLoadMore(options);
        setActiveCategory(categoryId);
        dispatch(fetchCatalog(options));
    }

    const loadMoreHandler = () => {
        setDisabled(true);
        const currentOffset = catalog.length;

        const url = loadMore === 'items' ? `items?offset=${currentOffset}` : `${loadMore}&offset=${currentOffset}`;

        dispatch(fetchCatalog(url)).then((result) => {
            if (result.payload.length < 6) {
                setDeleteButton(false);
            }
            setDisabled(false);
        });
    };

    const orderClickHandler = async (id) => {
        const resultAction = await dispatch(fetchCatalogItem(id));
        if (fetchCatalogItem.fulfilled.match(resultAction)) {
          navigate(`/catalog/${id}`, { state: { catalogItem: resultAction.payload } });
        }
      };

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <section className="catalog">
                <h2 className="text-center">Каталог</h2>
                {children}
                <Categories categoryClickHandler={categoryClickHandler} activeCategory={activeCategory} />
                <div className="row">
                    {catalog && catalog.map(item => (
                        <div className="col-4" key={item.id}>
                            <div className="card catalog-item-card">
                                <img src={item.images[0]}
                                    className="card-img-top img-fluid" alt={item.title} />
                                <div className="card-body">
                                    <p className="card-text">{item.title}</p>
                                    <p className="card-text">{formatNumber(item.price)} руб.</p>
                                    <a className="btn btn-outline-primary" onClick={() => orderClickHandler(item.id)}>Заказать</a>
                                </div>
                            </div>
                        </div>
                    ))}
                    {notFound && <div style={{textAlign: 'center', color: 'red'}}>Товары не найдены</div>}
                </div>
                {deleteButton && !notFound && <LoadMoreBtn loadMoreHandler={loadMoreHandler} disabled={disabled} />}
            </section>
        </>
    )
}
