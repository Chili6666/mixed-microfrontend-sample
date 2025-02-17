<template>
  <div class="home">
    <h1>Welcome to Microfrontends</h1>
    <p>This is the main shell application demonstrating Module Federation</p>
    <div class="features">
      <div class="feature">
        <h3>Microfrontend 1</h3>
        <p>Demonstrates component sharing and lazy loading</p>
        <router-link to="/mfe1" class="btn">Explore MFE1</router-link>
      </div>
      <div class="feature">
        <h3>Microfrontend 2</h3>
        <p>Shows advanced routing and view composition</p>
        <router-link to="/mfe2" class="btn">Explore MFE2</router-link>
      </div>
      <div class="feature">
        <h3>React 2</h3>
        <p>Shows advanced routing and view composition</p>
        <router-link to="/mfe3" class="btn">Explore MFE3</router-link>
      </div>
    </div>
    <react-webcomponent-wrapper></react-webcomponent-wrapper>
  </div>
</template>

<script setup lang="ts">
  import '../components/ReactWebComponentWrapper.ts'
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
  background-color: #f4f6f9;
  border-radius: 10px;
}

.features {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 30px;
}

.feature {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 300px;
}

.btn {
  display: inline-block;
  background-color: #42b983;
  color: white;
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #3aa876;
}
</style>
