<!-- frontend/pages/password-reset/[token].vue -->
<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Set New Password</h2>
      <Form @submit="onSubmit">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="password">New Password</label>
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
          <label class="block text-gray-700 mb-2" for="confirmPassword">Confirm New Password</label>
          <Field
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="********"
            class="w-full px-3 py-2 border rounded"
          />
          <ErrorMessage name="confirmPassword" class="text-red-500 text-sm mt-1" />
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
          Reset Password
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
  import { useRoute, useRouter } from 'vue-router'
  import { Form, Field, ErrorMessage } from 'vee-validate'
  import * as yup from 'yup'
  
  const route = useRoute()
  const router = useRouter()
  const success = ref<string | null>(null)
  const error = ref<string | null>(null)
  
  const token = route.params.token as string
  
  // Define validation schema using yup
  const schema = yup.object({
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
  })
  
  // Handle form submission
  const onSubmit = async (values: { password: string; confirmPassword: string }) => {
    success.value = null
    error.value = null
    try {
      // Adjust the API endpoint as per your backend setup
      const response = await $fetch(`${useRuntimeConfig().public.axios.apiBase}/auth/password-reset/${token}`, {
        method: 'POST',
        body: {
          password: values.password,
        },
      })
  
      if (response.message) {
        success.value = response.message
        // Optionally redirect to login after successful reset
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      } else {
        success.value = 'Password has been reset successfully.'
        setTimeout(() => {
          router.push('/login')
        }, 3000)
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
  