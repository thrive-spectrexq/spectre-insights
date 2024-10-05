<!-- frontend/pages/about.vue -->
<template>
  <div>
    <SectionHeader title="About Us" />
    <p>Learn more about Spectre Insights, our mission, values, and the team dedicated to providing top-notch analytics and insights.</p>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import SectionHeader from '~/components/common/SectionHeader.vue'

useHead({
  title: 'About Us - Spectre Insights',
  meta: [
    {
      name: 'description',
      content: 'Learn more about Spectre Insights, our mission, values, and the team dedicated to providing top-notch analytics and insights.',
    },
    {
      property: 'og:title',
      content: 'About Us - Spectre Insights',
    },
    {
      property: 'og:description',
      content: 'Learn more about Spectre Insights, our mission, values, and the team dedicated to providing top-notch analytics and insights.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'http://localhost:3000/about',
    },
  ],
})
</script>
