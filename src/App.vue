<script setup lang="ts">
import MaintenanceView from "./views/shared/MaintenanceView.vue";
import { ref, onBeforeMount } from "vue";
import { getMaintenanceMode } from "@/server/services/FirebaseService";

const BODY_ELEMENT = ref(document.body);

const changeTheme = () => {
  BODY_ELEMENT.value.classList.toggle("dark-theme");
};
const maintenanceMode = ref(false);
const isMainContentVisible = ref(false);

onBeforeMount(async () => {
  const isMaintenance = await getMaintenanceMode();
  maintenanceMode.value = isMaintenance;
  isMainContentVisible.value = !isMaintenance;
});
</script>

<template>
  <div v-if="maintenanceMode" class="maintenance-view">
    <MaintenanceView />
  </div>
  <div v-if="isMainContentVisible" class="app-content" ref="appContentElement">
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
