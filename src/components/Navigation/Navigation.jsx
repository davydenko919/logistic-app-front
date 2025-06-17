import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import {
  FaCar,
  FaTruck,
  FaGasPump,
  FaChartPie,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";

const Navigation = () => {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logOut());

  const { name, email } = useSelector(selectUser);

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

        {name === "kirill@gmail.com" && (
          <li>
            <NavLink
              to="/analytics"
              className={({ isActive }) => (isActive ? css.active : "")}
            >
              <FaChartPie className={css.icon} /> Аналітика
            </NavLink>
          </li>
        )}
      </ul>

      <div className={css.footer}>
        <button className={css.logout} onClick={handleLogout}>
          <FaSignOutAlt className={css.icon} /> Вийти
        </button>
        <NavLink to="/profile" className={css.profileLink}>
          <div className={css.avatar}>{name?.charAt(0)}</div>
          <div className={css.profileText}>
            <p className={css.userName}>{name}</p>
            <p className={css.email}>{email}</p>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;



// import { NavLink } from "react-router-dom";
// import css from "./Navigation.module.css";
// import {
//   FaCar,
//   FaTruck,
//   FaGasPump,
//   FaChartPie,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { selectUser } from "../../redux/auth/selectors";
// import { logOut } from "../../redux/auth/operations";

// const Navigation = () => {

//   const dispatch = useDispatch()
//   const handleLogout = () => {dispatch(logOut())}

//   const { name, email } = useSelector(selectUser);
//   return (
//     <nav className={css.sidebar}>
//       <NavLink
//         to="/"
//         className={({ isActive }) =>
//           isActive ? `${css.logo} ${css.active}` : css.logo
//         }
//       >
//         <FaCar className={css.icon} /> Logistics
//       </NavLink>
//       <ul className={css.navLinks}>
//         <li>
//           <NavLink
//             to="/trips"
//             className={({ isActive }) => (isActive ? css.active : "")}
//           >
//             <FaTruck className={css.icon} /> Рейси
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/refueling"
//             className={({ isActive }) => (isActive ? css.active : "")}
//           >
//             <FaGasPump className={css.icon} /> Пальне
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/analytics"
//             className={({ isActive }) => (isActive ? css.active : "")}
//           >
//             <FaChartPie className={css.icon} /> Аналітика
//           </NavLink>
//         </li>
//       </ul>
//       <div className={css.footer}>
//         <button className={css.logout} onClick={handleLogout}>
//           <FaSignOutAlt className={css.icon} /> Вийти
//         </button>
//         <NavLink to="/profile" className={css.profileLink}>
//           <div className={css.avatar}>{name?.charAt(0)}</div>
//           <div className={css.profileText}>
//             <p className={css.userName}>{name}</p>
//             <p className={css.email}>{email}</p>
//           </div>
//         </NavLink>
//       </div>
//     </nav>
//   );
// };

// export default Navigation;
