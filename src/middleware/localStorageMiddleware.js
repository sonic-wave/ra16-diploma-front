const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const state = store.getState();
  localStorage.setItem("cartList", JSON.stringify(state.cartList.cartList));

  return result;
};

export default localStorageMiddleware;
