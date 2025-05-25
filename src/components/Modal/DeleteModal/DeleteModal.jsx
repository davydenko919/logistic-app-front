import { useEffect } from "react";
import css from "./DeleteModal.module.css";

export default function DeleteModal({ onConfirm, onCancel, trip }) {
  // Закриття по Esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onCancel]);

  return (
    <div className={css.overlay} onClick={onCancel}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <p>Ви впевнені, що хочете видалити рейс?</p>

        {/* Додаткова інформація */}
        <div className={css.tripInfo}>
          <p><strong>Дата:</strong> {trip.date.slice(0, 10)}</p>
          <p><strong>Маршрут:</strong> {trip.truckTrip}</p>
        </div>

        <div className={css.buttons}>
          <button onClick={onCancel} className={css.cancel}>Відмінити</button>
          <button onClick={onConfirm} className={css.delete}>Видалити</button>
        </div>
      </div>
    </div>
  );
}