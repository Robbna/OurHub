<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { router } from "@/router";
import { signUpUser, loginUser, logout } from "@/server/services/UserService";

const FORM = ref<HTMLFormElement | null>(null);
const showSpinner = ref(false);
const { setUser } = useUserStore();

const handleSignup = async () => {
  if (!FORM.value) return;

  showSpinner.value = true;

  const { username, email, password } = Object.fromEntries(new FormData(FORM.value).entries());

  const newUser = await signUpUser({
    username: username.toString(),
    email: email.toString(),
    password: password.toString()
  });

  showSpinner.value = false;

  if (newUser) {
    setUser(newUser);
    router.push({ name: "home" });
    FORM.value.reset();
  }
};
const handleLogin = async () => {
  if (!FORM.value) return;
  const { username, email, password } = Object.fromEntries(new FormData(FORM.value).entries());

  const newUser = await loginUser({
    username: username.toString(),
    email: email.toString(),
    password: password.toString()
  });

  if (newUser) {
    setUser(newUser);
    router.push({ name: "home" });
    FORM.value.reset();
  }
};

const handleGetUserData = async () => {
  // await getUserData();
};
const handleGetUsers = async () => {
  // await getUsers();
};
const handleLogout = async () => {
  await logout();
  setUser(null);
};
</script>
<template>
  <div class="flex justify-center p-9">
    <BaseSpinner :show="showSpinner" />
    <form class="flex flex-col gap-3 justify-center" @submit.prevent ref="FORM">
      <input placeholder="username" name="username" type="text" />
      <input placeholder="email" name="email" type="email" />
      <input placeholder="password" name="password" type="password" />
      <button @click="handleSignup">Sign up</button>
      <button @click="handleLogin">Login</button>
      <button @click="handleGetUserData">Test auth</button>
      <button @click="handleLogout">Logout</button>
      <button @click="handleGetUsers">Get users</button>
    </form>
  </div>
</template>

<style scoped>
input {
  background: none;
  border: 1px solid var(--color-4);
  padding: 6px;
  border-radius: 9px;
}

input::placeholder {
  text-align: center;
  color: var(--color-3);
}

button {
  background: var(--color-4);
  color: var(--color-text);
  border: none;
  padding: 6px;
  border-radius: 6px;
}
</style>
@/server/services/UserService @/common/composables/useToast
