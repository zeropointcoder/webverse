import { configureStore } from '@reduxjs/toolkit'
import employerReducer from './employee/employeeSlice'

const store = configureStore({reducer: {employee: employerReducer,}})

export default store