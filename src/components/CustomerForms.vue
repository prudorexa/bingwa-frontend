<template>
    <div class="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 class="text-2xl font-bold mb-4">Customer Form</h2>
      <form @submit.prevent="submitCustomer">
        <div class="mb-4">
          <label for="companyName" class="block text-gray-700">Company Name</label>
          <input v-model="customer.companyName" type="text" id="companyName" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <!-- Add other fields similarly -->
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        customer: {
          companyName: '',
          // Add other fields here
        }
      };
    },
    methods: {
      submitCustomer() {
        // Handle form submission
        console.log(this.customer);
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add component-specific styles if needed */
  </style>
  