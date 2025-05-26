import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import css from "./TripsPage.module.css";
import TripCard from "../../components/TripCard/TripCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getTrips,
  postTrip,
  deleteTrip,
  putTrip,
} from "../../redux/trips/operations";
import { selectLoading, selectAllTrips } from "../../redux/trips/selectors";
import DeleteModal from "../../components/Modal/DeleteModal/DeleteModal.jsx";
import AddTripModal from "../../components/Modal/AddTripModal/AddTripModal.jsx";

function formatDate(date) {
  return date.toISOString().split("T")[0]; // yyyy-mm-dd
}

export default function TripsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const trips = useSelector(selectAllTrips);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);

  const today = new Date();
  const thirtyOneDaysAgo = new Date();
  thirtyOneDaysAgo.setDate(today.getDate() - 31);

  // Filters
  const [startDate, setStartDate] = useState(formatDate(thirtyOneDaysAgo));
  const [endDate, setEndDate] = useState(formatDate(today));
  const [sortOrder, setSortOrder] = useState("asc");
  const [truckTrip, setTruckTrip] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTrips();
  }, [page, perPage, sortOrder, startDate, endDate, truckTrip]);

  const fetchTrips = () => {
    dispatch(
      getTrips({
        page,
        perPage,
        sortBy: "date",
        sortOrder,
        startDate,
        endDate,
        truckTrip: truckTrip || undefined,
      })
    ).then((res) => {
      const payload = res.payload;
      if (payload?.totalItems) {
        const total = Math.ceil(payload.totalItems / perPage);
        setTotalPages(total);
      }
    });
  };

  const handleFilter = () => {
    setPage(1); // Reset to page 1
    fetchTrips();
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <h1 className={css.title}>Лист рейсів</h1>
          <button className={css.addTrip} onClick={() => setShowAddModal(true)}>
            + Додати рейс
          </button>
        </div>

        <div className={css.filters}>
          <div className={css.filterGroup}>
            <FaSearch className={css.icon} />
            <input
              type="text"
              placeholder="Пошук за назвою рейса"
              value={truckTrip}
              onChange={(e) => setTruckTrip(e.target.value)}
              className={`${css.input} ${css.textInput}`}
            />
          </div>

          <div className={css.filterGroup}>
            <FaCalendarAlt className={css.icon} />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={`${css.input} ${css.dateInput}`}
            />
            <span>–</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={`${css.input} ${css.dateInput}`}
            />
          </div>

          <div className={css.sortWrapper}>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className={css.sortSelect}
            >
              <option value="asc">↑ Зростання</option>
              <option value="desc">↓ Спадання</option>
            </select>
          </div>

          <button className={css.searchButton} onClick={handleFilter}>
            Пошук <FaSearch className={css.searchIcon} />
          </button>
        </div>

        <div>{isLoading && "Request in progress..."}</div>

        <div className={css.list}>
          {trips.map((trip) => (
            <TripCard
              key={trip._id}
              trip={trip}
              onDeleteClick={() => {
                setTripToDelete(trip);
                setShowDeleteModal(true);
              }}
              onEditClick={() => {
                setEditingTrip(trip);
              }}
            />
          ))}
        </div>

        <div className={css.pagination}>
          <button
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
            className={css.pageButton}
          >
            ← Назад
          </button>
          <span>
            Сторінка {page} з {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className={css.pageButton}
          >
            Вперед →
          </button>

          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className={css.perPageSelect}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Модальні */}
      {showDeleteModal && (
        <DeleteModal
          trip={tripToDelete}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            dispatch(deleteTrip(tripToDelete._id));
            setShowDeleteModal(false);
          }}
        />
      )}

      {showAddModal && (
        <AddTripModal
          onCancel={() => setShowAddModal(false)}
          onSubmit={(formData) => {
            dispatch(postTrip(formData));
            setShowAddModal(false);
          }}
        />
      )}

      {editingTrip && (
        <AddTripModal
          initialData={editingTrip}
          onCancel={() => setEditingTrip(null)}
          onSubmit={(formData) => {
            dispatch(putTrip({ ...formData, _id: editingTrip._id }));
            setEditingTrip(null);
          }}
        />
      )}
    </>
  );
}