// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import AdminDashboard from '../views/AdminDashboard.vue';
import ProjectManagerDashboard from '../views/ProjectManagerDashboard.vue';
import EngineerDashboard from '../views/EngineerDashboard.vue';
import UserLogin from '../views/UserLogin.vue';
import AboutView from '../views/AboutView.vue'; // Assuming there's an About.vue file
import HomeView from '../views/HomeView.vue';
import LeadManagement from '@/views/LeadManagement.vue';
const routes = [
  { path: '/', component: HomeView }, // Updated path to match the navbar
  { path: '/about', component: AboutView }, // Updated path to match the navbar
  { path: '/lead-management', component: LeadManagement },
  { path: '/login', component: UserLogin }, // Updated path to match the navbar
  { path: '/admin-dashboard', component: AdminDashboard }, // Updated path to match the navbar
  { path: '/project-manager-dashboard', component: ProjectManagerDashboard }, // Updated path to match the navbar
  { path: '/engineer-dashboard', component: EngineerDashboard }, // Updated path to match the navbar
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
