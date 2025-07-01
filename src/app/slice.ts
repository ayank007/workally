import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    channels: []
}

export const channelSlice = createSlice({
    name: "Channel",
    initialState,
    reducers: {
        addChannelReducer: (state, action) => {
            state.channels = action.payload;
        },
        removeChannelReducer: (state, action) => {
            state.channels = state.channels.filter((channel:Channel)=>{
                return channel.id !== action.payload;
            })
        }
    }
})

export const {addChannelReducer, removeChannelReducer} = channelSlice.actions;

export default channelSlice.reducer;