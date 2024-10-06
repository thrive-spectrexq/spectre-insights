import { defineStore } from 'pinia';
import { ref } from 'vue';

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
            const { data } = await useFetch(`${process.env.API_BASE_URL}/services`, {
                method: 'GET',
                credentials: 'include', // Include cookies if necessary
            });
            services.value = data.value; // Access the reactive reference
        } catch (err: any) {
            error.value = err.value?.data?.message || 'Failed to fetch services';
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
