<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Project Manager Dashboard</h1>
    
    <!-- Buttons to navigate between views -->
    <div class="mb-4">
      <button @click="showView('projects')" class="bg-blue-500 text-white py-2 px-4 rounded mr-2">
        View Assigned Projects
      </button>
      <button @click="showView('users')" class="bg-green-500 text-white py-2 px-4 rounded">
        View All Users
      </button>
    </div>
    
    <!-- Conditional rendering based on the current view -->
    <div v-if="currentView === 'projects'">
      <h2 class="text-xl font-semibold mb-4">Assigned Projects</h2>
      <button @click="editProject({})" class="bg-blue-500 text-white py-1 px-2 rounded mb-4">
        Add New Project
      </button>
      <ProjectForm
        v-if="showForm"
        :projectToEdit="currentProject"
        @submit-project="handleProjectSubmission"
      />
      <ul>
        <li v-for="project in projects" :key="project.id" class="mb-2">
          <div class="flex justify-between items-center p-4 bg-gray-100 rounded">
            <div>
              <h3 class="text-lg font-semibold">{{ project.name }}</h3>
              <p>{{ project.description }}</p>
            </div>
            <button @click="editProject(project)" class="bg-yellow-500 text-white py-1 px-2 rounded">
              Edit
            </button>
          </div>
        </li>
      </ul>
    </div>
    
    <div v-if="currentView === 'users'">
      <h2 class="text-xl font-semibold mb-4">All Users</h2>
      <ul>
        <li v-for="user in users" :key="user.id" class="mb-2">
          <div class="p-4 bg-gray-100 rounded">
            <h3 class="text-lg font-semibold">{{ user.name }}</h3>
            <p>{{ user.email }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProjectForm from '@/components/ProjectForm.vue';

export default {
  components: { ProjectForm },
  data() {
    return {
      projects: [],
      users: [],
      currentProject: {},
      showForm: false,
      currentView: 'projects', // Default view
    };
  },
  methods: {
    async fetchProjects() {
      try {
        const response = await axios.get('/api/projects');
        this.projects = response.data;
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get('/api/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    showView(view) {
      this.currentView = view;
      if (view === 'projects') {
        this.fetchProjects();
      } else if (view === 'users') {
        this.fetchUsers();
      }
    },
    editProject(project) {
      this.currentProject = { ...project };
      this.showForm = true;
    },
    handleProjectSubmission(project) {
      if (this.currentProject.id) {
        this.updateProject(project);
      } else {
        this.createProject(project);
      }
    },
    async createProject(project) {
      try {
        await axios.post('/api/projects', project);
        await this.fetchProjects();
        this.showForm = false;
      } catch (error) {
        console.error('Error creating project:', error);
      }
    },
    async updateProject(project) {
      try {
        await axios.put(`/api/projects/${project.id}`, project);
        await this.fetchProjects();
        this.showForm = false;
        this.currentProject = {};
      } catch (error) {
        console.error('Error updating project:', error);
      }
    },
  },
  created() {
    this.fetchProjects(); // Fetch projects by default
  },
};
</script>

<style scoped>
/* Add additional styles as needed */
</style>
