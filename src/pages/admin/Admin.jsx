import React from "react";
import "./Admin.scss";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/Admin/Navbar/Navbar";
import Home from "../../components/Admin/Home/Home";
import ViewProducts from "../../components/Admin/ViewProducts/ViewProducts";
import AddProduct from "../../components/Admin/AddProduct/AddProduct";
import Orders from "../../components/Admin/Orders/Orders";

const Admin = () => {
  return (
    <div className='admin'>
      <Navbar />

      <div className='content-admin'>
        <Routes>
          <Route path='home' element={<Home />} />
          <Route path='products' element={<ViewProducts />} />
          <Route path='add-product/:id' element={<AddProduct />} />
          <Route path='orders' element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
