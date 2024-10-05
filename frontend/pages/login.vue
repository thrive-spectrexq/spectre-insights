<!-- frontend/pages/login.vue -->
<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Sign In</h2>
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
        <div class="mb-4">
          <nuxt-link to="/password-reset" class="text-blue-600 hover:underline text-sm">
            Forgot your password?
          </nuxt-link>
        </div>
        <div v-if="error" class="mb-4 text-red-500 text-sm">
          {{ error }}
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
      </Form>
      <p class="mt-4 text-center">
        Don't have an account?
        <nuxt-link to="/signup" class="text-blue-600 hover:underline">Sign Up</nuxt-link>
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
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  
  // Handle form submission
  const onSubmit = async (values: { email: string; password: string }) => {
    error.value = null
    try {
      const response = await auth.signIn('credentials', {
        email: values.email,
        password: values.password,
      })
  
      if (response && response.user) {
        userStore.setUser(response.user)
        router.push('/profile')
      } else {
        error.value = 'Invalid email or password.'
      }
    } catch (err) {
      console.error('Signin error:', err)
      error.value = err?.message || 'An unexpected error occurred.'
    }
  }
  </script>
  
  <style scoped>
  /* Optional: Add component-specific styles here */
  </style>
  