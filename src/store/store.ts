import { configureStore } from '@reduxjs/toolkit'
import channelSlice from './channelSlice';

export const store = configureStore({
    reducer: {
        channelList: channelSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store['getState']>
export type AppDispatch = typeof store['dispatch'];