<template>
  <div id="app" class="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/mfe1">MFE1</router-link> |
      <router-link to="/mfe2">MFE2</router-link>
      <router-link to="/mfe3">MFE3</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style lang="css" scoped>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-rows: 60px 1fr;
  height: 100vh;
  padding: 0px;
}

nav {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

nav a {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-decoration: none;
  color: inherit;
}

router-view {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>