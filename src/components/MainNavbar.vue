<template>
  <nav class="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <img
            class="h-8 w-auto"
            src="https://via.placeholder.com/150x50.png?text=Bingwa+Services"
            alt="Bingwa Services"
          />
        </div>
        <!-- Mobile menu button -->
        <div class="flex sm:hidden">
          <button
            @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                :class="{ 'hidden': isOpen, 'inline-flex': !isOpen }"
                class="inline-flex"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
              <path
                :class="{ 'hidden': !isOpen, 'inline-flex': isOpen }"
                class="hidden"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <!-- Desktop menu -->
        <div class="hidden sm:flex sm:items-center sm:space-x-4">
          <router-link
            v-for="link in navLinks"
            :key="link.name"
            :to="link.path"
            class="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            :exact-active-class="link.activeClass"
          >{{ link.name }}</router-link>
        </div>
      </div>
    </div>
    <!-- Mobile dropdown menu -->
    <div
      class="sm:hidden"
      :class="{ 'block': isOpen, 'hidden': !isOpen }"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          v-for="link in navLinks"
          :key="link.name"
          :to="link.path"
          class="text-white hover:bg-blue-500 block px-3 py-2 rounded-md text-base font-medium"
          :exact-active-class="link.activeClass"
        >{{ link.name }}</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MainNavbar',
  data() {
    return {
      isOpen: false,
      navLinks: [
        { name: 'Home', path: '/', activeClass: 'bg-blue-700' },
        { name: 'About', path: '/about', activeClass: 'bg-blue-700' },
        { name: 'Login', path: '/login', activeClass: 'bg-blue-700' },
        {
          name: 'Lead Management',
          path: '/lead-management',
          activeClass: 'bg-blue-700',
        },
        {
          name: 'Project Page',
          path: '/project-page',
          activeClass: 'bg-blue-700',
        },
        {
          name: 'Admin Dashboard',
          path: '/admin-dashboard',
          activeClass: 'bg-blue-700',
        },
        {
          name: 'Project Manager Dashboard',
          path: '/project-manager-dashboard',
          activeClass: 'bg-blue-700',
        },
        {
          name: 'Engineer Dashboard',
          path: '/engineer-dashboard',
          activeClass: 'bg-blue-700',
        },
        { name: 'Profile', path: '/profile', activeClass: 'bg-blue-700' }, // Added Profile link
      ],
    };
  },
};
</script>

<style scoped>
.bg-gradient-to-r {
  background-image: linear-gradient(to right, #3b82f6, #1d4ed8);
}
</style>
