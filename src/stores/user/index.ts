import { ref } from "vue";
import { defineStore } from "pinia";
import type { IUserDto } from "@/server/data";

export const useUserStore = defineStore("user", () => {
  const user = ref<IUserDto | null>(null);
  function setUser(userDto: IUserDto | null) {
    user.value = userDto;
  }

  return { user, setUser };
});