import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    urls: [],
    loading: false,
    error: null,
};

const urlSlice = createSlice({
    name: "urls",
    initialState,
    reducers: {
        setUrls(state, action) {
            state.urls = Array.isArray(action.payload) ? action.payload : [];
        },
        addUrl(state, action) {
            if (action.payload) {
                state.urls.unshift(action.payload);
            }
        },
        editUrl(state, action) {
            if (!action.payload || !action.payload._id) {
                return;
            }
            const index = state.urls.findIndex(url => url._id === action.payload._id);
            if (index !== -1) {
                state.urls[index] = action.payload;
            }
        },
        deleteUrl(state, action) {
            if (action.payload) {
                state.urls = state.urls.filter(url => url._id !== action.payload);
            }
        },
        setLoading(state, action) {
            state.loading = Boolean(action.payload);
        },
        setError(state, action) {
            state.error = action.payload ? String(action.payload) : null;
        },
    },
});

export const { setUrls, addUrl, editUrl, deleteUrl, setLoading, setError } = urlSlice.actions;
export default urlSlice.reducer;
