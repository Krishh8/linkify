import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    loadingUser: true, // 🚨 Important
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loadingUser = false; // ✅ Done loading
        },
        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.loadingUser = false; // ✅ Done loading
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
