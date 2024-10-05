<!-- frontend/components/auth/LoginForm.vue -->
<template>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium">Email</label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          required
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
        <ErrorMessage name="email" />
      </div>
  
      <div>
        <label for="password" class="block text-sm font-medium">Password</label>
        <input
          v-model="form.password"
          type="password"
          id="password"
          required
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
        <ErrorMessage name="password" />
      </div>
  
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  //import { useAuth } from '@sidebase/nuxt-auth'
  import { useRouter } from 'vue-router'
  import { useForm, useField, ErrorMessage } from 'vee-validate'
  import * as yup from 'yup'
  
  const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  
  const { handleSubmit } = useForm({
    validationSchema: schema,
  })
  
  //const auth = useAuth()
  const router = useRouter()
  
  const form = ref({
    email: '',
    password: '',
  })
  
  const handleLogin = handleSubmit(async () => {
    try {
      await auth.signin({
        email: form.value.email,
        password: form.value.password,
      })
      router.push('/auth/profile')
    } catch (error) {
      console.error('Login error:', error)
      // Optionally, display an error notification
    }
  })
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
  