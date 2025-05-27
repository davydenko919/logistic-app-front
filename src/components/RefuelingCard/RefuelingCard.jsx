import css from "./RefuelingCard.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function RefuelingCard({ refueling, onDeleteClick, onEditClick }) {
  return (
    <div className={css.card}>
      <div className={css.main}>
        <div className={css.row}><strong>Дата:</strong> {new Date(refueling.date).toLocaleDateString()}</div>
        <div className={css.row}><strong>Машина:</strong> {refueling.truck}</div>
        <div className={css.row}><strong>Місце:</strong> {refueling.place}</div>
        {refueling.gasStation && <div className={css.row}><strong>АЗС:</strong> {refueling.gasStation}</div>}
        <div className={css.row}><strong>Кількість:</strong> {refueling.amount} л</div>
      </div>

      <div className={css.actions}>
        <button className={css.edit} onClick={onEditClick}><FaEdit /> Редагувати</button>
        <button className={css.delete} onClick={onDeleteClick}><FaTrash /> Видалити</button>
      </div>
    </div>
  );
}
