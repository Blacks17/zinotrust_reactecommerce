import React, { useEffect, useState } from "react";
import "./Header.scss";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Loader from "../Loader/Loader";
import { useDispatch } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import { ShowOnLogOut, ShowOnLogin } from "../HiddenLink/hiddenLink";
import {
  AdminOnlyRoute,
  AdminOnlyLink,
} from "../AdminOnlyRoute/AdminOnlyRoute";

const logo = (
  <div className='logo'>
    <Link to='/'>
      <h2>
        b<span>Shop</span>
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className='cart'>
    <Link to='/cart'>
      Cart <FaShoppingCart size={20} /> <p>0</p>
    </Link>
  </span>
);

const activeLink = ({ isActive }) => (isActive ? "active" : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const dispatch = useDispatch();

  // Monitor currently signed user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        if (user.displayName === null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setIsLoading(false);
        toast.success("Logout Success");
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Something went wrong");
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <header>
        <div className='header'>
          {logo}

          <nav className={showMenu ? `show-nav` : `hide-nav`}>
            <div
              className={
                showMenu ? `nav-wrapper show-nav-wrapper` : `nav-wrapper`
              }
              onClick={hideMenu}
            ></div>

            <ul onClick={hideMenu}>
              <li className='logo-mobile'>
                {logo}
                <FaTimes size={22} color='#fff' onClick={hideMenu} />
              </li>
              <AdminOnlyLink>
                <Link to='/admin/home'>
                  <li>
                    <button className='--btn --btn-primary'>Admin</button>
                  </li>
                </Link>
              </AdminOnlyLink>
              <li>
                <NavLink to='/' className={activeLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/contact' className={activeLink}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <div className='header-right' onClick={hideMenu}>
              <span className='links'>
                <ShowOnLogOut>
                  <NavLink to='/login' className={activeLink}>
                    Login
                  </NavLink>
                </ShowOnLogOut>
                <ShowOnLogin>
                  {displayName && (
                    <a href='#home' style={{ color: "#ff7722" }}>
                      <FaUserCircle size={16} />
                      Hi, {displayName}
                    </a>
                  )}
                  <NavLink to='/order-history' className={activeLink}>
                    My Orders
                  </NavLink>
                  <NavLink to='/login' onClick={logoutUser}>
                    Logout
                  </NavLink>
                </ShowOnLogin>
              </span>
              {cart}
            </div>
          </nav>

          <div className='menu-icon'>
            {cart}
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
