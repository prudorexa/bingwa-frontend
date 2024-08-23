<template>
    <div class="p-6 bg-gray-100 min-h-screen">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Project Management</h1>
      <div class="bg-white shadow-md rounded-lg p-6 mb-6">
        <project-form
          :projectToEdit="projectToEdit"
          @submit-project="handleProjectSubmission"
        />
      </div>
      <div class="bg-white shadow-md rounded-lg p-6">
        <project-list
          :projects="projects"
          @edit-project="handleProjectEdit"
        />
      </div>
    </div>
  </template>
  
  <script>
  import ProjectForm from "@/components/ProjectForm.vue";
  import ProjectList from "@/components/ProjectList.vue"; // Verify this path
  
  import axios from "axios";
  
  export default {
    name: "ProjectPage",
    components: {
      ProjectForm,
      ProjectList,
    },
    data() {
      return {
        projects: [],
        projectToEdit: {},
      };
    },
    methods: {
      async fetchProjects() {
        try {
          const response = await axios.get("/api/projects");
          this.projects = response.data;
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      },
      handleProjectSubmission(project) {
        if (this.projectToEdit.id) {
          this.updateProject(project);
        } else {
          this.createProject(project);
        }
      },
      async createProject(project) {
        try {
          const response = await axios.post("/api/projects", project);
          this.projects.push(response.data);
          this.resetForm();
        } catch (error) {
          console.error("Error creating project:", error);
        }
      },
      async updateProject(project) {
        try {
          await axios.put(`/api/projects/${this.projectToEdit.id}`, project);
          this.fetchProjects();
          this.resetForm();
        } catch (error) {
          console.error("Error updating project:", error);
        }
      },
      handleProjectEdit(project) {
        this.projectToEdit = project;
      },
      resetForm() {
        this.projectToEdit = {};
      },
    },
    mounted() {
      this.fetchProjects();
    },
  };
  </script>
  
  <style scoped>
  /* Tailwind CSS classes are used directly in the template, so no additional CSS needed here */
  </style>
  