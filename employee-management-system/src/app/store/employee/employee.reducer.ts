import { createReducer, on } from '@ngrx/store'
import { Employee } from '../../models/employee.model'
import { onAddSuccess, onDeleteSuccess, onLoadSuccess, onUpdateSuccess } from './employee.action'

export interface EmployeeState {
    employees: Employee[]
    employeeNew: Employee
    employeeEdit: Employee
}

export const initialState: EmployeeState = {
    employees: [],
    employeeNew: new Employee,
    employeeEdit: new Employee
}

export const employeeReducer = createReducer(
    initialState,
    on(onLoadSuccess, (state, {employees}) => ({
        ...state,
        employees: employees
    })),
    on(onAddSuccess, (state, {employeeNew}) => ({
        ...state,
        employees: [...state.employees, employeeNew],
        employeeNew: employeeNew,
        employeeEdit: new Employee
    })),
    on(onUpdateSuccess, (state, {employeeEdit}) => ({
        ...state,
        employees: state.employees.map(emp => 
            emp.id === employeeEdit.id ? employeeEdit : emp
        ),
        employeeEdit: employeeEdit,
        employeeNew: new Employee
    })),
    on(onDeleteSuccess, (state, {employee}) => ({
        ...state,
        employees: state.employees.filter(emp => 
            emp.id !== employee.id
        ),
        employeeNew: employee,
        employeeEdit: employee
    })),
)