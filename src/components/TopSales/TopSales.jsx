import { useState, useEffect } from "react";
import createRequest from "../../functions/createRequest";
import { formatNumber } from "../../functions/formatNumber";
import { Loader } from "../Loader/Loader";
import { useAppDispatch } from "../../hooks";
import { fetchCatalogItem } from "../../redux/slices/catalogSlice";
import { useNavigate } from "react-router-dom";

export const TopSales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const result = createRequest("top-sales");
    result.then((r) => {
      setSales(r);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  const orderClickHandler = async (id) => {
    const resultAction = await dispatch(fetchCatalogItem(id));
    if (fetchCatalogItem.fulfilled.match(resultAction)) {
      navigate(`/catalog/${id}`, {
        state: { catalogItem: resultAction.payload },
      });
    }
  };

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <div className="row">
        {sales &&
          sales.map((sale) => (
            <div className="col-4" key={sale.id}>
              <div className="card">
                <img
                  src={sale.images[0]}
                  className="card-img-top img-fluid"
                  alt={sale.title}
                />
                <div className="card-body">
                  <p className="card-text">{sale.title}</p>
                  <p className="card-text">{formatNumber(sale.price)} руб.</p>
                  <a
                    className="btn btn-outline-primary"
                    onClick={() => orderClickHandler(sale.id)}
                  >
                    Заказать
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
