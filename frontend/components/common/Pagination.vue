<!-- components/common/Pagination.vue -->
<template>
  <div class="flex justify-center mt-8">
    <nav aria-label="Page navigation">
      <ul class="inline-flex items-center -space-x-px">
        <li>
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
        </li>
        <li v-for="page in pages" :key="page">
          <button
            @click="goToPage(page)"
            :class="[ 
              'px-3 py-2 leading-tight border',
              page === currentPage
                ? 'text-blue-600 bg-blue-50 border-blue-300'
                : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700',
            ]"
          >
            {{ page }}
          </button>
        </li>
        <li>
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'; // Ensure this import remains

// No need to import defineProps or defineEmits anymore
const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits(['pageChange']);

// Generate an array of page numbers for display
const pages = computed(() => {
  const pagesArray = [];
  for (let i = 1; i <= props.totalPages; i++) {
    pagesArray.push(i);
  }
  return pagesArray;
});

// Navigate to a specific page
const goToPage = (page: number) => {
  if (page < 1 || page > props.totalPages) return;
  emit('pageChange', page);
};
</script>

<style scoped>
/* Add any scoped styles for the pagination here */
</style>
>
