<script setup lang="ts">
interface IPropsPlatformButton {
  text: string;
  platform: "google" | "facebook" | "github";
  isDisabled?: boolean;
  onClick: () => void;
}

const PLATFORMS_ICONS = {
  google: "https://img.icons8.com/color/48/000000/google-logo.png",
  facebook: "https://img.icons8.com/color/48/000000/facebook-new.png",
  github: "https://img.icons8.com/ios-filled/50/000000/github.png"
};

const props = defineProps<IPropsPlatformButton>();
</script>
<template>
  <button
    class="sign-in-button flex justify-center items-center gap-1"
    type="button"
    @click="onClick"
    :disabled="props.isDisabled"
  >
    <img :src="PLATFORMS_ICONS[props.platform]" :alt="`${props.platform} logo`" class="icon" />
    {{ props.text }}
  </button>
</template>

<style scoped>
.sign-in-button {
  cursor: pointer;
  width: 100%;
  background-color: white;
}

.icon {
  width: 1.5rem;
}
</style>
