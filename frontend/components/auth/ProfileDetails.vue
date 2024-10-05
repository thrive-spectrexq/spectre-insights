<!-- frontend/components/auth/ProfileDetails.vue -->
<template>
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 class="text-xl mb-6">Your Profile</h2>
      
      <form @submit.prevent="handleSubmit(onSubmit)" class="space-y-4">
        
        <!-- Name Field -->
        <div>
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            id="name"
            type="text"
            v-model="values.name"
            :class="{'border-red-500': errors.name}"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Name"
          />
          <span v-if="errors.name" class="text-red-500 text-xs italic">{{ errors.name }}</span>
        </div>
        
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            id="email"
            type="email"
            v-model="values.email"
            :class="{'border-red-500': errors.email}"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="you@example.com"
          />
          <span v-if="errors.email" class="text-red-500 text-xs italic">{{ errors.email }}</span>
        </div>
        
        <!-- Password Field (Optional: For Password Changes) -->
        <div>
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">New Password</label>
          <input
            id="password"
            type="password"
            v-model="values.password"
            :class="{'border-red-500': errors.password}"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="********"
          />
          <span v-if="errors.password" class="text-red-500 text-xs italic">{{ errors.password }}</span>
        </div>
        
        <!-- Confirm Password Field (Optional: For Password Changes) -->
        <div v-if="values.password">
          <label for="confirmPassword" class="block text-gray-700 text-sm font-bold mb-2">Confirm New Password</label>
          <input
            id="confirmPassword"
            type="password"
            v-model="values.confirmPassword"
            :class="{'border-red-500': errors.confirmPassword}"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="********"
          />
          <span v-if="errors.confirmPassword" class="text-red-500 text-xs italic">{{ errors.confirmPassword }}</span>
        </div>
        
        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {{ isSubmitting ? 'Updating...' : 'Update Profile' }}
          </button>
        </div>
        
      </form>
      
      <!-- Success and Error Messages -->
      <div v-if="statusMessage" :class="statusClass" class="mt-4 p-4 rounded">
        {{ statusMessage }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useAuth } from '@sidebase/nuxt-auth'
  import { useRouter } from 'vue-router'
  import { useForm } from 'vee-validate'
  import * as yup from 'yup'
  
  // Define the validation schema using Yup
  const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').nullable(),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .when('password', {
        is: (val: string | null) => val && val.length > 0,
        then: yup.string().required('Please confirm your password'),
        otherwise: yup.string().nullable(),
      }),
  })
  
  // Initialize the form with Vee-Validate
  const { handleSubmit, errors, values, isSubmitting, resetForm } = useForm({
    validationSchema: schema,
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  
  // Access authentication composable and router
  const auth = useAuth()
  const router = useRouter()
  
  // Reactive variables for status messages
  const statusMessage = ref('')
  const statusClass = ref('')
  
  // Populate initial form values with current user data
  if (auth.user) {
    values.name = auth.user.name || ''
    values.email = auth.user.email || ''
  }
  
  // Handle form submission
  const onSubmit = async (formValues: any) => {
    try {
      // Prepare the data to update
      const updateData: any = {
        name: formValues.name,
        email: formValues.email,
      }
      
      if (formValues.password) {
        updateData.password = formValues.password
      }
      
      // Call the update profile method (assuming it's available)
      await auth.updateProfile(updateData)
      
      // Set success message
      statusMessage.value = 'Profile updated successfully!'
      statusClass.value = 'bg-green-100 text-green-700'
      
      // Optionally, reset the password fields
      if (formValues.password) {
        resetForm({
          values: {
            ...formValues,
            password: '',
            confirmPassword: '',
          },
          errors: {},
        })
      }
      
    } catch (error) {
      console.error('Error updating profile:', error)
      // Set error message
      statusMessage.value = 'Failed to update profile. Please try again.'
      statusClass.value = 'bg-red-100 text-red-700'
    }
  }
  </script>
  
  <style scoped>
  /* Optional: Add any component-specific styles here */
  
  /* Styles for the status messages */
  .bg-green-100 {
    background-color: #d1fae5;
  }
  
  .text-green-700 {
    color: #047857;
  }
  
  .bg-red-100 {
    background-color: #fee2e2;
  }
  
  .text-red-700 {
    color: #b91c1c;
  }
  </style>
  