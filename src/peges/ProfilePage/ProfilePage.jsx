import css from "./ProfilePage.module.css";
import { FaPen } from "react-icons/fa";

export default function ProfilePage() {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>Профіль</h1>
        <button className={css.editButton}>
          <FaPen /> Редагувати
        </button>
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Ім’я</label>
        <input className={css.input} type="text" value="Anton Poteliakhin" readOnly />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Пошта</label>
        <input className={css.input} type="email" value="potelyakhin166@gmail.com" readOnly />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Машина</label>
        <input className={css.input} type="text" value="CA4432CI" readOnly />
      </div>
    </div>
  );
}