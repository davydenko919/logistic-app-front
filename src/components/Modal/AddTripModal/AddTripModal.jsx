import { useEffect, useState } from "react";
import css from "./AddTripModal.module.css";

export default function AddTripModal({ onCancel, onSubmit, initialData = null }) {
  const [formData, setFormData] = useState(
    initialData || {
      date: "",
      truckTrip: "",
      startTrip: "",
      endTrip: "",
      lengthTrip: "",
      weigth: "",
      product: "",
    }
  );

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onCancel]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    onSubmit({ ...formData, _id: initialData?._id });
    onCancel();
  };

  return (
    <div className={css.overlay} onClick={onCancel}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={css.title}>{initialData ? "Редагувати рейс" : "Новий рейс"}</h2>
        <div className={css.grid}>
          <label>
            Дата
            <input name="date" type="date" value={formData.date} onChange={handleChange} />
          </label>
          <label>
            Маршрут
            <input name="truckTrip" type="text" value={formData.truckTrip} onChange={handleChange} placeholder="Звідки - Куди" />
          </label>
          <label>
            Початок рейсу
            <input name="startTrip" type="text" value={formData.startTrip} onChange={handleChange} />
          </label>
          <label>
            Кінець рейсу
            <input name="endTrip" type="text" value={formData.endTrip} onChange={handleChange} />
          </label>
          <label>
            Пробіг
            <input name="lengthTrip" type="text" value={formData.lengthTrip} onChange={handleChange} />
          </label>
          <label>
            Вага, т
            <input name="weigth" type="number" value={formData.weigth} onChange={handleChange} />
          </label>
          <label>
            Вид товару
            <input name="product" type="text" value={formData.product} onChange={handleChange} />
          </label>
        </div>
        <button onClick={handleSubmit} className={css.submit}>Підтвердити</button>
      </div>
    </div>
  );
}
