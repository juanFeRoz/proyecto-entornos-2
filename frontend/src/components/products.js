import React, { useState } from "react";
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
import { useProducts } from "../data/ProductsData"; // Importa el hook personalizado
import { useDispatch } from "react-redux";
import { addToCart, getCartTotal } from "../redux/cartSlice"; // Importa la acción local addToCart

const BestSeller = () => {
  const { products, loading, error } = useProducts(); // Usa el hook para acceder a los datos
  const [isModalOpen, setIsModalOpen] = useState(null);
  const dispatch = useDispatch();

  const handleOpen = (productId) => {
    setIsModalOpen(productId);
  };

  const handleClose = () => {
    setIsModalOpen(null);
  };

  const handleAddToCartLocal = (item) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        img: item.image,
        quantity: 1, // Por defecto, se añade 1 item desde la lista
      })
    );
    dispatch(getCartTotal());
    console.log(`Añadiendo ${item.name} al carrito desde BestSeller (local)`);
  };

  const getImageById = (id, productImage) => {
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

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>Error al cargar los productos: {error}</div>;
  }

  const topSellers = products.slice(0, 7); // Tomar solo los primeros 7

  return (
    <div className="products w-10/12 m-auto">
      <Heading heading={"Top Sellers"} />
      <Slider {...sliderSettings}>
        {topSellers.map((item) => (
          <div key={item.id} className="mt-8">
            {/* ... (tu renderizado de cada producto) ... */}
            <div className="overflow-hidden relative ml-4 group"> {/* Añadido 'group' */}
              <div className="relative rounded-3xl overflow-hidden">
                <img
                  src={getImageById(item.id, item.image)}
                  alt={item.name}
                  className="rounded-3xl w-full h-[250px] object-contain"
                />
                <div className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 m-4 flex flex-col gap-2 transition">
                  <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                    <IoMdHeartEmpty size={20} />
                  </button>
                  <button
                    className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    onClick={() => handleOpen(item.id)}
                  >
                    <IoMdSearch size={20} />
                  </button>
                </div>
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-2 right-2 bg-white p-2 rounded-full shadow transition">
                  <button
                    className="bg-black text-white h-8 w-8 grid place-items-center rounded-full text-sm"
                    onClick={() => handleAddToCartLocal(item)} // Llama a la función local con el item
                  >
                    <BiCart size={20} />
                  </button>
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
        data={products.find((item) => item.id === isModalOpen) ? {
          img: products.find((item) => item.id === isModalOpen)?.image,
          title: products.find((item) => item.id === isModalOpen)?.name,
          price: products.find((item) => item.id === isModalOpen)?.price,
          description: products.find((item) => item.id === isModalOpen)?.brand || "Marca no disponible",
          ...products.find((item) => item.id === isModalOpen),
        } : null}
        isModalOpen={isModalOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default BestSeller;