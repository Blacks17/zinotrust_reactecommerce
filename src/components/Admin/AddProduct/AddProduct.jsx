import React, { useState } from "react";
import Card from "../../../components/Card/Card";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { db, storage } from "../../../firebase/config";
import "./AddProduct.scss";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";

const catagories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const initialState = {
  name: "",
  imgURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);

  const detectForm = (id, f1, f2) => {
    if (id === "add") {
      return f1;
    }
    return f2;
  };

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const reset = () => {
    setProduct({
      ...initialState,
    });
    setUploadProgress(0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `bshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imgURL: downloadURL });
          toast.success("Image uploaded succesfully");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, "products"), {
        ...product,
        createdAt: Timestamp.now().toDate(),
        price: Number(product.price),
      });
      setIsLoading(false);
      toast.success("Product uploaded successfully");
      navigate("/admin/products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }

    reset();
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (product.imgURL !== productEdit.imgURL) {
      const storageRef = ref(storage, productEdit.imgURL);
      deleteObject(storageRef);
    }

    try {
      setIsLoading(false);
      setDoc(doc(db, "products", id), {
        ...product,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
        price: Number(product.price),
      });
      toast.success("Product edited");
      navigate("/admin/products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className='product'>
        <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
        <Card cardClass='card'>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <label htmlFor='name'>Product name :</label>
            <input
              type='text'
              placeholder='Product name'
              required
              id='name'
              name='name'
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />

            <label htmlFor='image'>Product image :</label>
            <Card cardClass='group'>
              <div className='progress'>
                {uploadProgress === 0 ? null : (
                  <div
                    className='progress-bar'
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}%`
                      : "Upload completed"}
                  </div>
                )}
              </div>
              <input
                type='file'
                placeholder='Product image'
                accept='image/*'
                id='image'
                name='image'
                onChange={(e) => handleImageChange(e)}
              />
              {product.imgURL === "" ? null : (
                <input
                  type='text'
                  required
                  placeholder='Image URL'
                  name='imageURL'
                  disabled
                  value={product.imgURL}
                />
              )}
            </Card>

            <label htmlFor='price'>Product price :</label>
            <input
              type='number'
              placeholder='Product price'
              required
              id='price'
              name='price'
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />

            <label htmlFor='category'>Product category :</label>
            <select
              name='category'
              id='category'
              required
              value={product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value='' disabled>
                -- Chose Product Category --
              </option>
              {catagories.map((category) => {
                return (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </select>

            <label htmlFor='brand'>Product company/brand :</label>
            <input
              type='text'
              placeholder='Product brand'
              required
              id='brand'
              name='brand'
              value={product.brand}
              onChange={(e) => handleInputChange(e)}
            />

            <label htmlFor='desc'>Product description :</label>
            <textarea
              name='desc'
              id='desc'
              cols='30'
              rows='10'
              value={product.desc}
              onChange={(e) => handleInputChange(e)}
              required
            ></textarea>

            <button className='--btn --btn-primary' type='submit'>
              {detectForm(id, "Save Product", "Edit Product")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
