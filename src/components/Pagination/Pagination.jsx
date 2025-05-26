import css from "./Pagination.module.css";

export default function Pagination({
  page,
  totalPages,
  perPage,
  onPageChange,
  onPerPageChange,
}) {
  return (
    <div className={css.pagination}>
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className={css.pageButton}
      >
        ← Назад
      </button>

      <span>
        Сторінка {page} з {totalPages}
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className={css.pageButton}
      >
        Вперед →
      </button>

      <select
        value={perPage}
        onChange={(e) => onPerPageChange(Number(e.target.value))}
        className={css.perPageSelect}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
}