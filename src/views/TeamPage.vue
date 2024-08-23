<template>
    <div class="flex h-screen bg-gray-100">
      <aside class="w-64 bg-gray-800 text-white">
        <div class="p-6">
          <h2 class="text-3xl font-bold">Team Management</h2>
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
          <h1 class="text-2xl font-bold mb-4">Team</h1>
          <p class="text-gray-600">Manage your team members here.</p>
  
          <!-- Loading and Error States -->
          <div v-if="isLoading" class="text-center">Loading...</div>
          <div v-if="error" class="text-red-500">{{ error }}</div>
  
          <!-- Team List -->
          <div v-if="!isLoading && !error" class="mt-6">
            <h2 class="text-xl font-semibold mb-4">Team Members</h2>
            <table class="min-w-full bg-white">
              <thead>
                <tr>
                  <th class="py-2 px-4 bg-gray-200">Name</th>
                  <th class="py-2 px-4 bg-gray-200">Role</th>
                  <th class="py-2 px-4 bg-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="member in teamMembers" :key="member.id" class="text-center">
                  <td class="py-2 px-4">{{ member.name }}</td>
                  <td class="py-2 px-4">{{ member.role }}</td>
                  <td class="py-2 px-4">
                    <button @click="editMember(member)" class="bg-blue-500 text-white py-1 px-2 rounded">Edit</button>
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
    name: 'TeamPage',
    data() {
      return {
        teamMembers: [],
        isLoading: true,
        error: null,
      };
    },
    methods: {
      async fetchTeamMembers() {
        this.isLoading = true;
        try {
          const response = await axios.get('/api/team-members');
          this.teamMembers = response.data;
          this.isLoading = false;
        } catch (error) {
          this.error = 'Error fetching team members';
          this.isLoading = false;
        }
      },
      async editMember(member) {
        const newName = prompt('Edit Member Name:', member.name);
        if (newName) {
          try {
            await axios.put(`/api/team-members/${member.id}`, { name: newName });
            this.fetchTeamMembers();
            alert('Member updated successfully!');
          } catch (error) {
            console.error('Error updating member:', error);
            this.error = 'Failed to update the member';
          }
        }
      },
    },
    mounted() {
      this.fetchTeamMembers();
    },
  };
  </script>
  
  <style scoped>
  /* Optional: Add additional styling as needed */
  </style>
  