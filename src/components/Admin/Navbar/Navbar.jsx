import React from "react";
import "./Navbar.scss";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUserName } from "../../../redux/slice/authSlice";
import { NavLink } from "react-router-dom";

const activeLink = ({ isActive }) => (isActive ? "active" : "");

const Navbar = () => {
  const userName = useSelector(selectUserName);
  return (
    <div className='navbar'>
      <div className='user'>
        <FaUserCircle size={40} color='#fff' />
        <br />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul className='navbar-ul'>
          <li>
            <NavLink to='/admin/home' className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/admin/products' className={activeLink}>
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink to='/admin/add-product/add' className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to='/admin/orders' className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
