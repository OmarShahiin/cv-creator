import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
  mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode')
    : window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  language: localStorage.getItem('language') || 'en', // Default to 'en' if no language is set
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setToken: (state, action) => {
      state.token = action.payload;
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
  },
});

export const { setCredentials, setToken, changeMode, setLanguage } = userSlice.actions;

export default userSlice.reducer;
