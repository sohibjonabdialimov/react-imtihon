import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../loader/Loader";

export const Form = () => {
  const [load, setLoad] = useState(false);
  let id = localStorage.getItem("id");
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  let location = useLocation();
  let users = JSON.parse(localStorage.getItem("users"));
  let globalObj;

  const nameRef = useRef();
  const emailRef = useRef();
  const termRef = useRef();
  const dateRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  // Formik start
  let formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      term: "",
      price: "",
      email: "",
    },
    validationSchema: Yup.object({
      price: Yup.number("Narx raqamlardan iborat bo'lishi kerak")
        .min(100, "Kamida 100$ bo'lishi kerak!!!")
        .max(1000, "Ko'pida 1000$ bo'lishi kerak!!!")
        .required("Required"),
      term: Yup.number().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      date: Yup.date().required("Required"),
      name: Yup.string()
        .min(3, "Kamida 3ta bo'lishi kerak!!!")
        .max(50, "Ko'pida 50 ta bo'lishi kerak!!!")
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  // Formik end

  useEffect(() => {
    if (location.pathname === "/edit" && !localStorage.getItem("token")) {
      navigate("/login");
    }
    if (location.pathname === "/add" && !localStorage.getItem("token")) {
      navigate("/login");
    }
    if (location.pathname === "/edit" && location.state) {
      let editUser = location.state;
      console.log(location);
      let findedElement = users?.findIndex((item) => item.id === editUser.id);
      globalObj = {
        id: editUser.id,
        index: findedElement,
      };
      nameRef.current.value = editUser.to;
      emailRef.current.value = editUser.email;
      dateRef.current.value = editUser.dueDate;
      priceRef.current.value = editUser.price;
      descRef.current.value = editUser.description;
      termRef.current.value = editUser.term;
    }
  }, [location.pathname]);

  const onCancel = () => {
    console.log(new Date());
    // navigate(`/home/${location.state.id}`);
  };

  // edit function

  const addHandle = (e) => {
    setLoad(true);
    e.preventDefault();
    const newContact = {
      userId: +id,
      paid: false,
      email: emailRef.current.value,
      to: nameRef.current.value,
      dueDate: dateRef.current.value,
      term: +termRef.current.value,
      createdDate: new Date(),
      description: descRef.current.value,
      price: +priceRef.current.value,
      id: v4(),
    };

    if (
      emailRef.current.value &&
      nameRef.current.value &&
      dateRef.current.value &&
      termRef.current.value &&
      descRef.current.value &&
      priceRef.current.value
    ) {
      axios
        .post("https://invoices-8ehs.onrender.com/invoices", newContact, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoad(false);
          console.log(res);
          navigate(`/home/${newContact.id}`);
          emailRef.current.value = "";
          nameRef.current.value = "";
          termRef.current.value = "";
          dateRef.current.value = "";
          descRef.current.value = "";
          priceRef.current.value = "";
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please, fill input fields!!!");
    }
  };
  // edit function
  const editHandle = (e) => {
    setLoad(true);
    e.preventDefault();

    const editContact = {
      userId: +id,
      paid: false,
      email: emailRef.current.value,
      to: nameRef.current.value,
      dueDate: dateRef.current.value,
      term: +termRef.current.value,
      createdDate: new Date(),
      description: descRef.current.value,
      price: +priceRef.current.value,
      id: globalObj.id,
    };
    if (
      emailRef.current.value &&
      nameRef.current.value &&
      dateRef.current.value &&
      termRef.current.value &&
      descRef.current.value &&
      priceRef.current.value
    ) {
      axios
        .put(
          `https://invoices-8ehs.onrender.com/invoices/${globalObj.id}`,
          editContact,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setLoad(false);
          toast.success("Edit muvaffaqqiyatli amalga oshirildi!!!", {
            autoClose: 2500
          });
          console.log(res);
          navigate(`/home/${editContact.id}`);
        })
        .catch((err) => {
          alert("Xatolik yuz berdi");
          console.log(err);
        });
    } else {
      alert("Please, fill input fields!!!");
    }
  };

  const onGoBack = () => {
    navigate(-1);
  };

  if (load) {
    return <Loader />;
  }
  return (
    <div className="form">
      <ToastContainer />
      <div className="back" onClick={onGoBack}>
        <ion-icon name="chevron-back-outline"></ion-icon>
        <button>Go back</button>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <h3>
          {location.pathname == "/add" ? "New Invoice" : `Edit`}
          {location.pathname == "/edit" && (
            <span>
              {" #"}
              {location?.state?.id}
            </span>
          )}
        </h3>

        <div className="input__wrap">
          <label htmlFor="name">Client's Name</label>
          <input
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // value={formik.values.name}
            ref={nameRef}
            type="text"
            id="name"
          />
          {/* {formik.touched.name && formik.errors.name ? (
            <span>{formik.errors.name}</span>
          ) : null} */}
        </div>
        <div className="input__wrap">
          <label htmlFor="email">Client's Email</label>
          <input
            name="email"
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // value={formik.values.email}
            ref={emailRef}
            id="email"
            type="email"
          />
          {/* {formik.touched.email && formik.errors.email ? (
            <span>{formik.errors.email}</span>
          ) : null} */}
        </div>
        <div className="inputs__wrapper">
          <div className="input__wrap">
            <label>Due Date</label>
            <input
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // value={formik.values.date}
              ref={dateRef}
              required
              name="date"
              type="date"
            />
            {/* {formik.touched.date && formik.errors.date ? (
              <span>{formik.errors.date}</span>
            ) : null} */}
          </div>
          <div className="input__wrap">
            <label>Payment Terms</label>
            <select ref={termRef} required>
              <option selected disabled>
                Net 7 Days
              </option>
              <option>1</option>
              <option>7</option>
              <option>14</option>
              <option>30</option>
            </select>
          </div>
        </div>

        <div className="input__wrap">
          <label htmlFor="text">Project Description</label>
          <input ref={descRef} id="text" type="text" />
        </div>
        <div className="input__wrap">
          <label htmlFor="price">Price</label>
          <input
            name="price"
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // value={formik.values.price}
            id="price"
            type="input"
            ref={priceRef}
            placeholder="$"
          />
          {/* {formik.touched.price && formik.errors.price ? (
            <span>{formik.errors.price}</span>
          ) : null} */}
        </div>

        {location.pathname == "/add" ? (
          <div className="btns_groups_add">
            <button type="button" onClick={onCancel}>
              Discard
            </button>
            <button type="submit" onClick={(e) => addHandle(e)}>
              Save & Send
            </button>
          </div>
        ) : (
          <div className="btns_groups_edit">
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" onClick={(e) => editHandle(e)}>
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
