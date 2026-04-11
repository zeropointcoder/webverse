import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    students: [],
    studentNew: {},
    studentEdit: {}
}

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        onLoadSuccess: (state, {payload}) => ({
            ...state,
            students: payload
        }),
        onAddSuccess: (state, {payload}) => ({
            ...state,
            studentNew: payload,
            studentEdit: {},
            students: [...state.students, payload]
        }),
        onUpdateSuccess: (state, {payload}) => ({
            ...state,
            studentEdit: payload,
            studentNew: {},
            students: state.students.map(stu => stu.id === payload.id ? payload : stu)
        }),
        onDeleteSuccess: (state, {payload}) => ({
            ...state,
            studentNew: {},
            studentEdit: {},
            students: state.students.filter(stu => stu.id !== payload.id)
        }),
    },
})

export const {onLoadSuccess, onAddSuccess, onUpdateSuccess, onDeleteSuccess} = studentSlice.actions

export default studentSlice.reducer