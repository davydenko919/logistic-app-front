import css from "./TripCard.module.css";
import { FaTrash, FaPen } from "react-icons/fa";

export default function TripCard({ trip }) {
  return (
    <div className={css.card}>
      <div className={css.content}>
        <div className={css.cell}>
          <p className={css.label}>Дата</p>
          <p>{trip.date}</p>
        </div>
        <div className={css.cell}>
          <p className={css.label}>Маршрут</p>
          <p>{trip.from} – {trip.to}</p>
        </div>
        <div className={css.cell}>
          <p className={css.label}>Спідометр</p>
          <p>{trip.start} – {trip.end}</p>
        </div>
        <div className={css.cell}>
          <p className={css.label}>Пробіг</p>
          <p>{trip.distance}</p>
        </div>
        <div className={css.cell}>
          <p className={css.label}>Вага, т</p>
          <p>{trip.weight}</p>
        </div>
        <div className={css.cell}>
          <p className={css.label}>Вид товару</p>
          <p>{trip.cargo}</p>
        </div>
      </div>
      <div className={css.actions}>
        <button className={css.delete}><FaTrash /> Видалити</button>
        <button className={css.edit}><FaPen /> Редагувати</button>
      </div>
    </div>
  );
}