import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRefuelings,
  deleteRefueling,
  postRefueling,
} from "../../redux/refuelings/operations";
import {
  selectAllRefuelings,
  selectLoading,
} from "../../redux/refuelings/selectors";
import css from "./RefuelingsPage.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function RefuelingsPage() {
  const dispatch = useDispatch();
  const refuelings = useSelector(selectAllRefuelings);
  const isLoading = useSelector(selectLoading);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    truck: "",
    place: "",
    gasStation: "",
    amount: "",
  });

  useEffect(() => {
    dispatch(getRefuelings({ page: 1, perPage: 20 }));
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Ви впевнені, що хочете видалити заправку?")) {
      dispatch(deleteRefueling(id));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postRefueling(formData));
    setIsModalOpen(false);
    setFormData({ date: "", truck: "", place: "", gasStation: "", amount: "" });
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>Лист заправок</h1>
        <div className={css.controls}>
          <input className={css.search} placeholder="Пошук за назвою заправки" />
          <button className={css.filter}>Період заправки</button>
          <button className={css.addButton} onClick={() => setIsModalOpen(true)}>
            + Додати заправку
          </button>
        </div>
      </div>

      {isLoading && <p>Завантаження...</p>}

      <div className={css.list}>
        {refuelings.map((item) => (
          <div key={item._id} className={css.card}>
            <p>{new Date(item.date).toLocaleDateString()}</p>
            <p>Місце: {item.place}</p>
            <p>Кількість, л: {item.amount}</p>
            <div className={css.actions}>
              <button onClick={() => handleDelete(item._id)}>
                <FaTrash /> Видалити
              </button>
              <button>
                <FaEdit /> Редагувати
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className={css.overlay}>
          <div className={css.modal}>
            <h2>Додати заправку</h2>
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
                value={formData.truck}
                placeholder="Номер машини"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="place"
                value={formData.place}
                placeholder="Місце"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="gasStation"
                value={formData.gasStation}
                placeholder="АЗС"
                onChange={handleChange}
              />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                placeholder="Кількість (л)"
                onChange={handleChange}
                required
              />
              <div className={css.modalActions}>
                <button type="submit">Зберегти</button>
                <button type="button" onClick={() => setIsModalOpen(false)}>
                  Скасувати
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}