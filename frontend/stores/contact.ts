// stores/contact.ts
import { defineStore } from 'pinia';
import { useRuntimeConfig } from '#app'; // Import useRuntimeConfig

interface ContactForm {
    name: string;
    email: string;
    message: string;
}

export const useContactStore = defineStore('contact', {
    actions: {
        async sendMessage(form: ContactForm) {
            const config = useRuntimeConfig(); // Access runtime config
            try {
                const { data } = await useFetch(`${config.public.API_BASE_URL}/contact`, { // Use runtime config
                    method: 'POST',
                    body: form,
                    credentials: 'include', // Include cookies if necessary
                });
                return data.value; // Return the response data
            } catch (error: any) {
                throw new Error(error.value?.data?.message || 'Failed to send message');
            }
        },
    },
});
