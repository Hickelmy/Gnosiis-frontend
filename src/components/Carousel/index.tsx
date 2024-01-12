import React from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import "./styles.css";

import image1 from "../../assets/Banners/poster-1.webp";
import image2 from "../../assets/Banners/poster-2.webp";
import image3 from "../../assets/Banners/poster-3.webp";
import image4 from "../../assets/Banners/poster-4.webp";
import image5 from "../../assets/Banners/poster-5.webp";

import image6 from "../../assets/Banners/poster-6.webp";
import image7 from "../../assets/Banners/poster-7.webp";
import image8 from "../../assets/Banners/poster-8.webp";
import image9 from "../../assets/Banners/poster-9.png";
import image10 from "../../assets/Banners/poster-10.png";

export default function Slide() {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 3000 }}
        navigation={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <img src={image1} alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image2} alt="Slide 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image3} alt="Slide 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image4} alt="Slide 4" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image5} alt="Slide 5" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image6} alt="Slide 5" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image7} alt="Slide 5" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image8} alt="Slide 5" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image9} alt="Slide 5" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image10} alt="Slide 5" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
