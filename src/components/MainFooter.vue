/* eslint-disable vue/multi-word-component-names */
<template>
    <footer class="footer">
      <div class="container">
        <div class="main-footer-section">
          <h4>Company</h4>
          <ul>
            <li><router-link to="/about">About Us</router-link></li>
            <li><router-link to="/projects">Projects</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </div>
        <div class="main-footer-section">
          <h4>Services</h4>
          <ul>
            <li><router-link to="/customers">Customers</router-link></li>
            <li><router-link to="/leads">Leads</router-link></li>
          </ul>
        </div>
        <div class="main-footer-section">
          <h4>Contact</h4>
          <p>Email: info@bingwaservices.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Main Street, Nairobi</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "MainFooter",
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #868fe0;
    color: #fff;
    padding: 2rem 0;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .footer-section {
    flex: 1;
  }
  .footer-section h4 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  .footer-section ul {
    list-style: none;
    padding: 0;
  }
  .footer-section ul li {
    margin-bottom: 0.5rem;
  }
  .footer-section ul li a {
    color: #fff;
    text-decoration: none;
  }
  .footer-section ul li a:hover {
    text-decoration: underline;
  }
  .footer-section p {
    margin: 0.5rem 0;
  }
  </style>
  