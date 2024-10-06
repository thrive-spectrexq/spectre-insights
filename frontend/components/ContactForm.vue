<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
      <input
        type="text"
        id="name"
        v-model="form.name"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        id="email"
        v-model="form.email"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
    <div>
      <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
      <textarea
        id="message"
        v-model="form.message"
        required
        rows="4"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      ></textarea>
    </div>
    <div>
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
      </button>
    </div>

    <!-- Notifications -->
    <Notification
      v-if="notification.visible"
      :type="notification.type"
      :message="notification.message"
      :duration="5000"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import toast from '~/plugins/toast';
import Notification from '@/components/Notification.vue';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const form = ref<ContactForm>({
  name: '',
  email: '',
  message: '',
});

const isSubmitting = ref(false);

const notification = ref<{
  visible: boolean;
  type: 'success' | 'error' | 'info';
  message: string;
}>({
  visible: false,
  type: 'success',
  message: '',
});

const toast = useToast();

const handleSubmit = async () => {
  isSubmitting.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    const response = await axios.post('/api/contact', form.value);
    successMessage.value = response.data.message;
    toast.success('Your message has been sent successfully!');
    form.value = { name: '', email: '', message: '' };
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'An error occurred. Please try again.';
    toast.error(errorMessage.value);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
