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
            state.urls = action.payload;
        },
        addUrl(state, action) {
            state.urls.unshift(action.payload);
        },
        editUrl: function (state, action) {
            const index = state.urls.findIndex(url => url._id === action.payload._id);
            if (index !== -1) {
                state.urls[index] = action.payload;
            }
        },
        deleteUrl(state, action) {
            state.urls = state.urls.filter(url => url._id !== action.payload);
        },

        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setUrls, addUrl, editUrl, deleteUrl, setLoading, setError } = urlSlice.actions;
export default urlSlice.reducer;
