import { api } from './api';

export const cartApi = {
    async getCart() {
        try {
            return await api.get('/api/shoppingcart');
        } catch (error) {
            console.error("Error fetching cart:", error);
            throw error;
        }
    },

    async addToCart(productName) {
        try {
            return await api.get(`/api/shoppingcart/addproduct/${productName}`);
        } catch (error) {
            console.error("Error adding product to cart:", error);
            throw error;
        }
    },

    async removeFromCart(productName) {
        try {
            return await api.get(`/api/shoppingcart/removeproduct/${productName}`);
        } catch (error) {
            console.error("Error removing product from cart:", error);
            throw error;
        }
    }
}; 