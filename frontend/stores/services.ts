// frontend/stores/services.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

interface Service {
    id: string;
    title: string;
    description: string;
    price: number;
    testimonials: string[];
}

export const useServicesStore = defineStore('services', () => {
    const services = ref<Service[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const fetchServices = async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/services`);
            services.value = response.data;
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Failed to fetch services';
        } finally {
            loading.value = false;
        }
    };

    return {
        services,
        loading,
        error,
        fetchServices,
    };
});
