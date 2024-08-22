<template>
  <div class="p-6 bg-gray-100 h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-md p-4 mb-4 rounded">
      <h1 class="text-2xl font-bold text-gray-800">Engineer Dashboard</h1>
    </header>

    <!-- Dashboard Content -->
    <div class="flex-1 overflow-auto">
      <div v-if="isLoading" class="text-center">Loading...</div>
      <div v-if="error" class="text-red-500 text-center">{{ error }}</div>
      <div v-if="!isLoading && !error">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Assigned Projects -->
          <div v-for="project in assignedProjects" :key="project.id" class="bg-white shadow-md rounded-lg p-4">
            <h2 class="text-xl font-semibold text-gray-700">{{ project.name }}</h2>
            <p class="mt-2 text-gray-600">Status: {{ project.status }}</p>
            <p class="mt-2 text-gray-600">Deadline: {{ project.deadline }}</p>
            <button @click="viewProjectDetails(project)" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
              View Details
            </button>
          </div>

          <!-- Additional Example Cards can be added here if needed -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EngineerDashboard',
  data() {
    return {
      assignedProjects: [],
      isLoading: true,
      error: null,
    };
  },
  methods: {
    async fetchAssignedProjects() {
      this.isLoading = true;
      try {
        const response = await axios.get('/api/engineer/projects'); // Replace with your API endpoint
        this.assignedProjects = response.data;
        this.isLoading = false;
      } catch (error) {
        this.error = 'Error fetching projects';
        this.isLoading = false;
      }
    },
    viewProjectDetails(project) {
      // Handle project details view
      alert(`Viewing details for: ${project.name}`);
      // Alternatively, navigate to a project details page
    },
  },
  mounted() {
    this.fetchAssignedProjects();
  },
};
</script>

<style scoped>
/* Scoped styling for Engineer Dashboard */
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
</style>
