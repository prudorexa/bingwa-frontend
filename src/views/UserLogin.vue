<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-full max-w-sm">
      <h1 class="text-2xl font-bold mb-4">Login</h1>
      <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded shadow-md">
        <!-- Email Input -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full border-gray-300 rounded px-3 py-2"
            :class="{'border-red-500': errors.email}"
          />
          <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
        </div>

        <!-- Password Input -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full border-gray-300 rounded px-3 py-2"
            :class="{'border-red-500': errors.password}"
          />
          <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data() {
    return {
      email: '',
      password: '',
      errors: {}
    };
  },
  methods: {
    validate() {
      this.errors = {};
      if (!this.email) this.errors.email = 'Email is required.';
      if (!this.password) this.errors.password = 'Password is required.';
      return Object.keys(this.errors).length === 0;
    },
    handleSubmit() {
      if (this.validate()) {
        // Handle the login logic here
        console.log('Submitting', { email: this.email, password: this.password });
        // For example, you could use axios to send a POST request to your backend
        // axios.post('/api/login', { email: this.email, password: this.password })
        //   .then(response => {
        //     // Handle successful login
        //   })
        //   .catch(error => {
        //     // Handle login error
        //   });
      }
    }
  }
};
</script>

<style scoped>
/* Add scoped styling if needed */
</style>
