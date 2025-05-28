const API_BASE_URL = '/api/shoppingcart'; // Ajusta la URL base de tu backend

export const addProductToCart = async (productName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/addproduct/${productName}`, {
      method: 'GET', // O el método que tu backend requiera
      headers: {
        'Content-Type': 'application/json',
        // Puedes incluir aquí tokens de autenticación si son necesarios
      },
      
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // El backend debería devolver el carrito actualizado
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

export const removeProductFromCart = async (productName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/removeproduct/${productName}`, {
      method: 'GET', // O el método que tu backend requiera
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // El backend debería devolver el carrito actualizado
  } catch (error) {
    console.error("Error removing product from cart:", error);
    throw error;
  }
};

// Necesitaríamos una función para actualizar la cantidad,
// dado que tu backend actual no tiene un endpoint específico para esto.
// Por ejemplo:
export const updateProductQuantityInCart = async (productId, quantity) => {
  try {
    const response = await fetch(`${API_BASE_URL}/updatequantity/${productId}`, {
      method: 'POST', // Asumiendo que usas POST para actualizar
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // El backend debería devolver el carrito actualizado
  } catch (error) {
    console.error("Error updating product quantity:", error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};