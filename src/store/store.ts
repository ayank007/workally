import { configureStore } from '@reduxjs/toolkit'
import channelSlice from './channelSlice';
import themeSlice from './themeSlice';

export const store = configureStore({
    reducer: {
        channelList: channelSlice,
        uiTheme: themeSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store['getState']>
export type AppDispatch = typeof store['dispatch'];