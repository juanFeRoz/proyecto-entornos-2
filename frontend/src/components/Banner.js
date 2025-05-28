import React from "react";
import { banners } from "../data/Data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineChair } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const PrevArrow = ({ currentSlide, slideCount, ...props }) => {
  return (
    <button
      {...props}
      className="slick-prev slick-arrow"
      aria-hidden="true"
      aria-disabled={currentSlide === 0}
      type="button"
    >
      <IoIosArrowRoundBack />
    </button>
  );
};

const NextArrow = ({ currentSlide, slideCount, ...props }) => {
  return (
    <button
      {...props}
      className="slick-next slick-arrow"
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1}
      type="button"
    >
      <IoIosArrowRoundForward />
    </button>
  );
};

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      }
    ]
  };

  return (
    <div className="banner">
      <div className="w-10/12 m-auto">
        <div className="mb-10">
          <div className="header-text">
            <button className="flex items-center">
              <div className="text-white mr-4 common-hover text-4xl rounded-3xl h-12 w-20 grid place-items-center">
                <MdOutlineChair />
              </div>
              Espejos a la medida
            </button>
            <p>personalizados e instalados</p>

            <Link
              to="/shop"
              className="text-white common-hover text-4xl rounded-full ml-4 px-7 py-2"
            >
              Compra ahora
            </Link>
          </div>
        </div>
        <div className="w-full">
          <Slider {...settings}>
            {banners.map((data, key) => (
              <div className="banner-slider rounded-3xl" key={key}>
                <img
                  src={data.banner}
                  alt="banner"
                  className="rounded-3xl w-full h-auto"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Banner;
