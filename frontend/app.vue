<template>
  <div>
    <Navbar />
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/common/Navbar.vue'
import Footer from '~/components/common/Footer.vue'

// Import your global styles
import '~/assets/css/tailwind.css'
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
