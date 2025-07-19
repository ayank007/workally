import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

export interface themeState {
    value: string;
}

const initialState: themeState = {
    value: "dark"
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        themeReducer: (state, action: PayloadAction<themeState>) => {
            console.log(action.payload.value);
            
            state.value = action.payload.value;
        }
    },
});

export const {themeReducer} = themeSlice.actions;

export default themeSlice.reducer;