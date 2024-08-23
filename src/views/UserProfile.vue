<template>
    <div class="profile-container max-w-lg mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">User Profile</h2>
      <form @submit.prevent="updateProfile" class="space-y-4">
        <!-- First Name -->
        <div>
          <label for="firstName" class="block text-sm font-medium">First Name</label>
          <input
            v-model="user.firstName"
            type="text"
            id="firstName"
            class="input"
            required
          />
        </div>
  
        <!-- Last Name -->
        <div>
          <label for="lastName" class="block text-sm font-medium">Last Name</label>
          <input
            v-model="user.lastName"
            type="text"
            id="lastName"
            class="input"
            required
          />
        </div>
  
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium">Email</label>
          <input
            v-model="user.email"
            type="email"
            id="email"
            class="input"
            required
          />
        </div>
  
        <!-- Phone Number -->
        <div>
          <label for="phone" class="block text-sm font-medium">Phone Number</label>
          <input
            v-model="user.phone"
            type="tel"
            id="phone"
            class="input"
            required
          />
        </div>
  
        <!-- Address -->
        <div>
          <label for="address" class="block text-sm font-medium">Address</label>
          <textarea
            v-model="user.address"
            id="address"
            class="input"
            required
          ></textarea>
        </div>
  
        <!-- KRA PIN -->
        <div>
          <label for="kraPin" class="block text-sm font-medium">KRA PIN</label>
          <input
            v-model="user.kraPin"
            type="text"
            id="kraPin"
            class="input"
            required
          />
        </div>
  
        <!-- Documents -->
        <div>
          <label for="documents" class="block text-sm font-medium">Upload Documents</label>
          <input
            type="file"
            id="documents"
            @change="handleFileUpload"
            multiple
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
  
        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="btn-primary w-full"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          kraPin: '',
          documents: []
        }
      };
    },
    methods: {
      handleFileUpload(event) {
        this.user.documents = Array.from(event.target.files);
      },
      async updateProfile() {
        try {
          const formData = new FormData();
          for (const key in this.user) {
            if (this.user[key] instanceof Array) {
              this.user[key].forEach(file => formData.append('documents', file));
            } else {
              formData.append(key, this.user[key]);
            }
          }
          await axios.put('/api/user/profile', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          alert('Profile updated successfully!');
        } catch (error) {
          console.error('Failed to update profile:', error);
          alert('Failed to update profile. Please try again.');
        }
      },
      async fetchUserProfile() {
        try {
          const { data } = await axios.get('/api/user/profile');
          this.user = data;
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      }
    },
    created() {
      this.fetchUserProfile();
    }
  };
  </script>
  
  <style scoped>
  .profile-container {
    background-color: #f9fafb;
    border-radius: 0.375rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    margin-top: 0.25rem;
  }
  
  .btn-primary {
    background-color: #3b82f6;
    color: white;
    padding: 0.75rem;
    border-radius: 0.375rem;
    text-align: center;
    cursor: pointer;
  }
  
  .btn-primary:hover {
    background-color: #2563eb;
  }
  </style>
  