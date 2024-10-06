// stores/products.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    reviews: string[];
}

export const useProductsStore = defineStore('products', () => {
    const products = ref<Product[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const fetchProducts = async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/products`);
            products.value = response.data;
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Failed to fetch products';
        } finally {
            loading.value = false;
        }
    };

    return {
        products,
        loading,
        error,
        fetchProducts,
    };
});
