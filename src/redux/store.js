import {configureStore} from '@reduxjs/toolkit'
import notebookReducer from './notebookSlice'
export const store = configureStore({
    reducer: {
        notebook: notebookReducer,
    }
})
