import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeProductFromCart } from "../redux/cartSlice";
import PageHeading from "../common/PageHeading";
import { PiMinus, PiPlus } from "react-icons/pi";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { data: cartProducts, totalAmount, status, error } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCart());
    }
  }, [status, dispatch]);

  const removeFromCart = async (productName) => {
    await dispatch(removeProductFromCart(productName));
  };

  if (status === 'loading') {
    return <div>Cargando...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

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
                            onClick={() => removeFromCart(item.name)}
                          >
                            <FaTimes />
                          </span>
                        </td>
                        <td className="text-center px-4 py-2">
                          <div className="flex items-center justify-center">
                            <img
                              src={item.image}
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
                          ${item.price * item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 text-right">
                  <p className="text-xl font-bold">Total: ${totalAmount}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
