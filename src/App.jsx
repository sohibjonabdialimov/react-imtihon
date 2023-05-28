import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Layout from "./layout/Layout";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { Form } from "./pages/form";
import User from "./pages/user/User";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { tokenActions } from "./store/token/token.slice";

function App() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname == "/login" && token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="home/:userId" element={<User />} />
          <Route path="edit" element={<Form />} />
          <Route path="add" element={<Form />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
