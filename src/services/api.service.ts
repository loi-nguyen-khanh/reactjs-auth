import axios from "axios";
import { STATUS_DONE } from "../constants/AuthConstant";

const authHeader = () => {
  const accessToken = localStorage.getItem('accessToken') ?? '';
  const clientToken = localStorage.getItem('clientToken') ?? '';

  if (accessToken && clientToken) {
    return {
      'Access-Token': 'Bearer ' + accessToken,
      'Client-Token': clientToken
    };
  } else {
    return {};
  }
}

const login = (email: string, password: string) => {
  return axios
    .post(import.meta.env.VITE_API_URL + "/auth/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      if (response.data.tokens && response.data.tokens.accessToken) {
        const role = response.data.view.type;
        const storeId = response.data.accesses[0].store_id;
        console.log("----", role);
        localStorage.setItem("accessToken", response.data.tokens.accessToken);
        localStorage.setItem("clientToken", response.data.tokens.clientToken);
        localStorage.setItem("role", role);
        localStorage.setItem("storeId", storeId);
      }
      return response.data;
    })
};

const getUserProfile = () => {
  return axios
    .get(import.meta.env.VITE_API_URL + "/self/profile", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getStoreInfo = (id: string) => {
  return axios
    .get(import.meta.env.VITE_API_URL + "/store/" + id, { headers: authHeader() })
    .then((response) => {
      if (response.data.store && response.data.store.onboarding_procedure && response.data.store.onboarding_procedure.onboarding_status !== STATUS_DONE) {
        localStorage.setItem("isOnboarding", "1");
      } else localStorage.setItem("isOnboarding", "0");
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("clientToken");
  localStorage.removeItem("role");
  localStorage.removeItem("storeId");
};

const apiService = {
  login,
  logout,
  getUserProfile,
  getStoreInfo,
};

export default apiService;