import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCart as fetchCartApi, addProductToCart as addToCartApi, removeProductFromCart as removeFromCartApi } from "../Api/cartApi";

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

// Thunks
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async () => {
    try {
      const response = await fetchCartApi();
      return {
        products: Array.isArray(response.products) ? response.products : [],
        total: response.total || 0
      };
    } catch (error) {
      console.error("Error fetching cart:", error);
      return { products: [], total: 0 };
    }
  }
);

export const addProductToCart = createAsyncThunk(
  'cart/addProduct',
  async (productName) => {
    try {
      const response = await addToCartApi(productName);
      return {
        products: Array.isArray(response.products) ? response.products : [],
        total: response.total || 0
      };
    } catch (error) {
      console.error("Error adding product to cart:", error);
      throw error;
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  'cart/removeProduct',
  async (productName) => {
    try {
      const response = await removeFromCartApi(productName);
      return {
        products: Array.isArray(response.products) ? response.products : [],
        total: response.total || 0
      };
    } catch (error) {
      console.error("Error removing product from cart:", error);
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    totalAmount: 0,
    totalItems: 0,
    status: 'idle',
    error: null
  },

  reducers: {
    getCartTotal(state) {
      state.totalAmount = state.data.reduce((cartTotal, cartItem) => {
        return cartTotal + (cartItem.price * cartItem.quantity);
      }, 0);
      state.totalItems = state.data.length;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.products || [];
        state.totalAmount = action.payload.total || 0;
        storeInLocalStorage(state.data);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.data = [];
      })

      // Add Product
      .addCase(addProductToCart.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log("Payload al añadir:", action.payload); // <--- Añade esto
        console.log("Estado antes de actualizar:", state); // <--- Añade esto
        state.data = action.payload.products || [];
        state.totalAmount = action.payload.total || 0;
        storeInLocalStorage(state.data);
        console.log("Estado después de actualizar:", state); // <--- Añade esto
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Remove Product
      .addCase(removeProductFromCart.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.products || [];
        state.totalAmount = action.payload.total || 0;
        storeInLocalStorage(state.data);
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { getCartTotal } = cartSlice.actions;
export default cartSlice.reducer;