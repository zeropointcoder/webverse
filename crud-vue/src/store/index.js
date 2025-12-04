import { reactive, readonly } from 'vue'
import axios from 'axios'

const state = reactive({
    employees: [],
    employeeNew: {},
    employeeEdit: {}
})

const methods = {
    onLoad: async () => {
        try {
            const {data} = await axios.get('http://localhost:3000/employees')
            methods.onLoadSuccess(data)
        } catch (error) {
            console.table([error])
        }
    },
    onLoadSuccess: (employees) => {
        state.employees = employees
    },
    onAdd: async (empObj) => {
        try {
            const {data} = await axios.post('http://localhost:3000/employees', empObj)
            methods.onAddSuccess(data)
        } catch (error) {
            console.table([error])
        }
    },
    onAddSuccess: (employeeNew) => {
        state.employeeNew = employeeNew
        state.employeeEdit = {}
    },
    onUpdate: async (empObj, empid) => {
        try {
            const {data} = await axios.put(`http://localhost:3000/employees/${empid}`, empObj)
            methods.onUpdateSuccess(data)
        } catch (error) {
           console.table([error]) 
        }
    },
    onUpdateSuccess: (employeeEdit) => {
        state.employeeEdit = employeeEdit
        state.employeeNew = {}
    },
    onDelete: async (empid) => {
        try {
            const {data} = await axios.delete(`http://localhost:3000/employees/${empid}`)
            methods.onDeleteSuccess(data)
        } catch (error) {
            console.table([error])
        }
    },
    onDeleteSuccess: (employee) => {
        state.employeeNew = employee
        state.employeeEdit = employee
    },
}

const getters = {}

export default {
    state: readonly(state),
    methods,
    getters,
}
