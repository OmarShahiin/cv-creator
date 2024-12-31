import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode')
    : window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'light'
    : 'light',
  language: localStorage.getItem('language') || 'en', // Default to 'en' if no language is set
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log('action', action);
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },

    changeMode: (state) => {
      if (state.mode === 'light') {
        state.mode = 'dark';
        localStorage.setItem('mode', 'dark');
      } else {
        state.mode = 'light';
        localStorage.setItem('mode', 'light');
      }
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem('language', action.payload);
    },
    logout: (state) => {
      localStorage.removeItem('user');
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
});

export const { setCredentials, changeMode, setLanguage, logout } = userSlice.actions;

export default userSlice.reducer;
