import { useState, useEffect } from "react";
import css from "./AddRefuelingModal.module.css";

export default function AddRefuelingModal({ initialData, onCancel, onSubmit }) {
  const [formData, setFormData] = useState({
    date: "",
    truck: "",
    place: "",
    gasStation: "",
    amount: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        date: initialData.date?.slice(0, 10) || "",
        truck: initialData.truck || "",
        place: initialData.place || "",
        gasStation: initialData.gasStation || "",
        amount: initialData.amount || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <h2 className={css.title}>{initialData ? "Редагувати" : "Додати"} заправку</h2>
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="truck"
            placeholder="Номер машини"
            value={formData.truck}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="place"
            placeholder="Місце"
            value={formData.place}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="gasStation"
            placeholder="АЗС"
            value={formData.gasStation}
            onChange={handleChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Кількість (л)"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <div className={css.actions}>
            <button type="submit">Зберегти</button>
            <button type="button" onClick={onCancel}>Скасувати</button>
          </div>
        </form>
      </div>
    </div>
  );
}
