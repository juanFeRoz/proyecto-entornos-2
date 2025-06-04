import React from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartSlice"; // Importa la acción local
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
  const dispatch = useDispatch();
  const { data: cartProducts = [], totalAmount = 0 } = useSelector(
    (state) => state.cart
  );

  const handleRemoveFromCartLocal = (item) => {
    dispatch(removeFromCart(item));
    console.log(`Eliminando ${item.name} del carrito (local)`);
    // No necesitamos recargar el carrito, ya que se actualiza localmente
  };

  const renderContent = () => {
    if (!Array.isArray(cartProducts) || cartProducts.length === 0) {
      return <p className="text-center py-8">Tu carrito está vacío</p>;
    }

    return (
      <>
        {cartProducts.map((item) => (
          <div key={item.id || item.name} className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg'; // Imagen por defecto si falla la carga
                }}
              />
              <div className="ml-4">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-gray-600">${item.price}</p>
                <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
              </div>
            </div>
            <button
              onClick={() => handleRemoveFromCartLocal(item)} // Usa la función local
              className="text-red-500 hover:text-red-700"
            >
              <FaTimes />
            </button>
          </div>
        ))}

        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total:</span>
            <span className="font-bold">${totalAmount}</span>
          </div>
          <Link
            to="/cart"
            className="block w-full text-center bg-secondary text-white py-2 rounded mt-4 hover:bg-opacity-90"
            onClick={closeSidebar}
          >
            Ver Carrito
          </Link>
        </div>
      </>
    );
  };

  return (
    <div className={`fixed top-0 right-0 w-[300px] h-full bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-50`}>
      <div className="p-5">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-xl font-semibold">Carrito</h3>
          <button onClick={closeSidebar}>
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="mt-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;