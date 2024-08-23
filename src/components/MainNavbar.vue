<template>
  <nav class="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <div class="flex items-center">
          <img
            class="h-10 w-auto"
            src="src/assets/images/bingwa.png"
            alt="Bingwa Services"
          />
        </div>
        <!-- Mobile menu button -->
        <div class="flex sm:hidden">
          <button
            @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
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
            class="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            :exact-active-class="link.activeClass"
          >{{ link.name }}</router-link>

          <!-- Dropdown for Dashboards -->
          <div class="relative">
            <button @click="toggleDropdown" class="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
              Dashboards & More
              <svg class="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg">
              <router-link
                v-for="link in dashboardLinks"
                :key="link.name"
                :to="link.path"
                class="block px-4 py-2 text-sm font-medium hover:bg-gray-700"
                :exact-active-class="link.activeClass"
                @click="dropdownOpen = false"
              >{{ link.name }}</router-link>
              <router-link
                v-if="isLoggedIn"
                :to="'/profile'"
                class="block px-4 py-2 text-sm font-medium hover:bg-gray-700"
                @click="dropdownOpen = false"
              >
                Profile
              </router-link>
            </div>
          </div>

          <!-- Login and Logout links -->
          <router-link
            v-if="!isLoggedIn"
            :to="'/login'"
            class="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            @click="isOpen = false"
          >
            Login
          </router-link>
          <button
            v-if="isLoggedIn"
            @click="logout"
            class="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
    <!-- Mobile dropdown menu -->
    <div class="sm:hidden" :class="{ 'block': isOpen, 'hidden': !isOpen }">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          v-for="link in navLinks"
          :key="link.name"
          :to="link.path"
          class="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          :exact-active-class="link.activeClass"
          @click="isOpen = false"
        >{{ link.name }}</router-link>
        <div class="relative">
          <button @click="toggleDropdownMobile" class="text-white px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 w-full text-left">
            Dashboards & More
            <svg class="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="dropdownOpenMobile" class="mt-2 w-full bg-gray-800 text-white rounded-md shadow-lg">
            <router-link
              v-for="link in dashboardLinks"
              :key="link.name"
              :to="link.path"
              class="block px-4 py-2 text-sm font-medium hover:bg-gray-700"
              :exact-active-class="link.activeClass"
              @click="dropdownOpenMobile = false"
            >{{ link.name }}</router-link>
            <router-link
              v-if="!isLoggedIn"
              :to="'/login'"
              class="block px-4 py-2 text-sm font-medium hover:bg-gray-700"
              @click="dropdownOpenMobile = false"
            >
              Login
            </router-link>
            <button
              v-if="isLoggedIn"
              @click="logout"
              class="block w-full text-left px-4 py-2 text-sm font-medium hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
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
      dropdownOpen: false,
      dropdownOpenMobile: false,
      isLoggedIn: false, // Set this to true if the user is logged in
      navLinks: [
        { name: 'Home', path: '/', activeClass: 'bg-gray-700' },
        { name: 'Profile', path: '/profile', activeClass: 'bg-gray-700' }, // Replaced About with Profile
        { name: 'Lead Management', path: '/lead-management', activeClass: 'bg-gray-700' },
      ],
      dashboardLinks: [
        { name: 'Admin Dashboard', path: '/admin-dashboard', activeClass: 'bg-gray-700' },
        { name: 'Project Manager Dashboard', path: '/project-manager-dashboard', activeClass: 'bg-gray-700' },
        { name: 'Engineer Dashboard', path: '/engineer-dashboard', activeClass: 'bg-gray-700' },
        { name: 'Project Page', path: '/project-page', activeClass: 'bg-gray-700' },
      ],
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    toggleDropdownMobile() {
      this.dropdownOpenMobile = !this.dropdownOpenMobile;
    },
    logout() {
      // Implement logout functionality here
      this.isLoggedIn = false;
    }
  }
};
</script>

<style scoped>
.bg-gradient-to-r {
  background-image: linear-gradient(to right, #1f2937, #111827);
}

img {
  /* Adjust logo size and add padding if necessary */
  max-height: 40px; /* Adjust this value as needed */
  object-fit: contain; /* Ensures the logo maintains its aspect ratio */
  margin-right: 1rem; /* Adds space between logo and navigation items */
}
</style>
