import React from "react";
import styles from "./ProductItem.module.scss";
import Card from "../../Card/Card";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../../../redux/slice/cartSlice";

const ProductItem = ({ product, grid, id, name, price, desc, imgURL }) => {
  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortText = text.substring(0, n).concat("...");
      return shortText;
    }
    return text;
  };

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imgURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{`Rp. ${price}`}</p>
          <h4>{shortenText(name, 20)}</h4>
        </div>
        {!grid && <p className={styles.desc}>{shortenText(desc, 200)}</p>}

        <button
          className='--btn --btn-danger'
          type='button'
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
