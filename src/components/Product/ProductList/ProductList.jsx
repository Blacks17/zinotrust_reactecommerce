import React, { useEffect, useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import styles from "./ProductList.module.scss";
import { FaListAlt } from "react-icons/fa";
import Search from "../../Search/Search";
import ProductItem from "../ProductItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  SORT_PRODUCT,
  selectFilteredProducts,
} from "../../../redux/slice/filterSlice";
import Pagination from "../../Pagination/Pagination";

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productPage, setProductPage] = useState(9);

  // Get current product
  const indexLast = currentPage * productPage;
  const indexFirst = indexLast - productPage;
  const currentProducts = filteredProducts.slice(indexFirst, indexLast);

  useEffect(() => {
    dispatch(
      FILTER_BY_SEARCH({
        products,
        search,
      })
    );
  }, [search, products, dispatch]);

  useEffect(() => {
    dispatch(
      SORT_PRODUCT({
        products,
        sort,
      })
    );
  }, [sort, products, dispatch]);

  return (
    <div className={styles["product-list"]} id='product'>
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color='orangered'
            onClick={() => setGrid(true)}
          />
          <FaListAlt size={24} color='#0066d4' onClick={() => setGrid(false)} />

          <p>
            <b>{filteredProducts.length}</b>{" "}
            {filteredProducts.length === 0
              ? "No product"
              : filteredProducts.length > 1
              ? "products"
              : "product"}{" "}
            found
          </p>
        </div>
        <div>
          {/* Search Icon */}
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className={styles.sort}>
          {/* Sort Product */}
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value='latest'>Latest</option>
            <option value='lowest-price'>Lowest Price</option>
            <option value='highest-price'>Highest Price</option>
            <option value='a-z'>A - Z</option>
            <option value='z-a'>Z - A</option>
          </select>
        </div>
      </div>

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {products.length === 0 ? (
          <p>No product found</p>
        ) : (
          <>
            {currentProducts.map((product, i) => {
              return (
                <div className='' key={product.id}>
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productPage={productPage}
        totalProducts={filteredProducts.length}
      />
    </div>
  );
};

export default ProductList;
