import { createAction, props } from '@ngrx/store'
import { Employee } from '../../models/employee.model'

export const onLoad = createAction(
    '[EMPLOYEE] ON LOAD'
)

export const onLoadSuccess = createAction(
    '[EMPLOYEE] ON LOAD SUCCESS',
    props<{employees: Employee[]}>()
)

export const onAdd = createAction(
    '[EMPLOYEE] ON ADD',
    props<{empObj: any}>()
)

export const onAddSuccess = createAction(
    '[EMPLOYEE] ON ADD SUCCESS',
    props<{employeeNew: Employee}>()
)

export const onUpdate = createAction(
    '[EMPLOYEE] ON UPDATE',
    props<{empObj: any, empid: String}>()
)

export const onUpdateSuccess = createAction(
    '[EMPLOYEE] ON DELETE SUCCESS',
    props<{employeeEdit: Employee}>()
)

export const onDelete = createAction(
    '[EMPLOYEE] ON DELETE',
    props<{empid: String}>()
)

export const onDeleteSuccess = createAction(
    '[EMPLOYEE] ON DELETE SUCCESS',
    props<{employee: Employee}>()
)