import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import spinnerImg from "../../../assets/spinner.jpg";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const obj = { id: id, ...docSnap.data() };
        setProduct(obj);
      } else {
        toast.error("Product not found");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to='/#products'>&larr; Back</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt='Loading' width='50px' />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imgURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`Rp. ${product.price}`}</p>
                <p className={styles.desc}>
                  <b>Description :</b>
                </p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU :</b> {product.id}
                </p>
                <p>
                  <b>Brand :</b> {product.brand}
                </p>
                <div className={styles.count}>
                  <button className='--btn'>-</button>
                  <p>
                    <b>1</b>
                  </p>
                  <button className='--btn'>+</button>
                </div>
                <button className='--btn --btn-danger'>Add to Cart</button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
