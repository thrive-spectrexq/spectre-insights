<!-- components/common/SectionHeader.vue -->
<template>
  <div class="text-center my-8">
    <h2 class="text-3xl font-bold">{{ title }}</h2>
    <p v-if="subtitle" class="mt-2 text-gray-600">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
  title: string;
  subtitle?: string;
}

const props = defineProps<Props>();
</script>

<style scoped>
/* Add any scoped styles for the section header here */
</style>
