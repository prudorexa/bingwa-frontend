<template>
    <div>
      <h2 class="text-xl font-bold mb-4">Add/Edit User</h2>
      <form @submit.prevent="saveUser">
        <div class="mb-4">
          <label for="firstName" class="block mb-2">First Name</label>
          <input
            type="text"
            id="firstName"
            v-model="user.firstName"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="lastName" class="block mb-2">Last Name</label>
          <input
            type="text"
            id="lastName"
            v-model="user.lastName"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="user.email"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="phoneNumber" class="block mb-2">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            v-model="user.phoneNumber"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="address" class="block mb-2">Address</label>
          <input
            type="text"
            id="address"
            v-model="user.address"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="kraPin" class="block mb-2">KRA PIN</label>
          <input
            type="text"
            id="kraPin"
            v-model="user.kraPin"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="document" class="block mb-2">Document</label>
          <input
            type="file"
            id="document"
            @change="handleFileUpload"
            class="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" class="bg-green-600 text-white py-2 px-4 rounded">
          Save User
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserForm",
    data() {
      return {
        user: {
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          address: "",
          kraPin: "",
          document: null,
        },
      };
    },
    methods: {
      handleFileUpload(event) {
        this.user.document = event.target.files[0];
      },
      saveUser() {
        // Implement save user logic, typically a POST request to your backend
        const formData = new FormData();
        for (const key in this.user) {
          formData.append(key, this.user[key]);
        }
  
        // Example POST request using fetch or axios
        fetch("/api/users", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("User saved successfully:", data);
            // Add logic to reset form or notify user of success
          })
          .catch((error) => {
            console.error("Error saving user:", error);
            // Add logic to handle errors, such as showing a notification
          });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles for the UserForm component */
  </style>
  