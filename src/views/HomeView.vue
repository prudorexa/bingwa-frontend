<template>
  <div class="flex flex-col justify-center items-center h-screen bg-gray-100 p-6">
    <!-- Main Title and Description -->
    <h1 class="text-4xl font-bold text-gray-800 mb-4">Welcome to Bingwa Services</h1>
    <p class="text-lg text-gray-600 mb-4">We provide top-notch services to help you achieve your goals.</p>
    
    <!-- Logo -->
    <img src="../assets/logo.png" alt="Bingwa Services Logo" class="w-48 h-48 mb-6">

    <!-- Mission and Vision Sections -->
    <div class="flex flex-col md:flex-row justify-center items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
      <div class="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 xl:w-1/3">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Our Mission</h2>
        <p class="text-lg text-gray-700">To provide exceptional services that exceed our clients' expectations.</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 xl:w-1/3">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Our Vision</h2>
        <p class="text-lg text-gray-700">To be the leading service provider in the industry.</p>
      </div>
    </div>

    <!-- Call to Action Button -->
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
      Learn More
    </button>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
/* Scoped styling to add custom styles if needed */
.bg-gray-100 {
  background-color: #f7fafc;
}
.bg-white {
  background-color: #ffffff;
}
.text-gray-800 {
  color: #2d3748;
}
.text-gray-600 {
  color: #718096;
}
.text-gray-700 {
  color: #4a5568;
}
</style>
