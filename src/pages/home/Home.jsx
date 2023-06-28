import React, { useEffect } from "react";
import "./Home.scss";
import Slider from "../../components/Slider/Slider";
import Product from "../../components/Product/Product";

const Home = () => {
  const url = window.location.href;

  const scrollToProducts = () => {
    if (url.includes("#products")) {
      window.scrollTo({
        top: 800,
        behavior: "smooth",
      });
      return;
    }
  };

  // useEffect(() => {
  //   scrollToProducts();
  // }, []);

  return (
    <div>
      {/* <Slider /> */}
      <Product />
    </div>
  );
};

export default Home;
