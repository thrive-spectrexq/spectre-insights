<!-- components/common/SearchBar.vue -->
<template>
    <div class="flex justify-center">
      <input
        type="text"
        v-model="searchInput"
        @keyup.enter="onSearch"
        placeholder="Search blog posts..."
        class="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        @click="onSearch"
        class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, defineEmits, defineProps } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
  });
  
  const emit = defineEmits(['update:modelValue', 'search']);
  
  const searchInput = ref<string>(props.modelValue);
  
  // Watch for changes in the parent component and update the input accordingly
  watch(
    () => props.modelValue,
    (newVal) => {
      searchInput.value = newVal;
    }
  );
  
  // Emit updates to the parent component
  watch(searchInput, (newVal) => {
    emit('update:modelValue', newVal);
  });
  
  // Handle search action
  const onSearch = () => {
    emit('search');
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles for the search bar here */
  </style>
  