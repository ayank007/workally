import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

export interface ChannelListState {
    value: Channel[];
}

const initialState: ChannelListState = {
    value: []
};

export const channelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {
        channelReducer: (state, action: PayloadAction<ChannelListState>) => {
            console.log(action.payload.value);
            
            state.value = action.payload.value;
        }
    },
});

export const {channelReducer} = channelSlice.actions;

export default channelSlice.reducer;