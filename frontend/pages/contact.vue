<!-- frontend/pages/contact.vue -->
<template>
    <div class="container mx-auto py-8 px-4">
      <SectionHeader title="Contact Us" />
  
      <div class="flex flex-col lg:flex-row lg:space-x-8">
        <!-- Contact Information -->
        <div class="lg:w-1/2 space-y-4">
          <h2 class="text-2xl font-semibold">Get in Touch</h2>
          <p class="text-lg leading-relaxed">
            We'd love to hear from you! Whether you have a question about our services, need assistance, or just want to share your feedback, feel free to reach out.
          </p>
  
          <div class="space-y-2">
            <p><strong>Email:</strong> <a href="mailto:info@spectreinsights.com" class="text-blue-500 hover:underline">info@spectreinsights.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+1234567890" class="text-blue-500 hover:underline">+1 (234) 567-890</a></p>
            <p><strong>Address:</strong> 1234 Market Street, Suite 100, City, State, ZIP</p>
          </div>
  
          <div class="space-y-2">
            <p><strong>Business Hours:</strong></p>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
  
        <!-- Contact Form -->
        <div class="lg:w-1/2 mt-8 lg:mt-0">
          <ContactForm />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import SectionHeader from '~/components/common/SectionHeader.vue'
  import ContactForm from '~/components/public/ContactForm.vue'
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
  