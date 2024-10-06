import { defineStore } from 'pinia';

interface ContactForm {
    name: string;
    email: string;
    message: string;
}

export const useContactStore = defineStore('contact', {
    actions: {
        async sendMessage(form: ContactForm) {
            try {
                const { data } = await useFetch('/api/contact', {
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
