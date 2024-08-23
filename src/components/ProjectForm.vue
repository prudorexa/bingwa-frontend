<template>
    <div>
      <h2>{{ isEdit ? "Edit Project" : "Add Project" }}</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="name">Project Name:</label>
          <input
            type="text"
            v-model="project.name"
            :class="{'border-red-500': errors.name}"
          />
          <p v-if="errors.name" class="text-red-500">{{ errors.name }}</p>
        </div>
  
        <div>
          <label for="description">Description:</label>
          <textarea
            v-model="project.description"
            :class="{'border-red-500': errors.description}"
          ></textarea>
          <p v-if="errors.description" class="text-red-500">{{ errors.description }}</p>
        </div>
  
        <button type="submit" class="bg-blue-500 text-white py-1 px-3 rounded">
          {{ isEdit ? "Update Project" : "Create Project" }}
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProjectForm",
    props: {
      projectToEdit: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        project: {
          name: "",
          description: "",
        },
        errors: {},
        isEdit: false,
      };
    },
    methods: {
      handleSubmit() {
        this.errors = this.validateForm();
        if (Object.keys(this.errors).length === 0) {
          this.$emit("submit-project", this.project);
        }
      },
      validateForm() {
        let errors = {};
        if (!this.project.name) errors.name = "Project Name is required";
        if (!this.project.description) errors.description = "Description is required";
        return errors;
      },
    },
    watch: {
      projectToEdit(newProject) {
        this.project = { ...newProject };
        this.isEdit = !!newProject.id;
      },
    },
    mounted() {
      if (this.projectToEdit.id) {
        this.project = { ...this.projectToEdit };
        this.isEdit = true;
      }
    },
  };
  </script>
  
  <style scoped>
  /* Add additional styles as needed */
  </style>
  