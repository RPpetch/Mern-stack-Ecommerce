import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../reducers/slice/userReducer";
import './Navbar.css'
const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(userLogout());
    localStorage.removeItem("token"); // ลบ token ที่เก็บใน localStorage
    navigate("/");
  };
  return (
    <nav>
    <Link style={{textDecoration:"none"}}>
    <Link style={{textDecoration:"none"}} to="/admin/index"><h2>IT Shopping</h2></Link>
    </Link>
     <ul>
         <li><Link style={{textDecoration:"none"}} to="/admin/index">Dashboard</Link></li>
         <li><Link style={{textDecoration:"none"}} to="/admin/manage-admin">Users</Link></li>
         <li><Link style={{textDecoration:"none"}} to="/admin/create-category">Category</Link></li>
         <li><Link style={{textDecoration:"none"}} to="/admin/create-product">Product</Link></li>
         <li><Link className='btn-signin' onClick={logout}>Logout</Link></li>
     </ul>

 </nav>
  );
};

export default AdminNavbar;
