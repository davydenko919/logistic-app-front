
import { Routes, Route, NavLink  } from "react-router-dom";

import HomePage from "../../peges/HomePage/HomePage.jsx";
import LoginPage from "../../peges/LoginPage/LoginPage.jsx";
import RegistrationPage from "../../peges/RegistrationPage/RegistrationPage.jsx";
import TripsPage from "../../peges/TripsPage/TripsPage.jsx";
import RefuelingPage from "../../peges/RefuelingPage/RefuelingPage.jsx";
import ProfilePage from "../../peges/ProfilePage/ProfilePage.jsx";
import NotFoundPage from "../../peges/NotFoundPage/NotFoundPage.jsx";

export const App = () => {
  return (
    <div>
      <nav>
        <NavLink to="/">
          Logistics
        </NavLink>
        <NavLink to="/trips">
          Рейси
        </NavLink>
        <NavLink to="/refueling">
          Пальне
        </NavLink>
        <NavLink to="/analytics">
          Аналітика
        </NavLink>
        <NavLink to="/profile">
          Профіль
        </NavLink>
      </nav>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/refueling" element={<RefuelingPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
