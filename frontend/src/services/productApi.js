import { api } from './api';

export const productApi = {
    async getAllProducts() {
        try {
            return await api.get('/api/products');
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    },

    async getProductByName(name) {
        try {
            return await api.get(`/api/products/${name}`);
        } catch (error) {
            console.error("Error fetching product:", error);
            throw error;
        }
    },

    async searchProducts(searchTerm) {
        try {
            return await api.get(`/api/products/search/${searchTerm}`);
        } catch (error) {
            console.error("Error searching products:", error);
            throw error;
        }
    }
}; 