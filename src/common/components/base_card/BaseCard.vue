<script setup lang="ts">
interface IPropsBaseCard {
  shadowType: "inner" | "outer-1" | "outer-2" | "outer-3";
  hoverAnimation?: boolean;
}

const props = defineProps<IPropsBaseCard>();
</script>
<template>
  <div
    :class="[
      `flex justify-center items-center card-wrapper ${props.shadowType}`,
      { test: props.hoverAnimation }
    ]"
  >
    <slot name="content"></slot>
  </div>
</template>

<style scoped>
.card-wrapper {
  border-radius: 20px;

  transition: transform 0.1s ease-in-out;

  &.inner {
    box-shadow:
      -5px -5px 10px var(--color-shadow-1),
      inset 5px 5px 10px var(--color-shadow-2);
  }
  &.outer-1 {
    box-shadow:
      -5px -5px 10px var(--color-shadow-1),
      5px 5px 10px var(--color-shadow-2);
  }
  &.outer-2 {
    box-shadow:
      -10px -10px 20px var(--color-shadow-1),
      10px 10px 20px var(--color-shadow-2);
  }
  &.outer-3 {
    box-shadow:
      -20px -20px 40px var(--color-shadow-1),
      20px 20px 40px var(--color-shadow-2);
  }
}

.card-wrapper:hover {
  &.test {
    transform: scale(1.05);
  }
}
</style>
