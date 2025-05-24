import { NavLink } from 'react-router-dom';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Ласкаво просимо до LogisticApp</h1>
      <div className={css.grid}>
        <NavLink to="/trips" className={css.card}>
          <h3>Рейси</h3>
          <p>Переглядайте та керуйте маршрутами перевезень, оновлюйте пробіг та товари.</p>
        </NavLink>

        <NavLink to="/refueling" className={css.card}>
          <h3>Пальне</h3>
          <p>Фіксуйте заправки, розраховуйте витрати пального та ведіть облік по авто.</p>
        </NavLink>

        <NavLink to="/analytics" className={css.card}>
          <h3>Аналітика</h3>
          <p>Отримуйте зведену інформацію про витрати, маршрути та ефективність логістики.</p>
        </NavLink>
      </div>

      <div className={css.rulesBlock}>
        <h2 className={css.rulesTitle}>Правила для водіїв</h2>
        <ul className={css.rulesList}>
          <li>Дотримуйтесь маршрутів, узгоджених з логістом.</li>
          <li>Заправку здійснюйте лише на дозволених АЗС.</li>
          <li>Фіксуйте кожну поїздку та заправку в додатку.</li>
          <li>Своєчасно проходьте технічне обслуговування авто.</li>
          <li>Не передавайте доступ до облікового запису іншим особам.</li>
        </ul>
      </div>
    </div>
  );
}
