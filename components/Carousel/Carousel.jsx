import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useState } from "react";

import Image from "next/image";
import Slider from "react-slick";
import { dataDigitalBestSeller } from "../data";
// import imgGirl from '/images/defaultImage.jpg';
import styles from "./Carousel.module.css";

export default function SimpleSlider() {
  const [defaultImage, setDefaultImage] = useState({});
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      linkDefault: "/images/defaultImage.jpg",
    }));
  };

  return (
    <Slider {...settings}>
      {dataDigitalBestSeller.map((item, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.card_top}>
            <Image
              src={
                defaultImage[item.title] === item.title
                  ? defaultImage.linkDefault
                  : item.linkImg
              }
              alt={item.title}
              onError={handleErrorImage}
              width={450}
              height={250}
            />
            <h1>{item.title}</h1>
          </div>
          <div className={styles.card_bottom}>
            <h3>{item.price}</h3>
            <span className={styles.category}>{item.category}</span>
          </div>
        </div>
      ))}
    </Slider>
  );
}
