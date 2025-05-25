import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import css from "./LoginPage.module.css";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";

export default function LoginPage() {
  const dispatch = useDispatch();
  

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values));
    actions.resetForm();
  };
  return (
    <div className={css.container}>
      <div className={css.card}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <h2 className={css.title}>
              З поверненням до <span className={css.logo}>Logistics</span>
            </h2>
            <p className={css.subtext}>Будь ласка, введіть свої дані</p>

            <button type="button" className={css.googleBtn}>
              <img src="/google-icon.svg" alt="G" /> Увійти за допомогою Gmail
            </button>

            <div className={css.divider}>або</div>

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
              autoComplete="current-password"
            />

            <p className={css.forgot}>Забули пароль?</p>

            <button type="submit" className={css.submit}>
              Увійти
            </button>

            <p className={css.footer}>
              Не маєш акаунту? <Link to="/registration">Зареєструватись</Link>
            </p>
          </Form>
        </Formik>

        <div className={css.imagePlaceholder}></div>
      </div>
    </div>
  );
}