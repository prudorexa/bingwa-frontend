<template>
  <div>
    <!-- Project Form Component -->
    <ProjectForm
      v-if="showForm"
      :projectToEdit="currentProject"
      @submit-project="handleProjectSubmission"
    />

    <!-- Project List -->
    <div v-if="!showForm">
      <h2 class="text-2xl font-bold mb-4">Projects</h2>
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
  </div>
</template>

<script>
import axios from 'axios'; // Import axios
import ProjectForm from './ProjectForm.vue';

export default {
  components: { ProjectForm },
  data() {
    return {
      projects: [], // List of projects
      currentProject: {},
      showForm: false,
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
    editProject(project) {
      this.currentProject = { ...project };
      this.showForm = true;
    },
    handleProjectSubmission(project) {
      if (this.currentProject.id) {
        // Update existing project
        this.updateProject(project);
      } else {
        // Create new project
        this.createProject(project);
      }
    },
    async createProject(project) {
      try {
        await axios.post('/api/projects', project);
        this.fetchProjects();
        this.showForm = false;
      } catch (error) {
        console.error('Error creating project:', error);
      }
    },
    async updateProject(project) {
      try {
        await axios.put(`/api/projects/${project.id}`, project);
        this.fetchProjects();
        this.showForm = false;
        this.currentProject = {};
      } catch (error) {
        console.error('Error updating project:', error);
      }
    },
  },
  mounted() {
    this.fetchProjects();
  },
};
</script>

<style scoped>
/* Add additional styles as needed */
</style>
