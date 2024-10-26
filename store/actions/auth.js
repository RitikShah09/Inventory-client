import axios from "axios";
import { toast } from "react-toastify";
import { addUser, removeUser } from "../slices/authSlice";
import getToken from "@/utils/getToken";

const URL = "https://inventory-server-26op.onrender.com";

export const asyncSignUpUser = (user) => async (dispatch, getstate) => {
  try {
    const { data } = await axios.post(`${URL}/auth/signup`, user);
    dispatch(addUser(data.user));
    document.cookie = `token=${data.token}; path=/; max-age=3600`;
    toast.success("User Registered Successfully");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const asyncSignInUser = (user) => async (dispatch, getstate) => {
  try {
    const { data } = await axios.post(`${URL}/auth/login`, user);
    dispatch(addUser(data.user));
    document.cookie = `token=${data.token}; path=/; max-age=3600`;
    toast.success("User Logged In Successfully");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const asyncCurrentUser = () => async (dispatch, getstate) => {
  try {
    const { data } = await axios.get(`${URL}/auth/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    dispatch(addUser(data.user));
  } catch (error) {
    toast.error("Session Timeout Logged In Again!");
  }
};

export const asyncSignOutUser = () => async (dispatch, getState) => {
  return new Promise((resolve) => {
    document.cookie = `token=; Max-Age=-1; path=/;`;
    dispatch(removeUser());
    toast.success("Signed Out Successfully");
    resolve();
  });
};