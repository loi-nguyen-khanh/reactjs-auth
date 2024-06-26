import { createSlice } from "@reduxjs/toolkit";
import { ErrorState } from "../state/error";

const initialState: ErrorState = {
  errorEmail: null,
  errorPassword: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setEmailError: (state, action) => {
      return { errorEmail: action.payload, errorPassword: null };
    },
    clearEmailError: (state) => {
      return { errorEmail: "", errorPassword: state.errorPassword };
    },
    setPasswordError: (state, action) => {
      return { errorPassword: action.payload, errorEmail: null };
    },
    clearPasswordError: (state) => {
      return { errorPassword: "", errorEmail: state.errorEmail };
    },
  },
});

const { reducer, actions } = errorSlice;

export const { setEmailError, clearEmailError, setPasswordError, clearPasswordError } = actions
export default reducer;