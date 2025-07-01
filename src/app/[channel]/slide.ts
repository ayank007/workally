import {createSlice, nanoid} from '@reduxjs/toolkit'

const initialState = {
    subjects: []
}

export const subjectSlice = createSlice({
    name: "subject",
    initialState,
    reducers: {
        addSubject: (state, action) => {
            
        }
    }
})