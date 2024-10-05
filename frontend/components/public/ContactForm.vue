<!-- frontend/components/public/ContactForm.vue -->
<template>
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 class="text-2xl font-bold mb-6">Contact Us</h2>
  
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
        
        <!-- Subject Field -->
        <div>
          <label for="subject" class="block text-gray-700 text-sm font-bold mb-2">Subject</label>
          <input
            id="subject"
            type="text"
            v-model="values.subject"
            :class="{'border-red-500': errors.subject}"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Subject"
          />
          <span v-if="errors.subject" class="text-red-500 text-xs italic">{{ errors.subject }}</span>
        </div>
        
        <!-- Message Field -->
        <div>
          <label for="message" class="block text-gray-700 text-sm font-bold mb-2">Message</label>
          <textarea
            id="message"
            v-model="values.message"
            :class="{'border-red-500': errors.message}"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
            placeholder="Your message..."
          ></textarea>
          <span v-if="errors.message" class="text-red-500 text-xs italic">{{ errors.message }}</span>
        </div>
        
        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
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
  import { useForm } from 'vee-validate'
  import * as yup from 'yup'
  
  // Define the validation schema using Yup
  const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    subject: yup.string().required('Subject is required'),
    message: yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
  })
  
  // Initialize the form with Vee-Validate
  const { handleSubmit, errors, values, isSubmitting, resetForm } = useForm({
    validationSchema: schema,
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })
  
  // Reactive variables for status messages
  const statusMessage = ref('')
  const statusClass = ref('')
  
  // Handle form submission
  const onSubmit = async (formValues: any) => {
    try {
      // Make an API call to submit the contact form
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      })
  
      if (!response.ok) {
        throw new Error('Failed to send message.')
      }
  
      const data = await response.json()
  
      // Set success message
      statusMessage.value = 'Your message has been sent successfully!'
      statusClass.value = 'bg-green-100 text-green-700'
  
      // Reset the form fields
      resetForm()
    } catch (error) {
      console.error('Error submitting contact form:', error)
      // Set error message
      statusMessage.value = 'Failed to send your message. Please try again later.'
      statusClass.value = 'bg-red-100 text-red-700'
    }
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
  }
  
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
  