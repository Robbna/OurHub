<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const { user } = useUserStore();
</script>
<template>
  <h1>{{ user?.email }}</h1>
  <button></button>
</template>

<style scoped></style>
