import { createSlice } from "@reduxjs/toolkit";

const storeInLocalStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const getFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error parsing cart data from localStorage:", error);
    return [];
  }
};

const initialState = {
  data: getFromLocalStorage(),
  totalAmount: 0,
  totalItems: 0,
  status: 'idle',
  error: null
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.data[itemIndex].quantity += action.payload.quantity;
      } else {
        state.data.push(action.payload);
      }
      storeInLocalStorage(state.data);
    },
    removeFromCart(state, action) {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
      storeInLocalStorage(state.data);
    },
    updateQuantity(state, action) {
      const itemIndex = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.data[itemIndex].quantity = action.payload.quantity;
      }
      storeInLocalStorage(state.data);
    },
    clearCart(state) {
      state.data = [];
      storeInLocalStorage(state.data);
    },
    getCartTotal(state) {
      let { total, quantity } = state.data.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.totalAmount = parseFloat(total.toFixed(2));
      state.totalItems = quantity;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal } = cartSlice.actions;
export default cartSlice.reducer;