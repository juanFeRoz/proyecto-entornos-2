import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";

const Userbar = ({ isUserbarOpen, closeUserbar }) => {
  const loggedInUsername = localStorage.getItem("loggedInUser");
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    const handleStorageChange = () => {
      if (loggedInUsername) {
        const storedHistory = localStorage.getItem('user_history');
        if (storedHistory) {
          setPurchaseHistory(JSON.parse(storedHistory));
        } else {
          setPurchaseHistory([]);
        }
      } else {
        setPurchaseHistory([]);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cargar el historial inicial
    if (loggedInUsername) {
      const storedHistory = localStorage.getItem('user_history');
      if (storedHistory) {
        setPurchaseHistory(JSON.parse(storedHistory));
      } else {
        setPurchaseHistory([]);
      }
    } else {
      setPurchaseHistory([]);
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loggedInUsername]);

  return (
    <div
      style={{
        zIndex: "100",
        transform: `translateX(${isUserbarOpen ? "0%" : "100%"})`,
      }}
      className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform duration-300 ease-in-out overflow-y-auto"
    >
      {/* Encabezado */}
      <div className="border-b mb-4 bg-secondary flex justify-between items-center p-4">
        <h1 className="text-2xl font-semibold">Perfil de Usuario</h1>
        <button onClick={closeUserbar} className="text-gray-600 hover:text-black">
          <FaTimes size={20} />
        </button>
      </div>

      {/* Contenido */}
      <div className="p-6 text-center">
        {loggedInUsername ? (
          <div>
            <p className="text-lg font-semibold mb-4">Bienvenido, {loggedInUsername}!</p>

            {/* Historial de Compras */}
            <div className="mb-6 text-left">
              <h3 className="text-xl font-semibold mb-2">Historial de Compras</h3>
              {purchaseHistory.length > 0 ? (
                <ul className="list-disc pl-5">
                  {purchaseHistory.map((item, index) => (
                    <li key={index} className="mb-2 text-sm">
                      {item.name} - Cantidad: {item.quantity} - Precio: ${item.price.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm italic text-gray-600">No hay compras en tu historial.</p>
              )}
            </div>

            {/* Botón de Cerrar Sesión */}
            <button
              onClick={() => {
                localStorage.removeItem("loggedInUser");
                window.location.reload(); // Recargar para reflejar el cambio
                closeUserbar();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <LoginForm onClose={closeUserbar} />
        )}
      </div>
    </div>
  );
};

export default Userbar;