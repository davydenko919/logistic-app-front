import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import {
  FaCar,
  FaTruck,
  FaGasPump,
  FaChartPie,
  FaSignOutAlt,
} from "react-icons/fa";

const Navigation = () => {
  return (
    <nav className={css.sidebar}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${css.logo} ${css.active}` : css.logo
        }
      >
        <FaCar className={css.icon} /> Logistics
      </NavLink>
      <ul className={css.navLinks}>
        <li>
          <NavLink
            to="/trips"
            className={({ isActive }) => (isActive ? css.active : "")}
          >
            <FaTruck className={css.icon} /> Рейси
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/refueling"
            className={({ isActive }) => (isActive ? css.active : "")}
          >
            <FaGasPump className={css.icon} /> Пальне
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/analytics"
            className={({ isActive }) => (isActive ? css.active : "")}
          >
            <FaChartPie className={css.icon} /> Аналітика
          </NavLink>
        </li>
      </ul>
      <div className={css.footer}>
        <button className={css.logout}>
          <FaSignOutAlt className={css.icon} /> Вийти
        </button>
        <NavLink to="/profile" className={css.profileLink}>
          <div className={css.avatar} />
          <div className={css.profileText}>
            <p className={css.userName}>Anton Poteliakhin</p>
            <p className={css.email}>potelyakhin816@gmail.com</p>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;

// import { NavLink } from "react-router-dom";
// import css from "./Navigation.module.css";

// const Navigation = () => {
//   return (
//     <nav>
//         <NavLink to="/">
//           Logistics
//         </NavLink>
//         <NavLink to="/trips">
//           Рейси
//         </NavLink>
//         <NavLink to="/refueling">
//           Пальне
//         </NavLink>
//         <NavLink to="/analytics">
//           Аналітика
//         </NavLink>
//         <NavLink to="/profile">
//           Профіль
//         </NavLink>
//       </nav>
//   );
// };

// export default Navigation;
