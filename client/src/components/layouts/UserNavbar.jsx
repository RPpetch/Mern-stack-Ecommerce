import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../reducers/slice/userReducer";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Seach from "../card/Seach";
import "./Navbar.css";

const UserNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state);
  const logout = () => {
    dispatch(userLogout());
    localStorage.removeItem('token'); // ลบ token ที่เก็บใน localStorage
    navigate("/");
  };
  return (
    <nav>
      <Link style={{ textDecoration: "none" }} to={"/user/index"}>
        <h2>IT Shopping</h2>
      </Link>

      <ul>
        <li>
          <span className="p-1">
            <Seach />
          </span>
        </li>
        <li>
          <Link to="/user/index">Home</Link>
        </li>
        <li>
          <Link to="/user/shop">Shop</Link>
        </li>
        <li>
          <Link to="/user/wishlist">Wishlist</Link>
        </li>
        <li>
          <Link to="/user/cart">
            <Badge count={cart.length} offset={[9, 0]}>
              <ShoppingCartOutlined style={{ fontSize: "20px" }} />
            </Badge>
          </Link>
        </li>
        <li>
          <Link className="btn-signin" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
