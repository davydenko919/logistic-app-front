import { useEffect, useState } from "react";
import css from "./ProfilePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../redux/users/operations";
import { selectUser } from "../../redux/auth/selectors";
import { FiEdit2 } from "react-icons/fi";
import EditProfileModal from "../../components/Modal/EditProfileModal/EditProfileModal.jsx"; // шлях підлаштуй під себе

export default function ProfilePage() {
  const dispatch = useDispatch();
  const authUser = useSelector(selectUser);
  const userId = authUser?._id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    car: "",
  });

  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId)).then((res) => {
        if (res.payload) {
          const { name, email, car } = res.payload.data;
          setFormData({ name, email, car });
        }
      });
    }
  }, [dispatch, userId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: userId, updatedData: formData }))
      .unwrap()
      .then(() => {
        setIsEditOpen(false);
      });
  };

  return (
    <div className={css.page}>
      <div className={css.card}>
        <div className={css.header}>
          <h1 className={css.title}>Профіль</h1>
          <FiEdit2 size={20} className={css.editIcon} onClick={() => setIsEditOpen(true)} />
        </div>

        <div className={css.field}>
          <label className={css.label}>Ім’я</label>
          <input className={css.input} type="text" value={formData.name} readOnly  />
        </div>

        <div className={css.field}>
          <label className={css.label}>Пошта</label>
          <input className={css.input} type="text" value={formData.email} readOnly  />
        </div>

        <div className={css.field}>
          <label className={css.label}>Машина</label>
          <input className={css.input} type="text" value={formData.car} readOnly  />
        </div>
      </div>

      <EditProfileModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
