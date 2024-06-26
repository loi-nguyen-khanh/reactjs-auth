/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setEmailError, setPasswordError } from "./error";
import apiService from "../services/api.service";
import { AuthState, User } from "../state/auth";
import { ROLE_CLIENT, STATUS_DONE } from "../constants/AuthConstant";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  data: any;
  role: string;
  isOnboarding: boolean;
}

const accessToken = localStorage.getItem("accessToken") ?? '';
const clientToken = localStorage.getItem("clientToken") ?? '';
const role = localStorage.getItem("role");
const isOnboarding = localStorage.getItem("isOnboarding") === "1" ? true : false;
const userFromLocalStorage = localStorage.getItem("user");
const user: User | null = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;

export const login = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { state: AuthState }
>("auth/login", async ({ email, password }, thunkAPI) => {
  try {
    const data = await apiService.login(email, password);
    const role = data.view.type
    let isOnboarding = false;
    if (role === ROLE_CLIENT) {
      const storeId = data.accesses[0].store_id;
      const dataStore = await apiService.getStoreInfo(storeId);
      if (dataStore.store && dataStore.store.onboarding_procedure && dataStore.store.onboarding_procedure.onboarding_status !== STATUS_DONE) {
        isOnboarding = true;
      }
    }
    return { data: data, role: role, isOnboarding: isOnboarding};
  } catch (
    error: any
  ) {
    let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    message = message.replace("Failed to process login :: ", "");
    if (message.indexOf("email") != -1) {
      thunkAPI.dispatch(setEmailError(message));
    } else {
      thunkAPI.dispatch(setPasswordError(message));
    }
    return thunkAPI.rejectWithValue(null);
  }
});

export const logout = createAsyncThunk<void, void, { state: AuthState }>(
  "auth/logout",
  async () => {
    await apiService.logout();
  }
);

const initialState: AuthState = accessToken && clientToken
  ? { isLoggedIn: true, user, role, isLoading: false, isOnboarding }
  : { isLoggedIn: false, user: null, role: null, isLoading: false, isOnboarding: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.data.user;
        state.role = action.payload.role;
        state.isLoading = false;
        state.isOnboarding = action.payload.isOnboarding;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.role = null;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.role = null;
        state.isLoading = false;
      });
  },
});

const { reducer } = authSlice;
export default reducer;
