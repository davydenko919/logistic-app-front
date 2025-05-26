import { useEffect, useState } from "react";
import css from "./ProfilePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/users/operations";
import { selectUser } from "../../redux/auth/selectors";
import { FiEdit2 } from "react-icons/fi";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const authUser = useSelector(selectUser);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    car: "",
  });

  useEffect(() => {
    if (authUser?._id) {
      dispatch(getUser(authUser._id)).then((res) => {
        if (res.payload) {
          const { name, email, car } = res.payload.data;
          setFormData({ name, email, car });
        }
      });
    }
  }, [dispatch, authUser]);

  return (
    <div className={css.page}>
      <div className={css.card}>
        <div className={css.header}>
          <h1 className={css.title}>Профіль</h1>
          <FiEdit2 size={20} className={css.editIcon} />
        </div>

        <div className={css.field}>
          <label className={css.label}>Ім’я</label>
          <input className={css.input} type="text" value={formData.name} disabled />
        </div>

        <div className={css.field}>
          <label className={css.label}>Пошта</label>
          <input className={css.input} type="text" value={formData.email} disabled />
        </div>

        <div className={css.field}>
          <label className={css.label}>Машина</label>
          <input className={css.input} type="text" value={formData.car} disabled />
        </div>
      </div>
    </div>
  );
}
