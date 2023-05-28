import React, { useEffect, useState } from "react";
import "./style.scss";
import { Header } from "../../components/header";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/users/users.slice";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";
// import axios from "axios";
export const Home = () => {
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://invoices-8ehs.onrender.com/invoices")
      .then((res) => {
        if(res.status === 200){
          dispatch(userActions.setUsers(res.data));
          localStorage.setItem("users", JSON.stringify(res.data));
          setLoad(false);
        }
        
      });
  }, [dispatch]);
  const users = useSelector(({ users }) => users.users);
  if(load){
    return <Loader/>
  }

  return (
    <div className="home">
      <Header />
      <div className="cards_container">
        {users.length === 0 ? (
          <div className="empty">
            <h1 className="empty__title">There is nothing here</h1>
            <div className="empty_text">
              Create an invoice by clicking the <button onClick={() => {navigate('/add')}}>New Invoice</button>{" "}
              button and get started
            </div>
          </div>
        ) : (
          users &&
          users.map((item, index) => {
            let year = item?.dueDate?.split("-")[0];
            let month;
            let day = item?.dueDate?.split("-")[2];
            if (item?.dueDate?.split("-")[1] === "01") {
              month = "Jan";
            } else if (item?.dueDate?.split("-")[1] === "02") {
              month = "Feb";
            } else if (item?.dueDate?.split("-")[1] === "02") {
              month = "March";
            } else if (item?.dueDate?.split("-")[1] === "02") {
              month = "Apr";
            } else if (item?.dueDate?.split("-")[1] === "02") {
              month = "May";
            } else if (item?.dueDate?.split("-")[1] === "02") {
              month = "Jun";
            } else if (item?.dueDate?.split("-")[1] === "02") {
              month = "Jul";
            } else if (item?.dueDate?.split("-")[1] === "02") {
              month = "Avg";
            } else if (item?.dueDate?.split("-")[1] === "09") {
              month = "Sep";
            } else if (item?.dueDate?.split("-")[1] === "10") {
              month = "Oct";
            } else if (item?.dueDate?.split("-")[1] === "10") {
              month = "Nov";
            } else if (item?.dueDate?.split("-")[1] === "10") {
              month = "Dec";
            }

            return (
              <Link to={`/home/${item.id}`} key={item.id} className="card__wrap">
                <div className="card__desc">
                  <h4>#{index + 1}</h4>
                  <span className="card__date">
                    Due {day} {month} {year}
                  </span>
                  <p className="card__name">{item.to}</p>
                </div>
                <div className="card__info">
                  <h3>£ {item.price}</h3>
                  <div className="card_button">
                    <button
                      style={{
                        backgroundColor: item.paid ? "#f0fef9" : "#fcf6f0",
                        color: item.paid ? "#33d69f" : "#FF8F00",
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: item.paid ? "#33d69f" : "#FF8F00",
                        }}
                      ></span>{" "}
                      {item.paid ? "Paid" : "Pending"}
                    </button>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};
