// frontend/stores/user.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

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

  // Signup
  const signup = async (name: string, email: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post(`${process.env.API_BASE_URL}/users/register`, {
        name,
        email,
        password,
      });
      token.value = response.data.token;
      // Optionally, decode token to get user info or fetch user profile
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Signup failed';
    } finally {
      loading.value = false;
    }
  };

  // Signin
  const signin = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post(`${process.env.API_BASE_URL}/users/login`, {
        email,
        password,
      });
      token.value = response.data.token;
      // Optionally, decode token to get user info or fetch user profile
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Signin failed';
    } finally {
      loading.value = false;
    }
  };

  // Signout
  const signout = () => {
    user.value = null;
    token.value = null;
    // Optionally, clear tokens from storage
  };

  // Fetch User Profile
  const fetchUserProfile = async () => {
    if (!token.value) return;
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${process.env.API_BASE_URL}/users/profile`);
      user.value = response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch profile';
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

