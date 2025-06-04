import React, { useEffect } from "react"; // Importa useEffect
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, getCartTotal, clearCart } from "../redux/cartSlice";
import PageHeading from "../common/PageHeading";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: cartProducts, totalAmount } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(getCartTotal()); // Despacha getCartTotal al montar y cuando cartProducts cambia
  }, [dispatch, cartProducts]);

  const saveToHistory = (items) => {
    const storedHistory = localStorage.getItem('user_history');
    const history = storedHistory ? JSON.parse(storedHistory) : [];
    const newHistory = [...history, ...items];
    localStorage.setItem('user_history', JSON.stringify(newHistory));
    console.log("Guardando en historial:", newHistory); // Añade esta línea
  };

  const handleRemoveFromCartLocal = (item) => {
    dispatch(removeFromCart(item));
    dispatch(getCartTotal());
    console.log(`Eliminando ${item.name} del carrito (local)`);
  };

  const handleCheckout = () => {
    if (cartProducts.length > 0) {
      toast.success('Compra Completada! Los items se han añadido a tu historial.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      saveToHistory(cartProducts); // Llama a la función para guardar en el historial
      dispatch(clearCart());
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      toast.warn('Tu carrito está vacío.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (!cartProducts) {
    return <div>Cargando...</div>;
  }

  console.log("Productos en el carrito:", cartProducts);

  return (
    <div>
      <div>
        <PageHeading home={"home"} pagename={"Cart"} />
      </div>
      <div className="w-10/12 m-auto">
        <div className="mt-8">
          {cartProducts.length === 0 ? (
            <div className="text-3xl font-bold uppercase">
              Tu Carrito está Vacío
            </div>
          ) : (
            <div>
              <div>
                <table className="w-full shadow-2xl rounded-2xl">
                  <thead className="bg-blue-950 text-white font-semibold">
                    <tr>
                      <th className="px-4 py-2"></th>
                      <th className="px-4 py-2">Producto</th>
                      <th className="px-4 py-2">Precio</th>
                      <th className="px-4 py-2">Cantidad</th>
                      <th className="px-4 py-2">SubTotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.map((item) => (
                      <tr key={item.id}>
                        <td className="text-center px-4 py-2">
                          <span
                            className="text-red-500 cursor-pointer"
                            onClick={() => handleRemoveFromCartLocal(item)}
                          >
                            <FaTimes />
                          </span>
                        </td>
                        <td className="text-center px-4 py-2">
                          <div className="flex items-center justify-center">
                            <img
                              src={item.img}
                              alt={item.name}
                              className="h-40 w-40 object-contain mr-2"
                            />
                            <p className="font-semibold">{item.name}</p>
                          </div>
                        </td>
                        <td className="text-center px-4 py-2">${item.price}</td>
                        <td className="text-center px-4 py-2">
                          <div className="flex justify-center">
                            <span className="border py-3 px-6">
                              {item.quantity}
                            </span>
                          </div>
                        </td>
                        <td className="text-center px-4 py-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 text-right">
                  <p className="text-xl font-bold">Total: ${totalAmount.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                  <button
                    onClick={handleCheckout}
                    className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                  >
                    Finalizar Compra
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Importa y usa ReactToastify */}
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/react-toastify/9.1.3/react-toastify.min.css" />
    </div>
  );
};

export default Cart;