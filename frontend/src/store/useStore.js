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
      set({ loading: true });
      const res = await axios.post(API + "/auth/login", { email, password });
      get().setToken(res.data.token);
      await get().fetchUser();
      set({ loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message, loading: false });
    }
  },

  register: async (data) => {
    await axios.post(API + "/auth/register", data);
  },

  fetchUser: async () => {
    const res = await axios.get(API + "/auth/me", {
      headers: { Authorization: get().token }
    });
    set({ user: res.data });
  },

  fetchTasks: async () => {
    set({ loading: true });
    const res = await axios.get(API + "/tasks", {
      headers: { Authorization: get().token }
    });
    set({ tasks: res.data, loading: false });
  },

  addTask: async (task) => {
    await axios.post(API + "/tasks", task, {
      headers: { Authorization: get().token }
    });
    get().fetchTasks();
  },

  deleteTask: async (id) => {
    await axios.delete(API + "/tasks/" + id, {
      headers: { Authorization: get().token }
    });
    get().fetchTasks();
  },

  updateTask: async (id, data) => {
    await axios.put(API + "/tasks/" + id, data, {
      headers: { Authorization: get().token }
    });
    get().fetchTasks();
  }
}));