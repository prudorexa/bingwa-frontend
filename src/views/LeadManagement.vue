<template>
    <div class="container mx-auto p-4 md:p-8">
      <h1 class="text-2xl font-bold mb-6">Lead Management</h1>
  
      <!-- Search and Filter -->
      <div class="mb-6 flex flex-col md:flex-row md:items-center">
        <input
          v-model="searchQuery"
          class="border border-gray-300 p-2 rounded-md mb-4 md:mb-0 md:mr-4 flex-grow"
          type="text"
          placeholder="Search by company name or email..."
        />
        <select v-model="leadStatusFilter" class="border border-gray-300 p-2 rounded-md w-full md:w-auto">
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>
      </div>
  
      <!-- Lead Form -->
      <form @submit.prevent="addOrUpdateLead" class="mb-6 flex flex-col md:flex-row md:items-center">
        <input
          v-model="newLead.name"
          class="border border-gray-300 p-2 rounded-md mb-4 md:mb-0 md:mr-4 flex-grow"
          type="text"
          placeholder="Company Name"
        />
        <input
          v-model="newLead.email"
          class="border border-gray-300 p-2 rounded-md mb-4 md:mb-0 md:mr-4 flex-grow"
          type="email"
          placeholder="Email"
        />
        <select v-model="newLead.status" class="border border-gray-300 p-2 rounded-md mb-4 md:mb-0 md:mr-4 flex-grow">
          <option value="">Select Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded-md w-full md:w-auto"
        >
          {{ editing ? 'Update' : 'Add' }} Lead
        </button>
      </form>
  
      <!-- Leads Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead class="bg-gray-200">
            <tr>
              <th class="py-3 px-4 border-b text-left">Company Name</th>
              <th class="py-3 px-4 border-b text-left">Email</th>
              <th class="py-3 px-4 border-b text-left">Status</th>
              <th class="py-3 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="lead in filteredLeads"
              :key="lead.id"
              class="hover:bg-gray-100"
            >
              <td class="py-2 px-4 border-b">{{ lead.name }}</td>
              <td class="py-2 px-4 border-b">{{ lead.email }}</td>
              <td class="py-2 px-4 border-b">{{ lead.status }}</td>
              <td class="py-2 px-4 border-b flex items-center space-x-2">
                <button
                  @click="editLead(lead)"
                  class="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  @click="deleteLead(lead.id)"
                  class="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Interaction Tracking -->
      <div v-if="selectedLead" class="mt-8">
        <h2 class="text-xl font-bold mb-4">Interactions for {{ selectedLead.name }}</h2>
        <ul class="list-disc list-inside mb-4">
          <li v-for="interaction in selectedLead.interactions" :key="interaction.id">
            {{ interaction.type }} - {{ interaction.details }}
          </li>
        </ul>
        <form @submit.prevent="addInteraction" class="flex flex-col md:flex-row md:items-center">
          <select v-model="newInteraction.type" class="border border-gray-300 p-2 rounded-md mb-4 md:mb-0 md:mr-4 flex-grow">
            <option value="">Select Interaction Type</option>
            <option value="Phone Call">Phone Call</option>
            <option value="Email">Email</option>
          </select>
          <input
            v-model="newInteraction.details"
            class="border border-gray-300 p-2 rounded-md mb-4 md:mb-0 md:mr-4 flex-grow"
            type="text"
            placeholder="Details"
          />
          <button
            type="submit"
            class="bg-green-600 text-white px-4 py-2 rounded-md w-full md:w-auto"
          >
            Add Interaction
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        leads: [],
        searchQuery: '',
        leadStatusFilter: '',
        newLead: { id: null, name: '', email: '', status: '' },
        editing: false,
        selectedLead: null,
        newInteraction: { type: '', details: '' },
      };
    },
    computed: {
      filteredLeads() {
        return this.leads.filter((lead) => {
          const matchesSearch =
            lead.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            lead.email.toLowerCase().includes(this.searchQuery.toLowerCase());
          const matchesStatus =
            this.leadStatusFilter === '' || lead.status === this.leadStatusFilter;
          return matchesSearch && matchesStatus;
        });
      },
    },
    methods: {
      async fetchLeads() {
        try {
          const response = await axios.get('/api/leads', {
            params: {
              search: this.searchQuery,
              status: this.leadStatusFilter,
            },
          });
          this.leads = response.data;
        } catch (error) {
          console.error('Error fetching leads:', error);
        }
      },
      addOrUpdateLead() {
        if (this.editing) {
          const index = this.leads.findIndex((lead) => lead.id === this.newLead.id);
          if (index !== -1) {
            this.leads.splice(index, 1, { ...this.newLead });
          }
          this.editing = false;
        } else {
          this.newLead.id = Date.now();
          this.newLead.interactions = [];
          this.leads.push({ ...this.newLead });
        }
        this.resetForm();
      },
      editLead(lead) {
        this.newLead = { ...lead };
        this.editing = true;
      },
      deleteLead(id) {
        this.leads = this.leads.filter((lead) => lead.id !== id);
      },
      resetForm() {
        this.newLead = { id: null, name: '', email: '', status: '' };
      },
      addInteraction() {
        if (this.selectedLead) {
          this.selectedLead.interactions.push({
            id: Date.now(),
            type: this.newInteraction.type,
            details: this.newInteraction.details,
          });
          this.newInteraction = { type: '', details: '' };
        }
      },
    },
    watch: {
      searchQuery: 'fetchLeads',
      leadStatusFilter: 'fetchLeads',
    },
  };
  </script>
  
  <style scoped>
  /* Optional: Customize additional styles if needed */
  .container {
    max-width: 1200px;
  }
  </style>
  