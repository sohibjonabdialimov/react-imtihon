import { useNavigate } from "react-router-dom";
import plus from "../../assets/img/plus.png";
import "./style.scss";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/users/users.slice";
import axios from "axios";

export const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  let selectRef = useRef();
  const onAdd = () => {
    if (token) {
      navigate("/add");
    } else {
      navigate("/login");
    }
  };

  const users = useSelector(({users}) => users.users) || [];
  const onFilter = () => {
    if (selectRef.current.value === "all") {
      axios
        .get("https://invoices-8ehs.onrender.com/invoices")
        .then((res) => dispatch(userActions.setUsers(res.data)));
    } else if (selectRef.current.value === "pending") {
      axios
        .get("https://invoices-8ehs.onrender.com/invoices")
        .then((res) =>
          dispatch(userActions.setUsers(res.data.filter((item) => !item.paid)))
        );
    } else if (selectRef.current.value === "paid") {
      axios
        .get("https://invoices-8ehs.onrender.com/invoices")
        .then((res) =>
          dispatch(userActions.setUsers(res.data.filter((item) => item.paid)))
        );
    } else {
      axios
        .get("https://invoices-8ehs.onrender.com/invoices")
        .then((res) => dispatch(userActions.setUsers(res.data)));
    }
  };

  return (
    <header className="header">
      <div className="header__title">
        <h1>Invoices</h1>
        <p>There are {users.length} total invoices</p>
      </div>
      <div className="header__wrap">
        <select ref={selectRef} onChange={() => onFilter()}>
          <option selected disabled>
            Filter by status
          </option>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
        <div onClick={() => onAdd()} className="button">
          <img src={plus} alt="" />
          <button>New Invoice</button>
        </div>
      </div>
    </header>
  );
};
