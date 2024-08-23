<template>
    <div class="flex h-screen bg-gray-100">
      <aside class="w-64 bg-gray-800 text-white">
        <div class="p-6">
          <h2 class="text-3xl font-bold">Project Management</h2>
        </div>
        <nav>
          <ul>
            <li>
              <router-link to="/projects" class="block px-4 py-2 hover:bg-gray-700">Projects</router-link>
            </li>
            <li>
              <router-link to="/tasks" class="block px-4 py-2 hover:bg-gray-700">Tasks</router-link>
            </li>
            <li>
              <router-link to="/team" class="block px-4 py-2 hover:bg-gray-700">Team</router-link>
            </li>
            <li>
              <router-link to="/reports" class="block px-4 py-2 hover:bg-gray-700">Reports</router-link>
            </li>
          </ul>
        </nav>
      </aside>
  
      <div class="flex-1 p-6">
        <div class="bg-white shadow-md rounded-lg p-6">
          <h1 class="text-2xl font-bold mb-4">Projects</h1>
          <p class="text-gray-600">Manage your projects here.</p>
  
          <!-- Loading and Error States -->
          <div v-if="isLoading" class="text-center">Loading...</div>
          <div v-if="error" class="text-red-500">{{ error }}</div>
  
          <!-- Projects List -->
          <div v-if="!isLoading && !error" class="mt-6">
            <h2 class="text-xl font-semibold mb-4">Project List</h2>
            <table class="min-w-full bg-white">
              <thead>
                <tr>
                  <th class="py-2 px-4 bg-gray-200">Project Name</th>
                  <th class="py-2 px-4 bg-gray-200">Status</th>
                  <th class="py-2 px-4 bg-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="project in projects" :key="project.id" class="text-center">
                  <td class="py-2 px-4">{{ project.name }}</td>
                  <td class="py-2 px-4">{{ project.status }}</td>
                  <td class="py-2 px-4">
                    <button @click="editProject(project)" class="bg-blue-500 text-white py-1 px-2 rounded">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ProjectsPage',
    data() {
      return {
        projects: [],
        isLoading: true,
        error: null,
      };
    },
    methods: {
      async fetchProjects() {
        this.isLoading = true;
        try {
          const response = await axios.get('/api/projects');
          this.projects = response.data;
          this.isLoading = false;
        } catch (error) {
          this.error = 'Error fetching projects';
          this.isLoading = false;
        }
      },
      async editProject(project) {
        const newProjectName = prompt('Edit Project Name:', project.name);
        if (newProjectName) {
          try {
            await axios.put(`/api/projects/${project.id}`, { name: newProjectName });
            this.fetchProjects();
            alert('Project updated successfully!');
          } catch (error) {
            console.error('Error updating project:', error);
            this.error = 'Failed to update the project';
          }
        }
      },
    },
    mounted() {
      this.fetchProjects();
    },
  };
  </script>
  
  <style scoped>
  /* Optional: Add additional styling as needed */
  </style>
  