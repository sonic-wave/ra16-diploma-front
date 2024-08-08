import { useState, useEffect } from "react";
import createRequest from "../../functions/createRequest";
import { Loader } from "../Loader/Loader";

export const Categories = ({ categoryClickHandler, activeCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const result = await createRequest("categories");
      setCategories(result);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const handleClick = (options, id) => {
    categoryClickHandler(options, id);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
        <a
          className={`nav-link ${activeCategory === null ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            handleClick("items", null);
          }}
        >
          Все
        </a>
      </li>
      {categories &&
        categories.map((category) => (
          <li className="nav-item" key={category.id}>
            <a
              className={`nav-link ${activeCategory === category.id ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(`items?categoryId=${category.id}`, category.id);
              }}
            >
              {category.title}
            </a>
          </li>
        ))}
    </ul>
  );
};
