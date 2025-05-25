import { FaSearch } from "react-icons/fa";
import { useEffect } from "react";
import css from "./TripsPage.module.css";
import TripCard from "../../components/TripCard/TripCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getTrips } from "../../redux/trips/operations";
import { selectLoading } from "../../redux/trips/selectors";
import { selectAllTrips } from "../../redux/trips/selectors.js";

export default function TripsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(getTrips());
  }, [dispatch]);

  const trips = useSelector(selectAllTrips);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>Лист рейсів</h1>
        <button className={css.addTrip}>+ Додати рейс</button>
      </div>

      <div className={css.filters}>
        <input
          type="text"
          placeholder="Пошук за назвою рейса"
          className={css.search}
        />
        <button className={css.filter}>Виїзд - Заїзд</button>
        <button className={css.searchButton}>
          Пошук <FaSearch className={css.searchIcon} />
        </button>
      </div>

      <div>{isLoading && "Request in progress..."}</div>

      <div className={css.list}>
        {trips.map((trip) => (
          <TripCard key={trip._id} trip={trip} />
        ))}
      </div>
    </div>
  );
}
