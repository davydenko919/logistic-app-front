import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./App.module.css";

import Navigation from "../Navigation/Navigation";

const HomePage = lazy(() => import("../../peges/HomePage/HomePage"));
const LoginPage = lazy(() => import("../../peges/LoginPage/LoginPage"));
const RegistrationPage = lazy(() => import("../../peges/RegistrationPage/RegistrationPage"));
const TripsPage = lazy(() => import("../../peges/TripsPage/TripsPage"));
const RefuelingPage = lazy(() => import("../../peges/RefuelingPage/RefuelingPage"));
const AnalyticsPage = lazy(() => import("../../peges/AnalyticsPage/AnalyticsPage"));
const ProfilePage = lazy(() => import("../../peges/ProfilePage/ProfilePage"));
const NotFoundPage = lazy(() => import("../../peges/NotFoundPage/NotFoundPage"));

export default function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.appContainer}>
      {isLoggedIn && <Navigation />}

      <main className={css.mainContent}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {!isLoggedIn ? (
              <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/trips" element={<TripsPage />} />
                <Route path="/refueling" element={<RefuelingPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </>
            )}
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}