import { useAuthStore } from "@/store/authStore";

export const handleAuthError = (response: Response) => {
  if (response.status === 401) {
    // Token expired or invalid, logout and redirect to login
    useAuthStore.getState().logout();
    window.location.href = "/login";
    return true;
  }
  return false;
};

export const checkAuthStatus = async (response: Response) => {
  if (response.status === 401) {
    handleAuthError(response);
    return false;
  }
  return true;
};
