import React, { useEffect } from "react";
import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_ITEM,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  selectCartAmount,
  selectCartItems,
  selectCartQuantity,
} from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Card from "../../components/Card/Card";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartQuantity = useSelector(selectCartQuantity);
  const cartAmount = useSelector(selectCartAmount);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_ITEM());
  }, [cartItems, dispatch]);

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };
  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  const removeItem = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is empty</p>
            <br />
            <Link to='/#products'>
              <div>&larr; Continue shopping</div>
            </Link>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, i) => {
                  const { id, name, price, cartQuantity, imgURL } = item;
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imgURL}
                          alt={name}
                          style={{ width: "200px" }}
                        />
                      </td>
                      <td>{"Rp. " + price}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className='--btn'
                            onClick={() => decreaseCart(item)}
                          >
                            -
                          </button>
                          <b>{cartQuantity}</b>
                          <button
                            className='--btn'
                            onClick={() => increaseCart(item)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{"Rp. " + (price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={19}
                          color='red'
                          onClick={() => removeItem(item)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/*  Summary */}
            <div className={styles.summary}>
              <button
                className='--btn --btn-danger'
                onClick={() => clearCart()}
              >
                Clear Cart
              </button>
              <div className={styles.checkout}>
                <div>
                  <Link to='/#products'>&larr; Continue shopping</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>
                    Total items: <b>{cartQuantity}</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Subtotal :</h4>
                    <h3>Rp. {cartAmount.toFixed(2)}</h3>
                  </div>
                  <p>Tax and shipping calculated at checkout</p>
                  <button className='--btn --btn-primary --btn-block'>
                    Checkout
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
