import { useEffect, useState } from "react";
import css from "./ProfilePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../redux/users/operations";
import { selectAuthUser } from "../../redux/auth/selectors";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const authUser = useSelector(selectAuthUser);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    car: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getUser(id)).then((res) => {
        if (res.payload) {
          const { name, email, car } = res.payload.data;
          setFormData({ name, email, car });
        }
      });
    }
  }, [dispatch, id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id, updatedData: formData }));
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Профіль користувача</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <label>
          Ім'я:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Авто:
          <input
            type="text"
            name="car"
            value={formData.car}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className={css.submit}>Оновити</button>
      </form>
    </div>
  );
}