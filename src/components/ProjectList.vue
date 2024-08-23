<template>
    <div>
      <h2>Projects</h2>
      <ul>
        <li v-for="project in projects" :key="project.id">
          <div class="flex justify-between">
            <div>
              <h3>{{ project.name }}</h3>
              <p>{{ project.description }}</p>
            </div>
            <div>
              <button
                @click="editProject(project)"
                class="bg-blue-500 text-white py-1 px-2 rounded"
              >
                Edit
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProjectList",
    props: {
      projects: Array,
    },
    methods: {
      editProject(project) {
        this.$emit("edit-project", project);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add additional styles as needed */
  </style>
  