import css from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "../Navigation/Navigation.jsx";

const HomePage = lazy(() => import("../../peges/HomePage/HomePage.jsx"));
const LoginPage = lazy(() => import("../../peges/LoginPage/LoginPage.jsx"));
const RegistrationPage = lazy(() => import("../../peges/RegistrationPage/RegistrationPage.jsx"));
const TripsPage = lazy(() => import("../../peges/TripsPage/TripsPage.jsx"));
const RefuelingPage = lazy(() => import("../../peges/RefuelingPage/RefuelingPage.jsx"));
const AnalyticsPage = lazy(() => import("../../peges/AnalyticsPage/AnalyticsPage.jsx"));
const ProfilePage = lazy(() => import("../../peges/ProfilePage/ProfilePage.jsx"));
const NotFoundPage = lazy(() => import("../../peges/NotFoundPage/NotFoundPage.jsx"));


export const App = () => {
  return (
    <div className={css.appContainer}>
      <Navigation />

      <div className={css.mainContent}>
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </div>
    </div>
  );
};
