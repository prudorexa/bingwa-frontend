<template>
  <footer class="bg-gray-800 text-white py-6">
    <div class="container mx-auto px-4 md:px-8">
      <div class="flex flex-wrap justify-between">
        <!-- Company Information -->
        <div class="w-full md:w-1/3 mb-6 md:mb-0">
          <h2 class="text-lg font-semibold mb-4 border-b-2 border-gray-600 pb-2">Bingwa Services</h2>
          <p class="text-sm mb-4">Your trusted partner in project management and customer relations.</p>
          <p class="text-sm">Address: 123 Main Street, Nairobi, Kenya</p>
        </div>

        <!-- Services and Contact -->
        <div class="w-full md:w-2/3 flex flex-wrap md:justify-between">
          <!-- Services -->
          <div class="w-full md:w-1/2 mb-6 md:mb-0">
            <h2 class="text-lg font-semibold mb-4 border-b-2 border-gray-600 pb-2">Services</h2>
            <ul class="list-none">
              <li><a href="#projects" class="text-sm hover:underline">Project Management</a></li>
              <li><a href="#crm" class="text-sm hover:underline">Customer Relationship Management</a></li>
              <li><a href="#contact" class="text-sm hover:underline">Contact Us</a></li>
            </ul>
          </div>

          <!-- Contact Information -->
          <div class="w-full md:w-1/2">
            <h2 class="text-lg font-semibold mb-4 border-b-2 border-gray-600 pb-2">Contact</h2>
            <p class="text-sm mb-4">
              <a href="tel:+254700000000" class="hover:underline">Phone: +254 700 000 000</a>
            </p>
            <p class="text-sm">
              <a href="mailto:support@bingwaservices.com" class="hover:underline">Email: support@bingwaservices.com</a>
            </p>
          </div>
        </div>
      </div>

      <!-- Social Media -->
      <div class="w-full mt-6 border-t-2 border-gray-600 pt-6">
        <h2 class="text-lg font-semibold mb-4">Follow Us</h2>
        <div class="flex justify-center space-x-4">
          <a href="https://facebook.com" target="_blank" class="text-white hover:text-gray-400">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12.07v-0.09c0-5.27-4.13-9.61-9.61-9.61S2.78 6.71 2.78 12c0 4.53 2.88 8.45 6.85 9.84v-6.98H6.69v-2.86h2.94v-2.12c0-2.91 1.74-4.5 4.36-4.5 1.26 0 2.33 0.09 2.65 0.13v3.07h-1.82c-1.43 0-1.71 0.68-1.71 1.68v2.21h3.42l-0.45 2.86h-2.97v6.98c4.5-1.46 7.77-5.42 7.77-9.92z"/>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" class="text-white hover:text-gray-400">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.69 10.69 0 0 1-3.11.85 4.68 4.68 0 0 0 2.04-2.59c-.87.52-1.82.89-2.84 1.09a4.63 4.63 0 0 0-7.88 4.22A13.15 13.15 0 0 1 1.6 2.13a4.63 4.63 0 0 0 1.43 6.15c-.8-.03-1.55-.24-2.21-.58v.06a4.64 4.64 0 0 0 3.71 4.54 4.64 4.64 0 0 1-2.09.08 4.64 4.64 0 0 0 4.32 3.21A9.32 9.32 0 0 1 0 19.25a13.14 13.14 0 0 0 7.1 2.09c8.54 0 13.21-7.09 13.21-13.21 0-.2 0-.4-.02-.6A9.51 9.51 0 0 0 23 3z"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" class="text-white hover:text-gray-400">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.225 0h-20.451c-1.005 0-1.792.787-1.792 1.792v20.451c0 1.005.787 1.792 1.792 1.792h20.451c1.005 0 1.792-.787 1.792-1.792v-20.451c0-1.005-.787-1.792-1.792-1.792zm-14.075 20.451h-3.865v-12.877h3.865v12.877zm-1.932-14.709c-1.24 0-2.25-1.01-2.25-2.25s1.01-2.25 2.25-2.25 2.25 1.01 2.25 2.25-1.01 2.25-2.25 2.25zm14.075 14.709h-3.865v-6.85c0-1.69-.615-2.85-1.87-2.85-1.017 0-1.62.68-1.88 1.33-.097.232-.12.55-.12.87v7.5h-3.865v-12.877h3.865v1.74c.577-.85 1.52-1.73 3.05-1.73 2.229 0 3.88 1.48 3.88 4.7v8.17z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter'
};
</script>

<style scoped>
/* Tailwind CSS classes are used directly in the template, so no additional CSS needed here */
</style>
