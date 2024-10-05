<!-- frontend/pages/signup.vue -->
<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <Form @submit="onSubmit">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="name">Name</label>
          <Field
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            class="w-full px-3 py-2 border rounded"
          />
          <ErrorMessage name="name" class="text-red-500 text-sm mt-1" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="email">Email</label>
          <Field
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            class="w-full px-3 py-2 border rounded"
          />
          <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 mb-2" for="password">Password</label>
          <Field
            id="password"
            name="password"
            type="password"
            placeholder="********"
            class="w-full px-3 py-2 border rounded"
          />
          <ErrorMessage name="password" class="text-red-500 text-sm mt-1" />
        </div>
        <div v-if="error" class="mb-4 text-red-500 text-sm">
          {{ error }}
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </button>
      </Form>
      <p class="mt-4 text-center">
        Already have an account?
        <nuxt-link to="/login" class="text-blue-600 hover:underline">Sign In</nuxt-link>
      </p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuth } from '@sidebase/nuxt-auth'
  import { useUserStore } from '~/stores/user'
  import { Form, Field, ErrorMessage } from 'vee-validate'
  import * as yup from 'yup'
  
  const router = useRouter()
  const auth = useAuth()
  const userStore = useUserStore()
  
  const error = ref<string | null>(null)
  
  // Define validation schema using yup
  const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  })
  
  // Handle form submission
  const onSubmit = async (values: { name: string; email: string; password: string }) => {
    error.value = null
    try {
      // Adjust the API endpoint as per your backend setup
      const response = await $fetch(`${useRuntimeConfig().public.axios.apiBase}/auth/signup`, {
        method: 'POST',
        body: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      })
  
      if (response.user) {
        // Automatically sign in the user after signup
        await auth.signIn('credentials', {
          email: values.email,
          password: values.password,
        })
        userStore.setUser(response.user)
        router.push('/profile')
      } else {
        error.value = 'Signup failed. Please try again.'
      }
    } catch (err) {
      console.error('Signup error:', err)
      error.value = err?.message || 'An unexpected error occurred.'
    }
  }
  </script>
  
  <style scoped>
  /* Optional: Add component-specific styles here */
  </style>
  