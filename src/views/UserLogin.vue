<template>
  <div class="min-h-screen flex items-center justify-center bg-cover bg-center" :style="{ backgroundImage: `url('/static/images/topping.webp')` }">
    <div class="bg-white bg-opacity-90 shadow-lg rounded-lg p-8 max-w-md w-full">
      <div v-if="message" class="text-red-500 mb-4 text-center">{{ message }}</div>
      
      <div v-if="action === 'Login' || action === 'Sign Up'" class="text-center">
        <div class="text-2xl font-bold mb-4 text-gray-800">{{ action === 'Login' ? 'Login' : 'Sign Up' }}</div>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div v-if="action === 'Sign Up'" class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Username</label>
            <input id="name" v-model="name" type="text" placeholder="Enter your username" class="input-field" required />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <input id="email" v-model="email" type="email" placeholder="Enter your email" class="input-field" required />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" v-model="password" type="password" placeholder="Enter your password" class="input-field" required />
          </div>
          <div v-if="action === 'Sign Up'" class="mb-4">
            <label for="role" class="block text-sm font-medium text-gray-700">Select Role</label>
            <select id="role" v-model="role" class="input-field" required>
              <option value="" disabled>Select a role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Engineer">Engineer</option>
            </select>
          </div>
          <div class="flex items-center justify-center">
            <button type="submit" class="btn" :disabled="loading">
              {{ loading ? 'Processing...' : action === 'Login' ? 'Login' : 'Sign Up' }}
            </button>
          </div>
        </form>
        <div class="mt-4 text-center">
          <button @click="toggleAction" class="text-sm font-medium text-blue-500 hover:text-blue-700 focus:outline-none">
            {{ action === 'Login' ? 'Create an account' : 'Already have an account? Login' }}
          </button>
          <button @click="() => action = 'Forgot Password'" class="text-sm font-medium text-blue-500 hover:text-blue-700 focus:outline-none ml-4">
            Forgot password?
          </button>
        </div>
      </div>

      <div v-if="action === 'Forgot Password'" class="text-center">
        <div class="text-2xl font-bold mb-4 text-gray-800">Forgot Password</div>
        <form @submit.prevent="handlePasswordReset" class="space-y-4">
          <div class="mb-4">
            <label for="resetEmail" class="block text-sm font-medium text-gray-700">Email address</label>
            <input id="resetEmail" v-model="resetEmail" type="email" placeholder="Enter your email" class="input-field" required />
          </div>
          <div class="mb-4">
            <label for="newPassword" class="block text-sm font-medium text-gray-700">New Password</label>
            <input id="newPassword" v-model="newPassword" type="password" placeholder="Enter new password" class="input-field" required />
          </div>
          <div class="mb-4">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input id="confirmPassword" v-model="confirmPassword" type="password" placeholder="Confirm new password" class="input-field" required />
          </div>
          <div class="flex items-center justify-center">
            <button type="submit" class="btn" :disabled="loading">
              {{ loading ? 'Processing...' : 'Reset Password' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const BASE_URL = 'http://localhost:8000'; // replace with your actual base URL

export default {
  setup() {
    const router = useRouter();
    const action = ref('Login'); // 'Login', 'Sign Up', or 'Forgot Password'
    const email = ref('');
    const password = ref('');
    const name = ref('');
    const role = ref('');
    const resetEmail = ref('');
    const newPassword = ref('');
    const confirmPassword = ref('');
    const message = ref('');
    const loading = ref(false);

    const handleSubmit = async () => {
      message.value = '';
      loading.value = true;
      try {
        if (action.value === 'Login') {
          await handleLogin();
        } else if (action.value === 'Sign Up') {
          await handleSignUp();
        }
      } catch (error) {
        console.error('Error:', error);
        message.value = 'Operation failed. Please try again later.';
      } finally {
        loading.value = false;
      }
    };

    const handleLogin = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/api/api/login/`, { email: email.value, password: password.value });
        if (response.status === 200) {
          message.value = 'Login successful!';
          router.push('/Dashboard');
        } else {
          message.value = 'Login failed. Please check your credentials.';
        }
      } catch (error) {
        console.error('Login Error:', error);
        message.value = 'Login failed. Please check your credentials.';
      }
    };

    const handleSignUp = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/api/api/users/`, { username: name.value, email: email.value, password: password.value, role: role.value });
        if (response.status === 201) {
          message.value = 'Registration successful!';
          action.value = 'Login';
        } else {
          message.value = 'Registration failed. Please check your details.';
        }
      } catch (error) {
        console.error('Registration Error:', error);
        message.value = 'Registration failed. Please check your details.';
      }
    };

    const handlePasswordReset = async () => {
      if (newPassword.value !== confirmPassword.value) {
        message.value = 'Passwords do not match.';
        return;
      }

      try {
        const response = await axios.post(`${BASE_URL}/api/api/password-reset/`, { email: resetEmail.value, new_password: newPassword.value });
        if (response.status === 200) {
          message.value = 'Password reset successful!';
          action.value = 'Login';
        } else {
          message.value = 'Password reset failed. Please check your email.';
        }
      } catch (error) {
        console.error('Password Reset Error:', error);
        message.value = 'Password reset failed. Please check your email.';
      }
    };

    const toggleAction = () => {
      action.value = action.value === 'Login' ? 'Sign Up' : 'Login';
    };

    return {
      action,
      email,
      password,
      name,
      role,
      resetEmail,
      newPassword,
      confirmPassword,
      message,
      loading,
      handleSubmit,
      handlePasswordReset,
      toggleAction
    };
  }
};
</script>

<style scoped>
.input-field {
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  padding: 0.5rem;
  transition: border-color 0.2s;
}

.input-field:focus {
  outline: none;
  border-color: #3b82f6;
}

.btn {
  background: linear-gradient(to right, #7f1d1d, #c05454);
  color: white;
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  text-transform: uppercase;
  transition: background 0.3s;
}

.btn:hover {
  background: linear-gradient(to right, #c05454, #7f1d1d);
}
</style>
