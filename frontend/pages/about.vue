<!-- frontend/pages/about.vue -->
<template>
    <div class="container mx-auto py-8 px-4">
      <SectionHeader title="About Us" />
  
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">
          Welcome to Spectre Insights! We are dedicated to providing top-notch analytics and insights to help your business thrive in today's competitive market. Our team of experts leverages cutting-edge technologies and methodologies to deliver actionable data that drives growth and success.
        </p>
  
        <p class="text-lg leading-relaxed">
          Founded in 2020, Spectre Insights has rapidly grown into a trusted partner for businesses of all sizes. Our mission is to empower organizations with the information they need to make informed decisions and achieve their strategic goals.
        </p>
  
        <h2 class="text-2xl font-semibold">Our Values</h2>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Integrity:</strong> We uphold the highest standards of integrity in all of our actions.</li>
          <li><strong>Innovation:</strong> We constantly seek innovative solutions to complex challenges.</li>
          <li><strong>Excellence:</strong> We strive for excellence in everything we do.</li>
        </ul>
  
        <h2 class="text-2xl font-semibold">Our Team</h2>
        <p class="text-lg leading-relaxed">
          Our diverse team brings together professionals from various backgrounds, each contributing unique skills and perspectives. This collaborative environment fosters creativity and ensures that we deliver comprehensive solutions tailored to our clients' needs.
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import SectionHeader from '~/components/common/SectionHeader.vue'
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
  