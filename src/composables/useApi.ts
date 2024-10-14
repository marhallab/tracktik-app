import { ref } from "vue";
import { ApiService } from "@/services/ApiService.ts";

export function useApi<T>() {
  const response = ref<T | null>(null);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);

  const get = async (url: string) => {
    loading.value = true;
    try {
      response.value = await ApiService.get<T>(url);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return { response, error, loading, get };
}
