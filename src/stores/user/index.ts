import { ref } from "vue";
import { defineStore } from "pinia";
import type { IUserDto } from "@/common/data/user";

export const useUserStore = defineStore("user", () => {
  const user = ref<IUserDto | null>(null);
  const setUser = (userDto: IUserDto | null) => {
    user.value = userDto;
  };

  const clearUser = () => {
    setUser(null);
  };

  return { user, setUser, clearUser };
});
