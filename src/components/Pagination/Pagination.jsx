import React, { useState } from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productPage,
  totalProducts,
}) => {
  const pageNumbers = [];

  // Limit the page numbers shown
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // Paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Go to the next page
  const nextPage = () => {
    setCurrentPage((next) => next + 1);
    // Show next set of pagination
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  // Go to the prev page
  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
    // Show prev set of pagination
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  // total page
  for (let i = 1; i <= Math.ceil(totalProducts / productPage); i++) {
    pageNumbers.push(i);
  }
  const totalPages = pageNumbers.length;

  return (
    <ul className={styles.pagination}>
      <li
        onClick={prevPage}
        className={currentPage == pageNumbers[0] ? `${styles.hidden}` : ""}
      >
        Prev
      </li>
      {pageNumbers.map((number, i) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={i}
              onClick={() => paginate(number)}
              className={currentPage === number ? `${styles.active}` : ""}
            >
              {number}
            </li>
          );
        }
      })}
      <li
        onClick={nextPage}
        className={
          currentPage == pageNumbers[pageNumbers.length - 1]
            ? `${styles.hidden}`
            : ""
        }
      >
        Next
      </li>
      <p>
        <b className={styles.page}>{`Page ${currentPage} `}</b>
        <span>of </span>
        <b>{totalPages}</b>
      </p>
    </ul>
  );
};

export default Pagination;
