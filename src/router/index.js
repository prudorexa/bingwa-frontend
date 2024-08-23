// import { createRouter, createWebHistory } from 'vue-router';
// import AdminDashboard from '../views/AdminDashboard.vue';
// import ProjectManagerDashboard from '../views/ProjectManagerDashboard.vue';
// import EngineerDashboard from '../views/EngineerDashboard.vue';
// import UserLogin from '../views/UserLogin.vue';
// import AboutView from '../views/AboutView.vue';
// import HomeView from '../views/HomeView.vue';
// import LeadManagement from '@/views/LeadManagement.vue';
// import ProjectPage from '@/views/ProjectPage.vue';
// import UserProfile from '@/views/UserProfile.vue'; // Import UserProfile component
// import TasksPage from '@/views/TasksPage.vue'; // Import TasksPage component
// import TeamPage from '@/views/TeamPage.vue'; // Import TeamPage component
// import ReportsPage from '@/views/ReportsPage.vue'; // Import ReportsPage component
// import ProjectsPage from '@/views/ProjectsPage.vue'; // Import ProjectsPage component

// const routes = [
//   { path: '/', component: HomeView },
//   { path: '/about', component: AboutView },
//   { path: '/lead-management', component: LeadManagement },
//   { path: '/login', component: UserLogin },
//   { path: '/admin-dashboard', component: AdminDashboard },
//   { path: '/project-manager-dashboard', component: ProjectManagerDashboard },
//   { path: '/engineer-dashboard', component: EngineerDashboard },
//   { path: '/project-page', component: ProjectPage },
//   { path: '/profile', component: UserProfile },
//   { path: '/tasks', component: TasksPage }, // Add TasksPage route
//   { path: '/team', component: TeamPage }, // Add TeamPage route
//   { path: '/reports', component: ReportsPage }, // Add ReportsPage route
//   { path: '/projects', component: ProjectsPage }, // Add ProjectsPage route
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;





import { createRouter, createWebHistory } from 'vue-router';
import AdminDashboard from '../views/AdminDashboard.vue';
import ProjectManagerDashboard from '../views/ProjectManagerDashboard.vue';
import EngineerDashboard from '../views/EngineerDashboard.vue';
import UserLogin from '../views/UserLogin.vue';
import HomeView from '../views/HomeView.vue';
import LeadManagement from '@/views/LeadManagement.vue';
import ProjectPage from '@/views/ProjectPage.vue';
import UserProfile from '@/views/UserProfile.vue'; // Import UserProfile component
import TasksPage from '@/views/TasksPage.vue'; // Import TasksPage component
import TeamPage from '@/views/TeamPage.vue'; // Import TeamPage component
import ReportsPage from '@/views/ReportsPage.vue'; // Import ReportsPage component
import ProjectsPage from '@/views/ProjectsPage.vue'; // Import ProjectsPage component

const routes = [
  { path: '/', component: HomeView },
  { path: '/lead-management', component: LeadManagement },
  { path: '/login', component: UserLogin },

  // Role-based routes
  {
    path: '/admin-dashboard',
    component: AdminDashboard,
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem('role');
      if (role === 'Admin') {
        next();
      } else {
        next('/login'); // Redirect to login if not authorized
      }
    }
  },
  {
    path: '/project-manager-dashboard',
    component: ProjectManagerDashboard,
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem('role');
      if (role === 'Manager') {
        next();
      } else {
        next('/login'); // Redirect to login if not authorized
      }
    }
  },
  {
    path: '/engineer-dashboard',
    component: EngineerDashboard,
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem('role');
      if (role === 'Engineer') {
        next();
      } else {
        next('/login'); // Redirect to login if not authorized
      }
    }
  },
  { path: '/project-page', component: ProjectPage },
  { path: '/profile', component: UserProfile }, // Add UserProfile route
  { path: '/tasks', component: TasksPage }, // Add TasksPage route
  { path: '/team', component: TeamPage }, // Add TeamPage route
  { path: '/reports', component: ReportsPage }, // Add ReportsPage route
  { path: '/projects', component: ProjectsPage }, // Add ProjectsPage route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
