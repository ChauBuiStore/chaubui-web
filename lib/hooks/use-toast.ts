import { toast as sonnerToast } from "sonner";

export function useToast() {
  return {
    success: (message: string, description?: string) => {
      sonnerToast.success(message, {
        description,
        duration: 3000,
      });
    },

    error: (message: string, description?: string) => {
      sonnerToast.error(message, {
        description,
        duration: 4000,
      });
    },

    info: (message: string, description?: string) => {
      sonnerToast.info(message, {
        description,
        duration: 3000,
      });
    },

    warning: (message: string, description?: string) => {
      sonnerToast.warning(message, {
        description,
        duration: 3000,
      });
    },

    loading: (message: string, description?: string) => {
      return sonnerToast.loading(message, {
        description,
      });
    },

    promise: <T,>(
      promise: Promise<T>,
      messages: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: Error) => string);
      }
    ) => {
      return sonnerToast.promise(promise, messages);
    },

    dismiss: (toastId?: string | number) => {
      sonnerToast.dismiss(toastId);
    },

    custom: (message: string, options?: Record<string, unknown>) => {
      sonnerToast(message, options);
    },
  };
}
