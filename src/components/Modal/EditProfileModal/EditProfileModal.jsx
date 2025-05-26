import css from "./EditProfileModal.module.css";

export default function EditProfileModal({
  open,
  onClose,
  formData,
  onChange,
  onSubmit,
}) {
  if (!open) return null;

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <button className={css.close} onClick={onClose}>
          &times;
        </button>
        <h2 className={css.title}>Редагування профілю</h2>

        <form className={css.form} onSubmit={onSubmit}>
          <div className={css.row}>
            <label className={css.label}>
              Ім’я
              <input
                className={css.input}
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
              />
            </label>

            <label className={css.label}>
              Пошта
              <input
                className={css.input}
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
              />
            </label>
          </div>

          <label className={css.label}>
            Машина
            <input
              className={css.input}
              type="text"
              name="car"
              value={formData.car}
              onChange={onChange}
            />
          </label>

          <div className={css.actions}>
            <button type="button" className={css.cancel} onClick={onClose}>
              Відмінити
            </button>
            <button type="submit" className={css.save}>
              Зберегти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
