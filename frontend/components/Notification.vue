<template>
  <div v-if="visible" :class="notificationClasses" @click="handleDismiss">
    <span>{{ message }}</span>
    <button class="ml-4 text-white" @click="handleDismiss">&times;</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, onMounted } from 'vue';

const props = defineProps<{
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
}>();

const visible = ref(true);
const notificationClasses = ref('');

// Watch for changes in the notification type
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

// Handle auto-dismissal of the notification
const handleDismiss = () => {
  visible.value = false;
};

onMounted(() => {
  if (props.duration) {
    setTimeout(() => {
      visible.value = false;
    }, props.duration);
  }
});
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
