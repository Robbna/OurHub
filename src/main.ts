import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";

import Vue3Toasity, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import "./main.css";

import App from "./App.vue";
import BaseCard from "@/common/components/base_card/BaseCard.vue";
import BaseSpinner from "@/common/components/base_spinner/BaseSpinner.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Vue3Toasity, {
  autoClose: 3000
} as ToastContainerOptions);

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    BaseCard: typeof BaseCard;
    BaseSpinner: typeof BaseSpinner;
  }
}

app.component("BaseCard", BaseCard);
app.component("BaseSpinner", BaseSpinner);

app.mount("#app");
