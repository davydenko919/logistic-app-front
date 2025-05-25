import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import css from "./RegistrationPage.module.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";

export default function RegistrationPage() {
  const dispatch = useDispatch();
  

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <div className={css.container}>
      <div className={css.card}>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <h2 className={css.title}>
              Створіть акаунт у <span className={css.logo}>Logistics</span>
            </h2>
            <p className={css.subtext}>Будь ласка, заповніть всі поля для реєстрації</p>

            <button type="button" className={css.googleBtn}>
              <img src="/google-icon.svg" alt="G" /> Зареєструватись через Gmail
            </button>

            <div className={css.divider}>або</div>

            <Field
              type="text"
              name="name"
              placeholder="Ім'я"
              className={css.input}
              autoComplete="name"
            />
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className={css.input}
              autoComplete="email"
            />
            <Field
              type="password"
              name="password"
              placeholder="Пароль"
              className={css.input}
              autoComplete="new-password"
            />

            <button type="submit" className={css.submit}>
              Зареєструватись
            </button>

            <p className={css.footer}>
              Вже маєш акаунт? <Link to="/login">Увійти</Link>
            </p>
          </Form>
        </Formik>

        <div className={css.imagePlaceholder}></div>
      </div>
    </div>
  );
}
