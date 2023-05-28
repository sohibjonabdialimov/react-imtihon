import React, { memo, useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { userActions } from "../../store/users/users.slice";
 import { toast, ToastContainer } from 'react-toastify';
import Loader from "../../loader/Loader";

const User = () => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams().userId;
  const token = localStorage.getItem("token");
  const id = +localStorage.getItem("id");

  useEffect(() => {
    axios
      .get("https://invoices-8ehs.onrender.com/invoices")
      .then((res) => dispatch(userActions.setUsers(res.data)));
  }, [dispatch]);
  const users = useSelector(({ users }) => users.users);

  let user = users.find((item) => item.id == params);
  let d = new Date(user?.createdDate);

  let datestring =
    (d.getDate() <= 9 ? "0" + d.getDate() : d.getDate()) +
    "/" +
    (d.getMonth() + 1 <= 9 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) +
    "/" +
    d.getFullYear();


  let year = user?.dueDate?.split("-")[0];
  let month;
  let day = user?.dueDate?.split("-")[2];
  if (user?.dueDate?.split("-")[1] === "01") {
    month = "Jan";
  } else if (user?.dueDate?.split("-")[1] === "02") {
    month = "Feb";
  } else if (user?.dueDate?.split("-")[1] === "02") {
    month = "March";
  } else if (user?.dueDate?.split("-")[1] === "02") {
    month = "Apr";
  } else if (user?.dueDate?.split("-")[1] === "02") {
    month = "May";
  } else if (user?.dueDate?.split("-")[1] === "02") {
    month = "Jun";
  } else if (user?.dueDate?.split("-")[1] === "02") {
    month = "Jul";
  } else if (user?.dueDate?.split("-")[1] === "02") {
    month = "Avg";
  } else if (user?.dueDate?.split("-")[1] === "09") {
    month = "Sep";
  } else if (user?.dueDate?.split("-")[1] === "10") {
    month = "Oct";
  } else if (user?.dueDate?.split("-")[1] === "10") {
    month = "Nov";
  } else if (user?.dueDate?.split("-")[1] === "10") {
    month = "Dec";
  }

  const onEdit = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      navigate("/edit", { state: user });
    }
  };
  const onDelete = () => {
    setLoad(true);
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      axios.delete(`https://invoices-8ehs.onrender.com/invoices/${params}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setLoad(false);

          if (res.status == 200) {
            navigate("/home");
          }
        })
        // .catch((err) => toast.error("Item is not deleted!!!"));
    }
  };

  const onPaid = () => {
    setLoad(true);
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {

      const editContact = {
        userId: +id,
        paid: true,
        email: user.email,
        to: user.to,
        dueDate: user.dueDate,
        term: user.term,
        createdDate: user.createdDate,
        description: user.description,
        price: user.price,
        id: user.id,
      };
      axios.put(`https://invoices-8ehs.onrender.com/invoices/${user.id}`, editContact, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(res => {
        console.log(res);
        setLoad(false)
        toast.info("mark is pending", {
          autoClose: 2500
        })
        navigate(`/home/${editContact.id}`);
      })
      .catch(err =>  toast.error("mark is not pending", {
        autoClose: 2500
      }))
    }
  };
  const onGoBack = () => {
    navigate("/home");
  };
  if(load){
    return <Loader />
  }

  return (
    <div className="user">
      <ToastContainer />
      <div className="back" onClick={onGoBack}>
        <ion-icon name="chevron-back-outline"></ion-icon>
        <button>Go back</button>
      </div>
      {user && (
        <>
          <div className="user__section">
            <div className="user__section__status">
              <span>Status</span>
              <button
                style={{
                  backgroundColor: user.paid ? "#f0fef9" : "#fcf6f0",
                  color: user.paid ? "#33d69f" : "#FF8F00",
                }}
              >
                <span
                  style={{
                    backgroundColor: user.paid ? "#33d69f" : "#FF8F00",
                  }}
                ></span>{" "}
                Paid
              </button>
            </div>
            <div className="user__section__btns">
              <button onClick={() => onEdit()}>Edit</button>
              <button onClick={() => onDelete()}>Delete</button>
              {
                !user.paid && <button onClick={() => onPaid()}>Mark as Paid</button>
              }
              
            </div>
          </div>

          <div className="user__info">
            <div className="user__info_id">
              <p>{user.id}</p>
              <span>{user?.description}</span>
            </div>
            <div className="user__info_desc">
              <div className="user__info_wrap">
                <span>Invoice Date</span>
                <p>{user.dueDate.split("-")[0] +"." + user.dueDate.split("-")[1] + "." + user.dueDate.split("-")[1]}</p>
              </div>
              <div className="user__info_wrap">
                <span>Bill To</span>
                <p>{user.to}</p>
              </div>
              <div className="user__info_wrap">
                <span>Sent to</span>
                <p>{user.email}</p>
              </div>
            </div>

            <div className="user__info_payment">
              <span>Payment Due</span>
              <p>
                {/* {day} {month} {year} */}
                {datestring}
              </p>
            </div>

            <div className="user__info_amount">
              <span>Amount Due</span>
              <p>£ {user.price}.00</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(User);
