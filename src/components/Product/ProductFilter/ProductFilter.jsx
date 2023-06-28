import React, { useEffect, useState } from "react";
import styles from "./ProductFilter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from "../../../redux/slice/productSlice";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/slice/filterSlice";

const ProductFilter = ({ setShowFilter }) => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(1000000);
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
    setCategory("All");
    setShowFilter(false);
  }, [brand, dispatch, products]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [price, dispatch, products]);

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
    setShowFilter(false);
  };

  const clearFilters = () => {
    filterProducts("All");
    setBrand("All");
    setPrice(maxPrice);
  };

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, i) => (
          <button
            key={i}
            type='button'
            className={category === cat ? `${styles.active}` : ""}
            onClick={() => filterProducts(cat)}
          >
            &#8250; {cat}
          </button>
        ))}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select
          name='brand'
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          {allBrands.map((brand, i) => {
            return (
              <option key={i} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
      </div>
      <h4>Price</h4>
      <p>{`Rp. ${price}`}</p>
      <div className={styles.price}>
        <input
          type='range'
          name='price'
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <br />
      <button className='--btn --btn-danger' onClick={clearFilters}>
        Clear Filter
      </button>
    </div>
  );
};

export default ProductFilter;
