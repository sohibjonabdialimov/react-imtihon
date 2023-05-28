import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import user from "../../assets/img/user.png";
import "./style.scss";
export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const onUserPage = () => {
    if(location.pathname !== "/add"){
      navigate("/add");
    }
  }
  const onLoginPage = () => {
    navigate("/login")
  }
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="sidebar__user">
        {
        token ? <img onClick={() => onUserPage()} src={user} alt="user" /> : <ion-icon onClick={onLoginPage} name="person-circle-outline"></ion-icon>
        }
        
      </div>
    </div>
  )
}
