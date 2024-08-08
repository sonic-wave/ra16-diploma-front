import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addSearchTerm, clearSearchList } from "../../redux/slices/searchSlice";
import { fetchCatalog } from "../../redux/slices/catalogSlice";

export const CatalogSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const dispatch = useAppDispatch();
  const searchList = useAppSelector((state) => state.searchList.searchList);
  const activeCategory = useAppSelector(
    (state) => state.searchList.activeCategory,
  );

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

    // const newTimeout = setTimeout(() => {
    //     if (value) {
    //             dispatch(addSearchTerm(value));
    //     } else {
    //         dispatch(clearSearchList());
    //     }
    // }, 500);

    const newTimeout = setTimeout(() => {
      if (value) {
        if (activeCategory) {
          dispatch(
            fetchCatalog(`items?categoryId=${activeCategory}&q=${value}`),
          );
        } else {
          dispatch(fetchCatalog(`items?q=${value}`));
          dispatch(addSearchTerm(value));
        }
        // ??????????dispatch(clearSearchList());
      } else {
        dispatch(clearSearchList());
        dispatch(fetchCatalog(`items`));
      }
    }, 500);

    setDebounceTimeout(newTimeout);
  };

  return (
    <form className="catalog-search-form form-inline">
      <input
        className="form-control"
        placeholder="Поиск"
        value={searchTerm}
        onChange={handleAddSearch}
      />
    </form>
  );
};
