import { useState, useEffect } from "react";
import { Categories } from "../Categories/Categories";
import { LoadMoreBtn } from "../LoadMoreBtn/LoadMoreBtn";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchCatalog,
  fetchCatalogItem,
} from "../../redux/slices/catalogSlice";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../functions/formatNumber";
import { Loader } from "../Loader/Loader";
import "./Catalog.css";
import { addActiveCatergory } from "../../redux/slices/searchSlice";
import { clearSearchList } from "../../redux/slices/searchSlice";

export const Catalog = ({ children }) => {
  const [disabled, setDisabled] = useState(false);
  const [deleteButton, setDeleteButton] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const { catalog, loading, error, notFound } = useAppSelector(
    (state) => state.catalog,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchList = useAppSelector((state) => state.searchList.searchList);

  useEffect(() => {
    if (searchList) {
      dispatch(fetchCatalog(`items?q=${searchList}`));
    }
    if (catalog.length === 0 && !notFound) {
      dispatch(fetchCatalog("items"));
    }
  }, []);

  useEffect(() => {
    if (searchList && catalog.length < 6) {
      setDeleteButton(false);
      console.log("Убрал кнопку удалить");
    }
  }, [searchList, catalog.length]);

  const categoryClickHandler = (options, categoryId) => {
    setDeleteButton(true);
    setActiveCategory(categoryId);
    if (searchList) {
      if (categoryId) {
        dispatch(
          fetchCatalog(`items?categoryId=${categoryId}&q=${searchList}`),
        );
      } else {
        dispatch(fetchCatalog(`items?q=${searchList}`));
      }
    } else {
      dispatch(fetchCatalog(options));
    }
    dispatch(addActiveCatergory(categoryId));
  };

  const loadMoreHandler = () => {
    setDisabled(true);
    const currentOffset = catalog.length;
    let url = "";

    if (activeCategory && searchList) {
      url = `items?categoryId=${activeCategory}&q=${searchList}&offset=${currentOffset}`;
      console.log("Активны категория и поиск");
    } else if (activeCategory && !searchList) {
      url = `items?categoryId=${activeCategory}&&offset=${currentOffset}`;
      console.log("Активна только категория");
    } else if (!activeCategory && searchList) {
      url = `items?q=${searchList}&&offset=${currentOffset}`;
      console.log("Активен только поиск");
    } else if (!activeCategory && !searchList) {
      url = `items?offset=${currentOffset}`;
      console.log("Ничего не активно");
    }

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
      dispatch(fetchCatalog("items"));
      dispatch(clearSearchList());
      navigate(`/catalog/${id}`, {
        state: { catalogItem: resultAction.payload },
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        {children}
        <Categories
          categoryClickHandler={categoryClickHandler}
          activeCategory={activeCategory}
        />
        <div className="row">
          {catalog &&
            catalog.map((item) => (
              <div className="col-4" key={item.id}>
                <div className="card catalog-item-card">
                  <img
                    src={item.images[0]}
                    className="card-img-top img-fluid"
                    alt={item.title}
                  />
                  <div className="card-body">
                    <p className="card-text">{item.title}</p>
                    <p className="card-text">{formatNumber(item.price)} руб.</p>
                    <a
                      className="btn btn-outline-primary"
                      onClick={() => orderClickHandler(item.id)}
                    >
                      Заказать
                    </a>
                  </div>
                </div>
              </div>
            ))}
          {notFound && (
            <div style={{ textAlign: "center", color: "red" }}>
              Товары не найдены
            </div>
          )}
        </div>
        {deleteButton && !notFound && (
          <LoadMoreBtn loadMoreHandler={loadMoreHandler} disabled={disabled} />
        )}
      </section>
    </>
  );
};
