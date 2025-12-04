import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { rejectWithValue } from 'react-redux'
import axios from 'axios'

const initialState = {
    employees: [],
    employeeNew: {},
    employeeEdit: {}
}

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        // onLoadSuccess: (state, {payload}) => ({
        //     ...state,
        //     employees: payload
        // }),
        // onAddSuccess: (state, {payload}) => ({
        //     ...state,
        //     employeeNew: payload,
        //     employeeEdit: {}
        // }),
        // onUpdateSuccess: (state, {payload}) => ({
        //     ...state,
        //     employeeEdit: payload,
        //     employeeNew: {}
        // }),
        // onDeleteSuccess: (state, {payload}) => ({
        //     ...state,
        //     employeeNew: payload,
        //     employeeEdit: payload
        // }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(onLoadThunk.pending, (state, {payload}) => ({
                ...state,
                employees: []
            }))
            .addCase(onLoadThunk.fulfilled, (state, {payload}) => ({
                ...state,
                employees: payload
            }))
            .addCase(onLoadThunk.rejected, (state, {payload}) => ({
                ...state,
                employees: []
            }))
            .addCase(onAddThunk.pending, (state, {payload}) => ({
                ...state,
                employeeNew: {},
                employeeEdit: {}
            }))
            .addCase(onAddThunk.fulfilled, (state, {payload}) => ({
                ...state,
                employeeNew: payload,
                employeeEdit: {}
            }))
            .addCase(onAddThunk.rejected, (state, {payload}) => ({
                ...state,
                employeeNew: {},
                employeeEdit: {}
            }))
            .addCase(onUpdateThunk.pending, (state, {payload}) => ({
                ...state,
                employeeEdit: {},
                employeeNew: {}
            }))
            .addCase(onUpdateThunk.fulfilled, (state, {payload}) => ({
                ...state,
                employeeEdit: payload,
                employeeNew: {}
            }))
            .addCase(onUpdateThunk.rejected, (state, {payload}) => ({
                ...state,
                employeeEdit: {},
                employeeNew: {}
            }))
            .addCase(onDeleteThunk.pending, (state, {payload}) => ({
                ...state,
                employeeNew: {},
                employeeEdit: {}
            }))
            .addCase(onDeleteThunk.fulfilled, (state, {payload}) => ({
                ...state,
                employeeNew: payload,
                employeeEdit: payload
            }))
            .addCase(onDeleteThunk.rejected, (state, {payload}) => ({
                ...state,
                employeeNew: {},
                employeeEdit: {}
            }))
    }
})

export const onLoadThunk = createAsyncThunk(
    'employee/onLoadThunk',
    async (args, {rejectWithValue}) => {
        try {
            const {data} = await axios.get('http://localhost:5400/employees')
            return data
        } catch (error) {
            rejectWithValue(error)
            // console.table(error)
        }
    }
)

export const onAddThunk = createAsyncThunk(
    'employee/onAddThunk',
    async ({empObj}, {rejectWithValue}) => {
        try {
            const {data} = await axios.post(`http://localhost:5400/employees`, empObj)
            return data
        } catch (error) {
            rejectWithValue(error)
            // console.table(error)
        }
    }
)

export const onUpdateThunk = createAsyncThunk(
    'employee/onUpdateThunk',
    async ({empObj, empid}, {rejectWithValue}) => {
        try {
            const {data} = await axios.put(`http://localhost:5400/employees/${empid}`, empObj)
            return data
        } catch (error) {
            rejectWithValue(error)
            // console.table(error)
        }
    }
)

export const onDeleteThunk = createAsyncThunk(
    'employee/onDeleteThunk',
    async ({empid}, {rejectWithValue}) => {
        try {
            const {data} = await axios.delete(`http://localhost:5400/employees/${empid}`)
            return data
        } catch (error) {
            rejectWithValue(error)
            // console.table(error)
        }
    }
)

// export const {onLoadSuccess, onAddSuccess, onUpdateSuccess, onDeleteSuccess} = employeeSlice.actions
export default employeeSlice.reducer
