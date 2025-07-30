import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types";
import axios from "axios";
import type { AppDispatch } from "../store/store";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  authMode: "login" | "register";
  form: {
    phone: string;
    otp: string;
    name: string;
    email: string;
  };
  showOtpField: boolean;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  loading: false,
  error: null,
  authMode: "login",
  form: {
    phone: "",
    otp: "",
    name: "",
    email: "",
  },
  showOtpField: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFormField: (
      state,
      action: PayloadAction<{ field: keyof AuthState["form"]; value: string }>
    ) => {
      state.form[action.payload.field] = action.payload.value;
    },
    toggleAuthMode: (state) => {
      state.authMode = state.authMode === "login" ? "register" : "login";
      state.showOtpField = false;
    },
    setShowOtpField: (state, action: PayloadAction<boolean>) => {
      state.showOtpField = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    resetForm: (state) => {
      state.form = { phone: "", otp: "", name: "", email: "" };
      state.showOtpField = false;
    },
  },
});

export const {
  setFormField,
  toggleAuthMode,
  setShowOtpField,
  setLoading,
  setError,
  setUser,
  resetForm,
} = authSlice.actions;

export default authSlice.reducer;

export const sendOtp = () => async (dispatch: AppDispatch, getState: any) => {
  const phone = getState().auth.form.phone;
  try {
    dispatch(setLoading(true));
    await axios.post("http://localhost:4000/send-otp", { phone });
    dispatch(setShowOtpField(true));
  } catch (err: any) {
    dispatch(setError(err.response?.data?.message || "Failed to send OTP"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const registerUser = () => async (dispatch: AppDispatch, getState: any) => {
  const { name, email, phone } = getState().auth.form;
  try {
    dispatch(setLoading(true));
    await axios.post("http://localhost:4000/register", { name, email, phone });
    alert("Registered! Now verify via OTP");
    dispatch(toggleAuthMode());
    dispatch(sendOtp());
  } catch (err: any) {
    dispatch(setError(err.response?.data?.message || "Registration failed"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const verifyOtp = () => async (dispatch: AppDispatch, getState: any) => {
  const { phone, otp } = getState().auth.form;
  try {
    dispatch(setLoading(true));
    const res = await axios.post("http://localhost:4000/verify-otp", { phone, otp });
    dispatch(setUser(res.data.user));
    dispatch(resetForm());
  } catch (err: any) {
    dispatch(setError(err.response?.data?.message || "OTP verification failed"));
  } finally {
    dispatch(setLoading(false));
  }
};