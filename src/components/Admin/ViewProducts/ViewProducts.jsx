import React, { useEffect, useState } from "react";
import "./ViewProducts.scss";
import { toast } from "react-toastify";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../Loader/Loader";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import {
  STORE_PRODUCTS,
  selectProducts,
} from "../../../redux/slice/productSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";

const ViewProducts = () => {
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [data]);

  const confirmDelete = (id, imgURL) => {
    Notiflix.Confirm.show(
      "Delete Product",
      "Are you sure you want to delete this product?",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imgURL);
      },
      function cancelCb() {},
      {
        width: "320px",
        borderRadius: "5px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id, imgURL) => {
    try {
      await deleteDoc(doc(db, "products", id));

      const storageRef = ref(storage, imgURL);
      await deleteObject(storageRef);

      toast.success("Product deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className='table'>
        <h2>All Products</h2>
        {products.length === 0 ? (
          <p>No product found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => {
                const { id, name, price, imgURL, category } = product;
                return (
                  <tr key={id}>
                    <td>{i + 1}</td>
                    <td>
                      <img src={imgURL} alt={name} style={{ width: "100px" }} />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`Rp. ${price}`}</td>
                    <td className='icons'>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color='green' />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color='red'
                        onClick={() => confirmDelete(id, imgURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      ;
    </>
  );
};

export default ViewProducts;
