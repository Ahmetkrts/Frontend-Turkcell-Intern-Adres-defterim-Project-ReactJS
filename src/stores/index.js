import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Counter'
import authReducer from './Auth'

export default configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer
    },
})