<!-- frontend/pages/contact.vue -->
<template>
  <div class="container mx-auto py-8 px-4 max-w-lg">
    <SectionHeader title="Contact Us" />

    <ContactForm />
  </div>
</template>

<script setup lang="ts">
import SectionHeader from '~/components/common/SectionHeader.vue'
import ContactForm from '~/components/public/ContactForm.vue'
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
