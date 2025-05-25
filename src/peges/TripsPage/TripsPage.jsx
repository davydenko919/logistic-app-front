import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import css from "./TripsPage.module.css";
import TripCard from "../../components/TripCard/TripCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getTrips, postTrip, deleteTrip, putTrip } from "../../redux/trips/operations";
import { selectLoading, selectAllTrips } from "../../redux/trips/selectors";
import DeleteModal from "../../components/Modal/DeleteModal/DeleteModal.jsx";
import AddTripModal from "../../components/Modal/AddTripModal/AddTripModal.jsx";

export default function TripsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const trips = useSelector(selectAllTrips);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);

  useEffect(() => {
    dispatch(getTrips());
  }, [dispatch]);

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
          <input type="text" placeholder="Пошук за назвою рейса" className={css.search} />
          <button className={css.filter}>Виїзд - Заїзд</button>
          <button className={css.searchButton}>
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
      </div>

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