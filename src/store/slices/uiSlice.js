import { createSlice } from '@reduxjs/toolkit';

const savedTheme = localStorage.getItem('wordx_theme') || 'light';

const initialState = {
  sidebarOpen: true,
  sidebarCollapsed: false,
  theme: savedTheme,
  language: localStorage.getItem('wordx_lang') || 'en',
  direction: localStorage.getItem('wordx_lang') === 'ar' ? 'rtl' : 'ltr',
  activeModal: null,
  toasts: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen(state, action) {
      state.sidebarOpen = action.payload;
    },
    toggleSidebarCollapsed(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setTheme(state, action) {
      state.theme = action.payload;
      localStorage.setItem('wordx_theme', action.payload);
      document.documentElement.setAttribute('data-theme', action.payload);
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('wordx_theme', state.theme);
      document.documentElement.setAttribute('data-theme', state.theme);
    },
    setLanguage(state, action) {
      state.language = action.payload;
      state.direction = action.payload === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem('wordx_lang', action.payload);
      document.documentElement.setAttribute('dir', state.direction);
      document.documentElement.setAttribute('lang', action.payload);
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    openModal(state, action) {
      state.activeModal = action.payload;
    },
    closeModal(state) {
      state.activeModal = null;
    },
    addToast(state, action) {
      state.toasts.push({
        id: Date.now().toString(),
        ...action.payload,
      });
    },
    removeToast(state, action) {
      state.toasts = state.toasts.filter(t => t.id !== action.payload);
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleSidebarCollapsed,
  setTheme,
  toggleTheme,
  setLanguage,
  setSearchQuery,
  openModal,
  closeModal,
  addToast,
  removeToast,
} = uiSlice.actions;

export default uiSlice.reducer;
