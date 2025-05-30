const API_BASE_URL = 'http://localhost:8080/api/shoppingcart';

export const getCart = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const addProductToCart = async (productName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/addproduct/${productName}`, {
      method: 'POST', // Cambiado a POST
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

export const removeProductFromCart = async (productName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/removeproduct/${productName}`, {
      method: 'DELETE', // Cambiado a DELETE
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error removing product from cart:", error);
    throw error;
  }
};