import React from "react";
import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";
import { Link } from "react-router-dom";

export const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "rama@gmail.com") {
    return children;
  } else {
    return (
      <section style={{ height: "80vh" }}>
        <div className='container'>
          <h2>Permisision Denied.</h2>
          <p>This page can only be view by an admin user.</p>
          <br />
          <Link to='/'>
            <button className='--btn --btn-primary'>&larr; Back to Home</button>
          </Link>
        </div>
      </section>
    );
  }
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "rama@gmail.com") {
    return children;
  } else {
    return null;
  }
};
