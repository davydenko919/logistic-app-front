import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import css from "./RefuelingsPage.module.css";
import RefuelingCard from "../../components/RefuelingCard/RefuelingCard";
import Pagination from "../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getRefuelings,
  deleteRefueling,
  postRefueling,
  putRefueling,
} from "../../redux/refuelings/operations";
import DeleteModal from "../../components/Modal/DeleteModal/DeleteModal.jsx";
import AddRefuelingModal from "../../components/Modal/AddRefuelingModal/AddRefuelingModal.jsx";
import { selectAllRefuelings, selectLoading } from "../../redux/refuelings/selectors";
import { getUsers } from "../../redux/users/operations";
import { selectUsers } from "../../redux/users/selectors";

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

export default function RefuelingsPage() {
  const dispatch = useDispatch();
  const refuelings = useSelector(selectAllRefuelings);
  const isLoading = useSelector(selectLoading);
  const users = useSelector(selectUsers);

  const today = new Date();
  const aMonthAgo = new Date();
  aMonthAgo.setDate(today.getDate() - 30);

  const [startDate, setStartDate] = useState(formatDate(aMonthAgo));
  const [endDate, setEndDate] = useState(formatDate(today));
  const [truck, setTruck] = useState("");
  const [driverId, setDriverId] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [refuelingToDelete, setRefuelingToDelete] = useState(null);
  const [editingRefueling, setEditingRefueling] = useState(null);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRefuelings = () => {
    dispatch(
      getRefuelings({
        startDate,
        endDate,
        truck: truck || undefined,
        driverId: driverId || undefined,
        page,
        perPage,
        sortBy: "date",
        sortOrder: "desc",
      })
    ).then((res) => {
      const payload = res.payload;
      // const items = payload.refuelings || payload || [];

      if (payload.totalItems && perPage) {
        setTotalPages(Math.ceil(payload.totalItems / perPage));
      } else {
        setTotalPages(1);
      }
    });
  };

  useEffect(() => {
    fetchRefuelings();
  }, [page, perPage]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleFilter = () => {
    setPage(1);
    fetchRefuelings();
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Список заправок</h1>

      <div className={css.filtersRow}>
        <div className={css.filtersLeft}>
          <div className={css.filterGroup}>
            <FaSearch className={css.icon} />
            <input
              type="text"
              placeholder="Машина"
              value={truck}
              onChange={(e) => setTruck(e.target.value)}
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
          <button
            className={css.addButton}
            onClick={() => setShowAddModal(true)}
          >
            + Додати заправку
          </button>
        </div>
      </div>

      <div className={css.list}>
        {isLoading && <p>Завантаження...</p>}
        {refuelings.map((refuel) => (
          <RefuelingCard
            key={refuel._id}
            refueling={refuel}
            onDeleteClick={() => {
              setRefuelingToDelete(refuel);
              setShowDeleteModal(true);
            }}
            onEditClick={() => {
              setEditingRefueling(refuel);
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

      {showDeleteModal && (
        <DeleteModal
          trip={refuelingToDelete}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            dispatch(deleteRefueling(refuelingToDelete._id)).then(fetchRefuelings);
            setShowDeleteModal(false);
          }}
        />
      )}

      {showAddModal && (
        <AddRefuelingModal
          initialData={editingRefueling}
          onCancel={() => {
            setShowAddModal(false);
            setEditingRefueling(null);
          }}
          onSubmit={(formData) => {
            if (editingRefueling) {
              dispatch(
                putRefueling({ id: editingRefueling._id, data: formData })
              ).then(fetchRefuelings);
            } else {
              dispatch(postRefueling(formData)).then(fetchRefuelings);
            }
            setShowAddModal(false);
            setEditingRefueling(null);
          }}
        />
      )}
    </div>
  );
}
