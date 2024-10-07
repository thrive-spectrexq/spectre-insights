import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
}

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null);
    const token = ref<string | null>(null);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    // Fetch token from localStorage when mounted
    onMounted(() => {
        if (process.client) {
            token.value = localStorage.getItem('token');
        }
    });

    const signup = async (name: string, email: string, password: string) => {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await useFetch(`${process.env.API_BASE_URL}/users/register`, {
                method: 'POST',
                body: { name, email, password },
                credentials: 'include',
            });

            token.value = data.value.token;
            if (process.client) {
                localStorage.setItem('token', token.value);
            }
            await fetchUserProfile();
        } catch (err: any) {
            error.value = err.value?.data?.message || 'Signup failed';
        } finally {
            loading.value = false;
        }
    };

    const signin = async (email: string, password: string) => {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await useFetch(`${process.env.API_BASE_URL}/users/login`, {
                method: 'POST',
                body: { email, password },
                credentials: 'include',
            });

            token.value = data.value.token;
            if (process.client) {
                localStorage.setItem('token', token.value);
            }
            await fetchUserProfile();
        } catch (err: any) {
            error.value = err.value?.data?.message || 'Signin failed';
        } finally {
            loading.value = false;
        }
    };

    const signout = () => {
        user.value = null;
        token.value = null;
        if (process.client) {
            localStorage.removeItem('token');
        }
    };

    const fetchUserProfile = async () => {
        if (!token.value) return; // Prevent fetching if no token
        loading.value = true;
        error.value = null;
        try {
            const { data } = await useFetch(`${process.env.API_BASE_URL}/users/profile`, {
                method: 'GET',
                credentials: 'include',
            });
            user.value = data.value;
        } catch (err: any) {
            error.value = err.value?.data?.message || 'Failed to fetch profile';
            signout(); // Optional: sign out on profile fetch failure
        } finally {
            loading.value = false;
        }
    };

    return {
        user,
        token,
        loading,
        error,
        signup,
        signin,
        signout,
        fetchUserProfile,
    };
});
