import React, { useState } from "react";
import { BiCart } from "react-icons/bi";
import Modal from "../common/Modal";
import Heading from "../common/Heading";
import { IoMdHeartEmpty, IoMdSearch } from "react-icons/io";
import { useProducts } from "../data/ProductsData";
import { useDispatch } from "react-redux";
import { addProductToCart as callAddToCartAction } from "../redux/cartSlice"; // Importa la acción de Redux

const FlashSale = () => {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const { getRandomProducts, loading, error, products } = useProducts();
  const dispatch = useDispatch();

  const randomProducts = getRandomProducts(10);
  const randomMirrors = randomProducts.filter(product =>
    product.name && product.name.toLowerCase().includes('espejo')
  );
  const mirrorsToShow = randomMirrors.slice(0, 8);

  const handleOpen = (productId) => {
    setIsModalOpen(productId);
  };
  const handleClose = () => {
    setIsModalOpen(null);
  };

  const handleAddToCart = (productName) => {
    dispatch(callAddToCartAction(productName));
    console.log(`Añadiendo ${productName} al carrito desde FlashSale`);
    // Aquí podrías añadir alguna notificación visual si lo deseas
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>Error al cargar los productos: {error}</div>;
  }

  return (
    <div>
      <div className="w-10/12 m-auto">
        <Heading heading={"You are in Kitchen"} />
        <div className="grid grid-cols-4 gap-3">
          {mirrorsToShow.map((item, index) => (
            <div key={index} className="mt-8">
              <div className="overflow-hidden relative group"> {/* Añadido 'group' para el hover */}
                <div className="image-container relative">
                  <div className="rounded-3xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded-3xl w-full h-auto object-contain max-h-200px"
                    />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 m-4 flex flex-col gap-2 transition-opacity duration-300 ease-in-out">
                    <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 mb-2">
                      <IoMdHeartEmpty size={20} />
                    </button>
                    <button
                      className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                      onClick={() => handleOpen(item.id)}
                    >
                      <IoMdSearch size={20} />
                    </button>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-2 right-2 bg-white p-2 rounded-full shadow transition-opacity duration-300 ease-in-out">
                    <button
                      className="bg-black text-white h-8 w-8 grid place-items-center rounded-full text-sm"
                      onClick={() => handleAddToCart(item.name)}
                    >
                      <BiCart />
                    </button>
                  </div>
                </div>

                <div className="product-details mt-2">
                  <p className="mb-2">{item.name}</p>
                  <p>${item.price ? item.price.toLocaleString() : 'N/A'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        data={randomMirrors.find((item) => item.id === isModalOpen) ? {
          title: randomMirrors.find((item) => item.id === isModalOpen).name,
          img: randomMirrors.find((item) => item.id === isModalOpen).image,
          price: randomMirrors.find((item) => item.id === isModalOpen).price,
          description: randomMirrors.find((item) => item.id === isModalOpen).brand || "Marca no disponible", // Usamos 'brand' como descripción o un valor por defecto
          ...randomMirrors.find((item) => item.id === isModalOpen), // Pasa otras propiedades si el Modal las usa
        } : null}
        isModalOpen={isModalOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default FlashSale;