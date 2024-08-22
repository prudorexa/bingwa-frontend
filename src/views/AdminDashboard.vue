<template>
  <div class="p-6 bg-gray-100 h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-md p-4 mb-4 rounded flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
    </header>

    <!-- Dashboard Content -->
    <div class="flex-1 overflow-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- User Management Card -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-xl font-semibold text-gray-700">User Management</h2>
          <p class="mt-2 text-gray-600">Manage users, assign roles, and review activity logs.</p>
          <div class="mt-4">
            <a href="#" @click="showUserForm = true" class="text-blue-500 hover:underline inline-block">Add New User</a>
            <a href="#" @click="fetchUsers" class="text-blue-500 hover:underline inline-block ml-4">View Users</a>
          </div>

          <!-- User List -->
          <div v-if="users.length > 0" class="mt-4">
            <h3 class="font-semibold text-gray-700">User List</h3>
            <ul class="mt-2 space-y-2">
              <li v-for="user in users" :key="user.id" class="flex justify-between items-center p-2 border rounded hover:bg-gray-50">
                <span class="text-gray-800">{{ user.name }}</span>
                <div>
                  <button @click="editUser(user)" class="text-blue-500 hover:underline">Edit</button>
                  <button @click="deleteUser(user.id)" class="text-red-500 hover:underline ml-2">Delete</button>
                </div>
              </li>
            </ul>
          </div>

          <!-- User Form -->
          <div v-if="showUserForm" class="mt-4">
            <h3 class="font-semibold text-gray-700">Add/Edit User</h3>
            <form @submit.prevent="submitUserForm" class="mt-2">
              <div class="mt-2">
                <label class="block text-gray-600">Name</label>
                <input v-model="userForm.name" type="text" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" required />
              </div>
              <div class="mt-2">
                <label class="block text-gray-600">Email</label>
                <input v-model="userForm.email" type="email" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" required />
              </div>
              <div class="mt-2">
                <label class="block text-gray-600">Role</label>
                <select v-model="userForm.role" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" required>
                  <option value="Admin">Admin</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Engineer">Engineer</option>
                </select>
              </div>
              <div class="mt-4">
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
                <button @click="cancelUserForm" class="ml-2 text-gray-500 hover:underline">Cancel</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Project Management Card -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-xl font-semibold text-gray-700">Project Management</h2>
          <p class="mt-2 text-gray-600">Manage projects, assign them to users, and review progress.</p>
          <div class="mt-4">
            <a href="#" @click="showProjectForm = true" class="text-blue-500 hover:underline inline-block">Add New Project</a>
            <a href="#" @click="fetchProjects" class="text-blue-500 hover:underline inline-block ml-4">View Projects</a>
          </div>

          <!-- Project List -->
          <div v-if="projects.length > 0" class="mt-4">
            <h3 class="font-semibold text-gray-700">Project List</h3>
            <ul class="mt-2 space-y-2">
              <li v-for="project in projects" :key="project.id" class="flex justify-between items-center p-2 border rounded hover:bg-gray-50">
                <span class="text-gray-800">{{ project.name }}</span>
                <div>
                  <button @click="editProject(project)" class="text-blue-500 hover:underline">Edit</button>
                  <button @click="deleteProject(project.id)" class="text-red-500 hover:underline ml-2">Delete</button>
                </div>
              </li>
            </ul>
          </div>

          <!-- Project Form -->
          <div v-if="showProjectForm" class="mt-4">
            <h3 class="font-semibold text-gray-700">Add/Edit Project</h3>
            <form @submit.prevent="submitProjectForm" class="mt-2">
              <div class="mt-2">
                <label class="block text-gray-600">Name</label>
                <input v-model="projectForm.name" type="text" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" required />
              </div>
              <div class="mt-2">
                <label class="block text-gray-600">Description</label>
                <textarea v-model="projectForm.description" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" required></textarea>
              </div>
              <div class="mt-4">
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
                <button @click="cancelProjectForm" class="ml-2 text-gray-500 hover:underline">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminDashboard',
  data() {
    return {
      showUserForm: false,
      showProjectForm: false,
      users: [],
      projects: [],
      userForm: {
        name: '',
        email: '',
        role: 'Admin',
      },
      projectForm: {
        name: '',
        description: '',
      },
      editUserId: null,
      editProjectId: null,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('/api/users'); // Adjust the endpoint as needed
        this.users = response.data;
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    },
    async fetchProjects() {
      try {
        const response = await axios.get('/api/projects'); // Adjust the endpoint as needed
        this.projects = response.data;
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    },
    async submitUserForm() {
      try {
        if (this.editUserId !== null) {
          await axios.put(`/api/users/${this.editUserId}`, this.userForm); // Adjust the endpoint as needed
        } else {
          await axios.post('/api/users', this.userForm); // Adjust the endpoint as needed
        }
        this.cancelUserForm();
        this.fetchUsers(); // Refresh the user list
      } catch (error) {
        console.error('Failed to submit user form:', error);
      }
    },
    async editUser(user) {
      this.showUserForm = true;
      this.userForm.name = user.name;
      this.userForm.email = user.email;
      this.userForm.role = user.role;
      this.editUserId = user.id;
    },
    async deleteUser(userId) {
      try {
        await axios.delete(`/api/users/${userId}`); // Adjust the endpoint as needed
        this.users = this.users.filter(u => u.id !== userId);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    },
    cancelUserForm() {
      this.showUserForm = false;
      this.userForm = {
        name: '',
        email: '',
        role: 'Admin',
      };
      this.editUserId = null;
    },
    async submitProjectForm() {
      try {
        if (this.editProjectId !== null) {
          await axios.put(`/api/projects/${this.editProjectId}`, this.projectForm); // Adjust the endpoint as needed
        } else {
          await axios.post('/api/projects', this.projectForm); // Adjust the endpoint as needed
        }
        this.cancelProjectForm();
        this.fetchProjects(); // Refresh the project list
      } catch (error) {
        console.error('Failed to submit project form:', error);
      }
    },
    async editProject(project) {
      this.showProjectForm = true;
      this.projectForm.name = project.name;
      this.projectForm.description = project.description;
      this.editProjectId = project.id;
    },
    async deleteProject(projectId) {
      try {
        await axios.delete(`/api/projects/${projectId}`); // Adjust the endpoint as needed
        this.projects = this.projects.filter(p => p.id !== projectId);
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    },
    cancelProjectForm() {
      this.showProjectForm = false;
      this.projectForm = {
        name: '',
        description: '',
      };
      this.editProjectId = null;
    },
  },
  mounted() {
    this.fetchUsers();
    this.fetchProjects();
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
