import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
// import { onAddSuccess, onDeleteSuccess, onLoadSuccess, onUpdateSuccess } from '../store/employee/employeeSlice'
import { onAddThunk, onDeleteThunk, onLoadThunk, onUpdateThunk } from '../store/employee/employeeSlice'

function Employee() {

    // const [employees, setEmployees] = useState([])
    // const [employeeNew, setEmployeeNew] = useState({})
    // const [employeeEdit, setEmployeeEdit] = useState({})

    const {employees, employeeNew, employeeEdit} = useSelector(state => state.employee)
    // const employeeNew = useSelector(state => state.employee.employeeNew)
    // const employeeEdit = useSelector(state => state.employee.employeeEdit)

    const dispatch = useDispatch()

    const [empid, setEmpid] = useState('')

    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        // onLoad()
        dispatch(onLoadThunk())
    }, [])

    // const onLoad = async () => {
    //     try {
    //         const {data} = await axios.get('http://localhost:5400/employees')
    //         // setEmployees(data)

    //         dispatch(onLoadSuccess(data))
    //     } catch (error) {
    //         console.table([error])
    //     }
    // }

    const onAdd = async () => {
        if(fullname === '' || phone === '' || email === '') {
            return
        }

        const empObj = {
            fullname: fullname,
            phone: phone,
            email: email
        }

        // try {
        //     const {data} = await axios.post(`http://localhost:5400/employees`, empObj)
        //     // setEmployeeNew(data)
        //     // setEmployeeEdit({})

        //     dispatch(onAddSuccess(data))
        //     onResetForm()
        //     onCloseModal()
        //     onLoad()
        // } catch (error) {
        //     console.table([error])
        // }

        dispatch(onAddThunk({empObj}))
        onResetForm()
        onCloseModal()
        dispatch(onLoadThunk())
    }

    const onUpdate = async () => {
        if(fullname === '' || phone === '' || email === '') {
            return
        }

        const empObj = {
            fullname: fullname,
            phone: phone,
            email: email
        }

        // try {
        //     const {data} = await axios.put(`http://localhost:5400/employees/${empid}`, empObj)
        //     // setEmployeeEdit(data)
        //     // setEmployeeNew({})

        //     dispatch(onUpdateSuccess(data))
        //     onResetForm()
        //     onCloseModal()
        //     onLoad()
        // } catch (error) {
        //     console.table([error])
        // }

        dispatch(onUpdateThunk({empObj, empid}))
        onResetForm()
        onCloseModal()
        dispatch(onLoadThunk())
    }

    const onDelete = async (empid) => {
        // try {
        //     const {data} = await axios.delete(`http://localhost:5400/employees/${empid}`)
        //     // setEmployeeNew(data)
        //     // setEmployeeEdit(data)

        //     dispatch(onDeleteSuccess(data))
        //     onResetForm()
        //     onLoad()
        // } catch (error) {
        //     console.table([error])
        // }

        dispatch(onDeleteThunk({empid}))
        onResetForm()
        dispatch(onLoadThunk())
    }

    const onUpdateCta = (employee) => {
        setFullname(employee.fullname)
        setPhone(employee.phone)
        setEmail(employee.email)

        setEmpid(employee.id)
    }

    const onResetForm = () => {
        setFullname('')
        setPhone('')
        setEmail('')

        setEmpid('')
    }

    const onCloseModal = () => {
        const btnclose = document.getElementById('btn-close')
        btnclose?.click()
    }

    return (
        <div className="table-responsive">
            <table className="table table-info">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">uid</th>
                        <th scope="col">update</th>
                        <th scope="col">delete</th>
                        <th scope="col">fullname</th>
                        <th scope="col">phone</th>
                        <th scope="col">email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.length > 0 ? employees.map((employee, index) => (
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{employee.id}</td>
                                <td>
                                    <button onClick={() => onUpdateCta(employee)} type='button' className='btn btn-info btn-sm' data-bs-toggle='modal' data-bs-target='#employeeFormModal'>update</button>
                                </td>
                                <td>
                                    <button onClick={() => onDelete(employee.id)} type='button' className='btn btn-secondary btn-sm'>delete</button>
                                </td>
                                <td>{employee.fullname}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.email}</td>
                            </tr>
                        )) : (
                            <tr className='text-center'>
                                <td colSpan={7}>No records to display</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

            <div className="modal fade" id="employeeFormModal" tabIndex="-1" aria-labelledby="employeeFormModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-uppercase text-dark" id="employeeFormModalLabel">Employee form</h1>
                        <button type="button" id='btn-close' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="fullname" className="form-label">fullname</label>
                                <input value={fullname} onChange={(e) => setFullname(e.target.value)} type="text" className="form-control" id="fullname" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">phone</label>
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className="form-control" id="phone" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">cancel</button>
                        <button onClick={() => onUpdate()} type="button" className="btn btn-info btn-sm">update</button>
                        <button onClick={() => onAdd()} type='button' className='btn btn-danger btn-sm'>add</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Employee
