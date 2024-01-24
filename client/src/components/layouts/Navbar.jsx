import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Seach from "../card/Seach";
import { Badge} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
const Navbar = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const logout = () => {
  //   dispatch(userLogout());
  //   localStorage.removeItem("token"); // ลบ token ที่เก็บใน localStorage
  //   navigate("/");
  // };
  const { cart } = useSelector((state) => state);

  return (
    <nav>
      <Link style={{ textDecoration: "none" }} to={"/"}>
        <h2>IT Shopping</h2>
      </Link>

      <ul>
        <li>
          <span className="p-1">
            <Seach />
          </span>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/cart">
            <Badge count={cart.length} offset={[9, 0]}>
              <ShoppingCartOutlined style={{ fontSize: "20px" }} />
            </Badge>
          </Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login" className="btn-signin">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
