<template>
  <div>
    <HeroSection />
    <ServicesOverview />
    <Testimonials />
    <LatestBlogPosts />
    <CTASection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from '~/components/HeroSection.vue';
import ServicesOverview from '~/components/ServicesOverview.vue';
import Testimonials from '~/components/Testimonials.vue';
import LatestBlogPosts from '~/components/LatestBlogPosts.vue';
import CTASection from '~/components/CTASection.vue';
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
