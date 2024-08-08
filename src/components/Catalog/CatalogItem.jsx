import { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { Banner } from "../Banner/Banner";
import { Footer } from "../Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { addCartList } from "../../redux/slices/cartSlice";

export const CatalogItem = () => {
  const [selected, setSelected] = useState({ item: "", size: -1 });
  const [disabled, setDisabled] = useState(true);
  const [available, setAvailable] = useState(true);
  let [counter, setCounter] = useState(1);
  const location = useLocation();
  const { catalogItem } = location.state || {};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hasAvailable = catalogItem.sizes.some((item) => item.available);

    if (!hasAvailable) {
      setAvailable(false);
    }
  }, []);

  const selectClickHandler = (size, index) => {
    setSelected({ size, index });
    setDisabled(false);
  };

  const subtractHandler = () => {
    if (counter !== 1) setCounter(counter - 1);
  };

  const additionHandler = () => {
    if (counter !== 10) setCounter(counter + 1);
  };

  const orderClickHandler = () => {
    const order = {
      id: catalogItem.id,
      title: catalogItem.title,
      size: selected.size,
      price: catalogItem.price,
      totalPrice: catalogItem.price * counter,
      counter: counter,
    };

    dispatch(addCartList(order));
    navigate("/cart");
  };

  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <section className="catalog-item">
              <h2 className="text-center">{catalogItem.title}</h2>
              <div className="row">
                <div className="col-5">
                  <img
                    src={catalogItem.images[0]}
                    className="img-fluid"
                    alt={catalogItem.title}
                  />
                </div>
                <div className="col-7">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td>Артикул</td>
                        <td>{catalogItem.sku}</td>
                      </tr>
                      <tr>
                        <td>Производитель</td>
                        <td>{catalogItem.manufacturer}</td>
                      </tr>
                      <tr>
                        <td>Цвет</td>
                        <td>{catalogItem.color}</td>
                      </tr>
                      <tr>
                        <td>Материалы</td>
                        <td>{catalogItem.material}</td>
                      </tr>
                      <tr>
                        <td>Сезон</td>
                        <td>{catalogItem.season}</td>
                      </tr>
                      <tr>
                        <td>Повод</td>
                        <td>{catalogItem.reason}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-center">
                    <p>
                      Размеры в наличии:{" "}
                      {catalogItem.sizes.map((item, index) =>
                        item.available ? (
                          <span
                            key={index}
                            className={
                              selected.index === index
                                ? "catalog-item-size selected"
                                : "catalog-item-size"
                            }
                            onClick={() => selectClickHandler(item.size, index)}
                          >
                            {item.size}
                          </span>
                        ) : null,
                      )}{" "}
                    </p>
                    {available && (
                      <p>
                        Количество:{" "}
                        <span className="btn-group btn-group-sm pl-2">
                          <button
                            className="btn btn-secondary"
                            onClick={subtractHandler}
                          >
                            -
                          </button>
                          <span className="btn btn-outline-primary">
                            {counter}
                          </span>
                          <button
                            className="btn btn-secondary"
                            onClick={additionHandler}
                          >
                            +
                          </button>
                        </span>
                      </p>
                    )}
                  </div>
                  {available && (
                    <button
                      className="btn btn-danger btn-block btn-lg"
                      disabled={disabled}
                      onClick={orderClickHandler}
                    >
                      В корзину
                    </button>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
