<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { router } from "@/router";
import { signupUser, loginUser, logoutUser } from "@/server/services/UserService";
import { consoleLog } from "@/server/utils/logger/LogUtils";

import GoogleButton from "./components/google_button/GoogleButton.vue";

const { setUser, clearUser } = useUserStore();

const FORM = ref<HTMLFormElement | null>(null);
const showSpinner = ref(false);

const handleSignup = async () => {
  if (!FORM.value) return;

  showSpinner.value = true;

  const { username, email, password } = Object.fromEntries(new FormData(FORM.value).entries());

  try {
    const newUser = await signupUser({
      username: username.toString(),
      email: email.toString(),
      password: password.toString()
    });

    if (newUser) {
      setUser(newUser);
      router.push({ name: "home" });
      FORM.value.reset();
    }
  } catch (error) {
    consoleLog("ERROR", error);
  } finally {
    showSpinner.value = false;
  }
};
const handleLogin = async () => {
  if (!FORM.value) return;
  const { username, email, password } = Object.fromEntries(new FormData(FORM.value).entries());

  try {
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
  } catch (error) {
    consoleLog("ERROR", error);
  }
};

const handleLoginWithGoogle = async () => {
  try {
    // const newUser = await loginWithGoogle();
    // if (newUser) {
    //   setUser(newUser);
    //   router.push({ name: "home" });
    // }
  } catch (error) {
    consoleLog("ERROR", error);
  }
};

const handleLogout = async () => {
  try {
    await logoutUser();
    clearUser();
  } catch (error) {
    consoleLog("ERROR", error);
  }
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
      <button @click="handleLogout">Logout</button>

      <GoogleButton :is-disabled="false" :on-click="handleLoginWithGoogle" />
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
