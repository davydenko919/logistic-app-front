import { FaSearch } from "react-icons/fa"; // додаємо іконку
import css from "./TripsPage.module.css";
import TripCard from "../../components/TripCard/TripCard.jsx";

export default function TripsPage() {
  const trips = [
    {
      id: 1,
      date: "31.03",
      from: "Драбів",
      to: "Черкаси",
      start: 1929318,
      end: 1928997,
      distance: 679,
      weight: 3.88,
      cargo: "Кукурудза",
    },
  ];

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

      <div className={css.list}>
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}