import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import css from "./AnalyticsPage.module.css";
import TripCard from "../../components/TripCard/TripCard";
import Pagination from "../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminTrips,
  deleteAdminTrip,
  putAdminTrip,
} from "../../redux/admintrips/operations";
import DeleteModal from "../../components/Modal/DeleteModal/DeleteModal.jsx";
import AddTripModal from "../../components/Modal/AddTripModal/AddTripModal.jsx";
import {
  selectAdminTrips,
  selectAdminLoading,
} from "../../redux/admintrips/selectors";
import { getUsers } from "../../redux/users/operations";
import { selectUsers } from "../../redux/users/selectors";

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

export default function AnalyticsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAdminLoading);
  const trips = useSelector(selectAdminTrips);
  const users = useSelector(selectUsers);

  const today = new Date();
  const thirtyOneDaysAgo = new Date();
  thirtyOneDaysAgo.setDate(today.getDate() - 31);

  const [startDate, setStartDate] = useState(formatDate(thirtyOneDaysAgo));
  const [endDate, setEndDate] = useState(formatDate(today));
  const [truckTrip, setTruckTrip] = useState("");
  const [driverId, setDriverId] = useState("");

  const [totalDistance, setTotalDistance] = useState(0);
  const [odometerDelta, setOdometerDelta] = useState(0);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);
  const [editingTrip, setEditingTrip] = useState(null);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTrips = () => {
    dispatch(
      getAdminTrips({
        startDate,
        endDate,
        truckTrip: truckTrip || undefined,
        driverId: driverId || undefined,
        page,
        perPage,
        sortBy: "date",
        sortOrder: "desc",
      })
    ).then((res) => {
      const payload = res.payload;
      const items = payload.trips || payload || [];

      if (Array.isArray(items) && items.length > 0) {
        const total = items.reduce((sum, t) => sum + (t.lengthTrip || 0), 0);
        setTotalDistance(total);

        const first = items[0];
        const last = items[items.length - 1];
        const diff = (last.endTrip || 0) - (first.startTrip || 0);
        setOdometerDelta(diff);

        if (payload.totalItems && perPage) {
          setTotalPages(Math.ceil(payload.totalItems / perPage));
        }
      } else {
        setTotalDistance(0);
        setOdometerDelta(0);
        setTotalPages(1);
      }
    });
  };

  useEffect(() => {
    fetchTrips();
  }, [page, perPage]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleFilter = () => {
    setPage(1);
    fetchTrips();
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Аналітика рейсів</h1>

      <div className={css.filtersRow}>
        <div className={css.filtersLeft}>
          <div className={css.filterGroup}>
            <FaSearch className={css.icon} />
            <input
              type="text"
              placeholder="Маршрут"
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

          <div className={css.filterGroup}>
            <select
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              className={`${css.input} ${css.textInput}`}
            >
              <option value="">Усі водії</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <button className={css.searchButton} onClick={handleFilter}>
            Пошук <FaSearch className={css.searchIcon} />
          </button>
        </div>

        <div className={css.filtersRight}>
          <div className={css.filterGroup}>
            <div className={css.metricTitle}>Загальний пробіг</div>
            <div className={css.metricValue}>
              {totalDistance.toLocaleString()} км
            </div>
          </div>
          <div className={css.filterGroup}>
            <div className={css.metricTitle}>Різниця спідометра</div>
            <div className={css.metricValue}>
              {odometerDelta.toLocaleString()} км
            </div>
          </div>
        </div>
      </div>

      <div className={css.list}>
        {isLoading && <p>Завантаження...</p>}
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
              setShowAddModal(true);
            }}
          />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        perPage={perPage}
        onPageChange={setPage}
        onPerPageChange={(val) => {
          setPerPage(val);
          setPage(1);
        }}
      />

      {/* МОДАЛКИ */}
      {showDeleteModal && (
        <DeleteModal
          trip={tripToDelete}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            dispatch(deleteAdminTrip(tripToDelete._id)).then(fetchTrips);
            setShowDeleteModal(false);
          }}
        />
      )}

      {showAddModal && (
        <AddTripModal
          initialData={editingTrip}
          onCancel={() => {
            setShowAddModal(false);
            setEditingTrip(null);
          }}
          onSubmit={(formData) => {
            dispatch(
              putAdminTrip({ id: editingTrip._id, updatedData: formData })
            ).then(fetchTrips);
            setShowAddModal(false);
            setEditingTrip(null);
          }}
        />
      )}
    </div>
  );
}
