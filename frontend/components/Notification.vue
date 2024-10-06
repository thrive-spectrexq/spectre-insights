<template>
    <div v-if="visible" :class="notificationClasses" @click="visible = false">
      <span>{{ message }}</span>
      <button class="ml-4 text-white" @click="visible = false">
        &times;
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, defineProps } from 'vue';
  
  const props = defineProps<{
    type: 'success' | 'error' | 'info';
    message: string;
    duration?: number;
  }>();
  
  const visible = ref(true);
  
  const notificationClasses = ref('');
  
  watch(
    () => props.type,
    (newType) => {
      switch (newType) {
        case 'success':
          notificationClasses.value = 'bg-green-500 text-white px-4 py-2 rounded-md flex items-center';
          break;
        case 'error':
          notificationClasses.value = 'bg-red-500 text-white px-4 py-2 rounded-md flex items-center';
          break;
        case 'info':
          notificationClasses.value = 'bg-blue-500 text-white px-4 py-2 rounded-md flex items-center';
          break;
        default:
          notificationClasses.value = 'bg-gray-500 text-white px-4 py-2 rounded-md flex items-center';
      }
    },
    { immediate: true }
  );
  
  if (props.duration) {
    setTimeout(() => {
      visible.value = false;
    }, props.duration);
  }
  </script>
  
  <style scoped>
  /* Add any additional styles if necessary */
  </style>
  