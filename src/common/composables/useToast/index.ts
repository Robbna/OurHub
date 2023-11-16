import { toast, type ToastOptions } from "vue3-toastify";

export const useToast = () => {
  const showToast = (text: string, autoClose: number) => {
    toast(text, {
      autoClose: autoClose,
      position: toast.POSITION.BOTTOM_RIGHT
    } as ToastOptions);
  };

  return { showToast };
};
