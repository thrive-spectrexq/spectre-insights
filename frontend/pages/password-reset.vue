<!-- frontend/pages/password-reset.vue -->
<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Reset Password</h2>
      <Form @submit="onSubmit">
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
        <div v-if="success" class="mb-4 text-green-500 text-sm">
          {{ success }}
        </div>
        <div v-if="error" class="mb-4 text-red-500 text-sm">
          {{ error }}
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Send Reset Link
        </button>
      </Form>
      <p class="mt-4 text-center">
        Remembered your password?
        <nuxt-link to="/login" class="text-blue-600 hover:underline">Sign In</nuxt-link>
      </p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { Form, Field, ErrorMessage } from 'vee-validate'
  import * as yup from 'yup'
  
  const router = useRouter()
  const success = ref<string | null>(null)
  const error = ref<string | null>(null)
  
  // Define validation schema using yup
  const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
  })
  
  // Handle form submission
  const onSubmit = async (values: { email: string }) => {
    success.value = null
    error.value = null
    try {
      // Adjust the API endpoint as per your backend setup
      const response = await $fetch(`${useRuntimeConfig().public.axios.apiBase}/auth/password-reset`, {
        method: 'POST',
        body: {
          email: values.email,
        },
      })
  
      if (response.message) {
        success.value = response.message
      } else {
        success.value = 'Password reset link sent to your email.'
      }
    } catch (err) {
      console.error('Password reset error:', err)
      error.value = err?.message || 'An unexpected error occurred.'
    }
  }
  </script>
  
  <style scoped>
  /* Optional: Add component-specific styles here */
  </style>
  