import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const baseUrl = `http://localhost:5400`

const initialState = {
    students: [],
    studentNew: {},
    studentEdit: {}
}

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        // onLoadSuccess: (state, {payload}) => ({
        //     ...state,
        //     students: payload,
        //     studentNew: state.studentNew,
        //     studentEdit: state.studentEdit
        // }),
        // onAddSuccess: (state, {payload}) => ({
        //     ...state,
        //     studentNew: payload,
        //     studentEdit: {},
        //     students: [...state.students, payload]
        // }),
        // onUpdateSuccess: (state, {payload}) => ({
        //     ...state,
        //     studentEdit: payload,
        //     studentNew: {},
        //     students: state.students.map(stu => stu.id === payload.id ? payload : stu)
        // }),
        // onDeleteSuccess: (state, {payload}) => ({
        //     ...state,
        //     studentNew: {},
        //     studentEdit: {},
        //     students: state.students.filter(stu => stu.id !== payload.id)
        // }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(onLoadThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(onLoadThunk.fulfilled, (state, {payload}) => {
                state.loading = false
                state.students = payload
            })
            .addCase(onLoadThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            .addCase(onAddThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(onAddThunk.fulfilled, (state, {payload}) => {
                state.loading = false
                state.students.push(payload)
                state.studentNew = payload
                state.studentEdit = {}
            })
            .addCase(onAddThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            .addCase(onUpdateThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(onUpdateThunk.fulfilled, (state, {payload}) => {
                state.loading = false
                state.students = state.students.map(studen => studen.id === payload.id ? payload : studen)
                state.studentEdit = payload
                state.studentNew = {}
            })
            .addCase(onUpdateThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            .addCase(onDeleteThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(onDeleteThunk.fulfilled, (state, {payload}) => {
                state.loading = false
                state.students = state.students.filter(studen => studen.id !== payload.id)
                state.studentNew = {}
                state.studentEdit = {}
            })
            .addCase(onDeleteThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
    }
})

export const onLoadThunk = createAsyncThunk(
    'student/onLoadThunk',
    async (args, {rejectWithValue}) => {
        try {
            const {data} = await axios.get(`${baseUrl}/students`)
            return data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const onAddThunk = createAsyncThunk(
    'student/onAddThunk',
    async ({studentObj}, {rejectWithValue}) => {
        try {
            const {data} = await axios.post(`${baseUrl}/students`, studentObj)
            return data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const onUpdateThunk = createAsyncThunk(
    'student/onUpdateThunk',
    async ({studentObj, studentId}, {rejectWithValue}) => {
        try {
            const {data} = await axios.put(`${baseUrl}/students/${studentId}`, studentObj)
            return data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const onDeleteThunk = createAsyncThunk(
    'student/onDeleteThunk',
    async ({studentId}, {rejectWithValue}) => {
        try {
            const {data} = await axios.delete(`${baseUrl}/students/${studentId}`)
            return data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

// export const {onLoadSuccess, onAddSuccess, onUpdateSuccess, onDeleteSuccess} = studentSlice.actions

export default studentSlice.reducer