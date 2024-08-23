<template>
  <div>
    <!-- Button to toggle form visibility -->
    <button @click="toggleForm" class="bg-blue-500 text-white py-1 px-3 rounded mb-4">
      {{ isEdit ? "Edit Project" : "Add Project" }}
    </button>

    <!-- Conditionally render the form -->
    <div v-if="showForm">
      <h2>{{ isEdit ? "Edit Project" : "Add Project" }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="name">Project Name:</label>
          <input
            type="text"
            id="name"
            v-model="project.name"
            :class="{'border-red-500': errors.name}"
            class="border p-2 rounded w-full"
          />
          <p v-if="errors.name" class="text-red-500">{{ errors.name }}</p>
        </div>
  
        <div class="mb-4">
          <label for="description">Description:</label>
          <textarea
            id="description"
            v-model="project.description"
            :class="{'border-red-500': errors.description}"
            class="border p-2 rounded w-full"
          ></textarea>
          <p v-if="errors.description" class="text-red-500">{{ errors.description }}</p>
        </div>
  
        <button type="submit" class="bg-blue-500 text-white py-1 px-3 rounded">
          {{ isEdit ? "Update Project" : "Create Project" }}
        </button>
      </form>
    </div>
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
      showForm: false,
    };
  },
  methods: {
    handleSubmit() {
      this.errors = this.validateForm();
      if (Object.keys(this.errors).length === 0) {
        this.$emit("submit-project", this.project);
        this.toggleForm(); // Hide the form after submission
      }
    },
    validateForm() {
      let errors = {};
      if (!this.project.name) errors.name = "Project Name is required";
      if (!this.project.description) errors.description = "Description is required";
      return errors;
    },
    toggleForm() {
      this.showForm = !this.showForm;
      if (!this.showForm) {
        this.project = { name: "", description: "" }; // Reset form fields
        this.errors = {};
      } else if (this.projectToEdit.id) {
        this.project = { ...this.projectToEdit };
        this.isEdit = true;
      }
    },
  },
  watch: {
    projectToEdit(newProject) {
      if (newProject.id) {
        this.project = { ...newProject };
        this.isEdit = true;
        this.showForm = true;
      }
    },
  },
  mounted() {
    if (this.projectToEdit.id) {
      this.project = { ...this.projectToEdit };
      this.isEdit = true;
      this.showForm = true;
    }
  },
};
</script>
  
<style scoped>
/* Add additional styles as needed */
</style>
