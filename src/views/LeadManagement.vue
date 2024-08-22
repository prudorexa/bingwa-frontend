<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Lead Management</h1>
  
      <!-- Search and Filter -->
      <div class="mb-4">
        <input
          v-model="searchQuery"
          class="border p-2 rounded-md"
          type="text"
          placeholder="Search by company name or email..."
        />
        <select v-model="leadStatusFilter" class="border p-2 rounded-md ml-2">
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>
      </div>
  
      <!-- Lead Form -->
      <form @submit.prevent="addOrUpdateLead" class="mb-4">
        <input
          v-model="newLead.name"
          class="border p-2 rounded-md mr-2"
          type="text"
          placeholder="Company Name"
        />
        <input
          v-model="newLead.email"
          class="border p-2 rounded-md mr-2"
          type="email"
          placeholder="Email"
        />
        <select v-model="newLead.status" class="border p-2 rounded-md mr-2">
          <option value="">Select Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {{ editing ? 'Update' : 'Add' }} Lead
        </button>
      </form>
  
      <!-- Leads Table -->
      <table class="min-w-full bg-white border">
        <thead>
          <tr>
            <th class="py-2 px-4 border">Company Name</th>
            <th class="py-2 px-4 border">Email</th>
            <th class="py-2 px-4 border">Status</th>
            <th class="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="lead in filteredLeads"
            :key="lead.id"
            class="text-center"
          >
            <td class="py-2 px-4 border">{{ lead.name }}</td>
            <td class="py-2 px-4 border">{{ lead.email }}</td>
            <td class="py-2 px-4 border">{{ lead.status }}</td>
            <td class="py-2 px-4 border">
              <button
                @click="editLead(lead)"
                class="text-blue-500 mr-2"
              >
                Edit
              </button>
              <button
                @click="deleteLead(lead.id)"
                class="text-red-500"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Interaction Tracking -->
      <div v-if="selectedLead" class="mt-6">
        <h2 class="text-xl font-bold">Interactions for {{ selectedLead.name }}</h2>
        <ul class="list-disc list-inside">
          <li v-for="interaction in selectedLead.interactions" :key="interaction.id">
            {{ interaction.type }} - {{ interaction.details }}
          </li>
        </ul>
        <form @submit.prevent="addInteraction" class="mt-4">
          <select v-model="newInteraction.type" class="border p-2 rounded-md mr-2">
            <option value="">Select Interaction Type</option>
            <option value="Phone Call">Phone Call</option>
            <option value="Email">Email</option>
          </select>
          <input
            v-model="newInteraction.details"
            class="border p-2 rounded-md mr-2"
            type="text"
            placeholder="Details"
          />
          <button
            type="submit"
            class="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Add Interaction
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
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
      newLead(newVal) {
        this.selectedLead = this.leads.find((lead) => lead.id === newVal.id);
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  </style>
  