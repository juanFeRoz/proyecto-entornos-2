import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { PiMinus, PiPlus } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice"; // Importa la acción local addToCart
import { Link } from "react-router-dom";

const Modal = ({ isModalOpen, handleClose, data }) => {
  const [qty, setQty] = useState(1);
  const [addedItemToCart, setAddedItemToCart] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCartLocal = () => {
    if (data) {
      dispatch(
        addToCart({
          id: data.id,
          name: data.title, // Asegúrate de que esta sea la propiedad correcta para el nombre
          price: data.price,
          img: data.img,
          quantity: qty,
        })
      );
      setAddedItemToCart(true);
      console.log(`${data.title} añadido al carrito desde el modal (local)`);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      // document.body.classList.add("modal-open");
    } else {
      setQty(1);
      setAddedItemToCart(false);
      // document.body.classList.remove("modal-open");
    }
  }, [isModalOpen]);

  const increaseQuantity = () => {
    setQty((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQty((prev) => Math.max(prev - 1, 1));
  };

  if (!data) return null;

  return (
    <div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content w-2/3 relative bg-white overflow-hidden" style={{ zIndex: 120 }}>
            <span className="absolute top-0 right-0 p-4 cursor-pointer" onClick={() => handleClose()}>
              <FaTimes />
            </span>
            <div className="flex">
              <div className="relative">
                <div className="flash_sale_img">
                  <img src={data.img} alt={data.title} style={{ maxHeight: '300px', objectFit: 'contain' }} />
                </div>
              </div>

              <div className="modal-info ml-6">
                <p className="mb-2 font-bold">{data.title}</p> {/* Usando data.title ahora */}
                <p className="text-red-600 text-xl">${data.price}</p>
                <p className="my-2">{data.description || data.brand || 'No description'}</p>

                <div className="flex items-center mb-2">
                  {/* ... Selector de shades (sin cambios) ... */}
                </div>
                <p className="text-green-700 m-0">In Stock {/* ... */}</p>
                <div className="flex items-center">
                  <div className="flex mr-3">
                    <button className="border mt-4 py-3 px-6" onClick={() => decreaseQuantity()}>
                      <PiMinus />
                    </button>
                    <span className="border mt-4 py-3 px-6 count">
                      {qty}
                    </span>
                    <button className="border mt-4 py-3 px-6" onClick={() => increaseQuantity()}>
                      <PiPlus />
                    </button>
                  </div>

                  <div className="addtocart mr-3">
                    {!addedItemToCart ? (
                      <button
                        onClick={handleAddToCartLocal} // Llama a la función local
                        className="mt-4 px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-700"
                      >
                        Add To Cart
                      </button>
                    ) : (
                      <button className="mt-4 px-6 py-3 text-white bg-green-500 rounded hover:bg-green-700">
                        <Link to="/cart">View Cart</Link>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;