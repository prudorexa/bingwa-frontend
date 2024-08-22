<template>
  <div class="flex flex-col justify-center items-center h-screen bg-gray-100 p-6">
    <!-- About Section -->
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
      <p class="text-lg text-gray-700">
        Welcome to our company! We are dedicated to providing the best services to our clients.
        Our team of experts is committed to excellence and innovation in everything we do. With
        years of experience in the industry, we pride ourselves on delivering top-notch solutions
        that meet your needs. Thank you for choosing us.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
};
</script>

<style scoped>
/* Scoped styling for About page */
.bg-gray-100 {
  background-color: #f7fafc;
}
.bg-white {
  background-color: #ffffff;
}
.text-gray-800 {
  color: #2d3748;
}
.text-gray-700 {
  color: #4a5568;
}
</style>
