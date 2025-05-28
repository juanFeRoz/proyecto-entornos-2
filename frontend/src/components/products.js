import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiCart } from "react-icons/bi";
import Modal from "../common/Modal";
import Heading from "../common/Heading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
  IoMdHeartEmpty,
  IoMdSearch,
} from "react-icons/io";

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((response) => {
        const uniqueProducts = response.data.filter(
          (product, index, self) =>
            index === self.findIndex((p) => p.id === product.id)
        )
        .slice(0, 7);
        setProducts(uniqueProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleOpen = (productId) => {
    setIsModalOpen(productId);
  };

  const handleClose = () => {
    setIsModalOpen(null);
  };

  const getImageById = (id, productImage) => {
    // Si el producto tiene una imagen válida en el backend, usarla
    if (productImage && productImage !== "null" && productImage !== "undefined") {
      return productImage;
    }
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: <IoIosArrowRoundBack />,
    nextArrow: <IoIosArrowRoundForward />,
  };

  return (
    <div className="products w-10/12 m-auto">
      <Heading heading={"Top Sellers"} />
      <Slider {...sliderSettings}>
        {products.map((item) => (
          <div key={item.id} className="mt-8">
            <div className="overflow-hidden relative ml-4">
              <div className="relative rounded-3xl overflow-hidden">
              <img
                src={getImageById(item.id, item.image)}
                alt={item.name}
                className="rounded-3xl w-full h-[250px] object-contain"
              />

                <div className="opacity-0 absolute top-0 right-0 m-4 hover:opacity-100 transition">
                  <div>
                    <div className="bg-white p-4 rounded-full mb-2">
                      <IoMdHeartEmpty />
                    </div>
                    <div className="bg-white p-4 rounded-full">
                      <IoMdSearch />
                    </div>
                  </div>
                </div>
                <div className="opacity-0 absolute -bottom-3 right-0 bg-white p-4 rounded-s-2xl hover:opacity-100 transition">
                  <div className="bg-black text-white h-10 w-10 grid place-items-center rounded-3xl">
                    <button
                      className="text-2xl"
                      onClick={() => handleOpen(item.id)}
                    >
                      <BiCart />
                    </button>
                  </div>
                </div>
              </div>

              <div className="product-details mt-2">
                <p className="mb-2">{item.name}</p>
                <p>${item.price.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <Modal
        data={products.find((item) => item.id === isModalOpen)}
        isModalOpen={isModalOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default BestSeller;

