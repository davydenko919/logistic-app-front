import css from "./TripCard.module.css";
import { FaTrash, FaPen } from "react-icons/fa";

export default function TripCard({ trip, onDeleteClick }) {
  return (
    <div className={css.card}>
      <div className={css.content}>
        <div className={css.cell}>
          <p className={css.label}>Дата</p>
          <p>{trip.date.slice(0, 10)}</p>
        </div>
        <div className={css.cell}>
          <p className={css.label}>Маршрут</p>
          <p>{trip.truckTrip}</p>
        </div>
        <div className={css.cell}>
          <p className={css.label}>Спідометр</p>
          <p>
            {trip.startTrip} – {trip.endTrip}
          </p>
        </div>
        <div className={css.cell}>
          <p className={css.label}>Пробіг</p>
          <p>{trip.lengthTrip}</p>
        </div>
        <div className={css.cell}>
          <p className={css.label}>Вага, т</p>
          <p>{trip.weigth}</p>
        </div>
        <div className={css.cell}>
          <p className={css.label}>Вид товару</p>
          <p>{trip.product}</p>
        </div>
      </div>
      <div className={css.actions}>
        <button className={css.delete} onClick={onDeleteClick}>
          <FaTrash /> Видалити
        </button>
        <button className={css.edit}>
          <FaPen /> Редагувати
        </button>
      </div>
    </div>
  );
}
