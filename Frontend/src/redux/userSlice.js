import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    loadingUser: true,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            if (action.payload) {
                state.user = action.payload;
                state.isAuthenticated = true;
            } else {
                state.user = null;
                state.isAuthenticated = false;
            }
            state.loadingUser = false;
        },
        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.loadingUser = false;
        },
        setLoadingUser(state, action) {
            state.loadingUser = action.payload;
        },
    },
});

export const { setUser, clearUser, setLoadingUser } = userSlice.actions;
export default userSlice.reducer;
