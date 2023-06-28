import React, { useEffect, useState } from "react";
import "./Slider.scss";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./slider-data";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 3000;

  const auto = () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === sliderData.length - 1 ? 0 : (prev) => prev + 1
    );
  };
  const prevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? sliderData.length - 1 : (prev) => prev - 1
    );
  };

  return (
    <div className='slider'>
      <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide} />
      <AiOutlineArrowRight className='arrow next' onClick={nextSlide} />
      <div
        className='container-slider'
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {sliderData.map((slide, index) => {
          const { image, heading, desc } = slide;
          return (
            <div key={index} className='slide'>
              <img src={image} alt='slide' />
              <div className='content'>
                <h2>{heading}</h2>
                <p>{desc}</p>
                <hr />
                <a href='#product' className='--btn --btn-primary'>
                  Shop Now
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
