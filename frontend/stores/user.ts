import { defineStore } from 'pinia';
import { ref } from 'vue';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('token')); // Retrieve token from localStorage if needed
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Signup
  const signup = async (name: string, email: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await useFetch(`${process.env.API_BASE_URL}/users/register`, {
        method: 'POST',
        body: { name, email, password },
        credentials: 'include', // If you're using cookies for authentication
      });

      token.value = data.value.token;
      localStorage.setItem('token', token.value); // Store token in localStorage
      // Optionally, decode token to get user info or fetch user profile
    } catch (err: any) {
      error.value = err.value?.data?.message || 'Signup failed';
    } finally {
      loading.value = false;
    }
  };

  // Signin
  const signin = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await useFetch(`${process.env.API_BASE_URL}/users/login`, {
        method: 'POST',
        body: { email, password },
        credentials: 'include', // If you're using cookies for authentication
      });

      token.value = data.value.token;
      localStorage.setItem('token', token.value); // Store token in localStorage
      // Optionally, decode token to get user info or fetch user profile
    } catch (err: any) {
      error.value = err.value?.data?.message || 'Signin failed';
    } finally {
      loading.value = false;
    }
  };

  // Signout
  const signout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token'); // Clear token from storage
  };

  // Fetch User Profile
  const fetchUserProfile = async () => {
    if (!token.value) return;
    loading.value = true;
    error.value = null;
    try {
      const { data } = await useFetch(`${process.env.API_BASE_URL}/users/profile`, {
        method: 'GET',
        credentials: 'include', // If you're using cookies for authentication
      });
      user.value = data.value;
    } catch (err: any) {
      error.value = err.value?.data?.message || 'Failed to fetch profile';
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
