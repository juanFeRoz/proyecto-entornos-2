import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { PiMinus, PiPlus } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Modal = ({ isModalOpen, handleClose, data }) => {
  const [qty, setQty] = useState(1);
  const [addedItemToCart, setAddedItemToCart] = useState(false);

  const dispatch = useDispatch();

  const addItemToCart = async (product) => {
    try {
      await dispatch(addProductToCart(product.name));
      setAddedItemToCart(true);
    } catch (error) {
      console.error("Error adding item to cart:", error);
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
    setQty(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQty(prev => Math.max(prev - 1, 1));
  };

  if (!data) return null;

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">{data.title}</p>
                <button
                  onClick={handleClose}
                  className="modal-close cursor-pointer z-50"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="my-4">
                <img
                  src={data.img}
                  alt={data.title}
                  className="w-full h-64 object-contain"
                />
                <p className="text-gray-700 text-lg mt-4">{data.description}</p>
                <p className="text-xl font-bold mt-2">${data.price}</p>
                
                <div className="flex items-center mt-4">
                  <button
                    onClick={decreaseQuantity}
                    className="bg-gray-200 px-3 py-1 rounded-l"
                  >
                    <PiMinus />
                  </button>
                  <span className="bg-gray-100 px-4 py-1">{qty}</span>
                  <button
                    onClick={increaseQuantity}
                    className="bg-gray-200 px-3 py-1 rounded-r"
                  >
                    <PiPlus />
                  </button>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                {!addedItemToCart ? (
                  <button
                    onClick={() => addItemToCart(data)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <Link
                    to="/cart"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    View Cart
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
