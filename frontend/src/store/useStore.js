import { create } from "zustand";
import axios from "axios";

const API = "https://taskflow-mini-7k89.onrender.com";

export const useStore = create((set, get) => ({
  token: localStorage.getItem("token"),
  user: null,
  tasks: [],
  loading: false,
  error: null,

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null, tasks: [] });
  },

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.post(API + "/auth/login", { email, password });

      get().setToken(res.data.token);
      await get().fetchUser();

      set({ loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false
      });
    }
  },

  register: async (data) => {
    try {
      set({ loading: true, error: null });

      await axios.post(API + "/auth/register", data);

      set({ loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Register failed",
        loading: false
      });
    }
  },

  fetchUser: async () => {
    try {
      const res = await axios.get(API + "/auth/me", {
        headers: { Authorization: "Bearer " + get().token }
      });

      set({ user: res.data });
    } catch (err) {
      set({ error: "Fetch user failed" });
    }
  },

  fetchTasks: async () => {
    try {
      set({ loading: true });

      const res = await axios.get(API + "/tasks", {
        headers: { Authorization: "Bearer " + get().token }
      });

      set({ tasks: res.data, loading: false });
    } catch (err) {
      set({ error: "Fetch tasks failed", loading: false });
    }
  },

  addTask: async (task) => {
    try {
      await axios.post(API + "/tasks", task, {
        headers: { Authorization: "Bearer " + get().token }
      });

      get().fetchTasks();
    } catch (err) {
      set({ error: "Add task failed" });
    }
  },

  deleteTask: async (id) => {
    try {
      await axios.delete(API + "/tasks/" + id, {
        headers: { Authorization: "Bearer " + get().token }
      });

      get().fetchTasks();
    } catch (err) {
      set({ error: "Delete failed" });
    }
  },

  updateTask: async (id, data) => {
    try {
      await axios.put(API + "/tasks/" + id, data, {
        headers: { Authorization: "Bearer " + get().token }
      });

      get().fetchTasks();
    } catch (err) {
      set({ error: "Update failed" });
    }
  }
}));