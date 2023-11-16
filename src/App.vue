<script setup lang="ts">
import { ref } from "vue";

const BODY_ELEMENT = ref(document.body);

const changeTheme = () => {
  BODY_ELEMENT.value.classList.toggle("dark-theme");
};
</script>

<template>
  <div class="app-content" ref="appContentElement">
    <div class="navbar-wrapper flex justify-evenly">
      <nav class="navbar flex gap-6">
        <router-link class="router-link" to="/">/</router-link>
        <router-link class="router-link" to="/signup">🔐 Sign up!</router-link>
        <router-link class="router-link" to="/home">🏠 Home</router-link>
      </nav>
      <button @click="changeTheme">🌒</button>
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
.navbar-wrapper {
  border-bottom: 1px solid var(--color-3);
}

.router-link {
  box-shadow: 3px 3px 1px var(--color-3);
  padding: 4px 10px;
  margin: 10px;
  border-radius: 9px;
  border: 1px solid var(--color-3);
  color: var(--color-text);
}
</style>
