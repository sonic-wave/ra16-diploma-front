export const LoadMoreBtn = ({ loadMoreHandler, disabled }) => {
  return (
    <div className="text-center">
      <button
        className="btn btn-outline-primary"
        onClick={loadMoreHandler}
        disabled={disabled}
      >
        Загрузить ещё
      </button>
    </div>
  );
};
