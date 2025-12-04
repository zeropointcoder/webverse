<script setup>
import { inject, onMounted, ref } from 'vue'
// import axios from 'axios'

// const employees = ref([])
// const employeeNew = ref({})
// const employeeEdit = ref({})

const empid = ref({})

const fullname = ref('')
const phone = ref('')
const email = ref('')

const store = inject('store')

onMounted(() => {
    // onLoad()

    store.methods.onLoad()
})

// const onLoad = async () => {
//     try {
//         const {data} = await axios.get('http://localhost:3000/employees')
//         employees.value = data
//     } catch (error) {
//         console.table([error])
//     }
// }

const onAdd = async () => {
    if(fullname.value === '' || phone.value === '' || email.value === '') {
        return
    }

    const empObj = {
        fullname: fullname.value,
        phone: phone.value,
        email: email.value
    }

    // try {
    //     const {data} = await axios.post('http://localhost:3000/employees', empObj)
    //     employeeNew.value = data
    //     employeeEdit.value = {}

    //     onResetForm()
    //     onCloseModal()
    //     onLoad()
    // } catch (error) {
    //     console.table([error])
    // }

    store.methods.onAdd(empObj)
    onResetForm()
    onCloseModal()
    store.methods.onLoad()
}

const onUpdate = async () => {
    if(fullname.value === '' || phone.value === '' || email.value === '') {
        return
    }

    const empObj = {
        fullname: fullname.value,
        phone: phone.value,
        email: email.value
    }

    // try {
    //     const {data} = await axios.put(`http://localhost:3000/employees/${empid.value}`, empObj)
    //     employeeEdit.value = data
    //     employeeNew.value = {}

    //     onResetForm()
    //     onCloseModal()
    //     onLoad()
    // } catch (error) {
    //    console.table([error])
    // }

    store.methods.onUpdate(empObj, empid.value)
    onResetForm()
    onCloseModal()
    store.methods.onLoad()
}

const onDelete = async (empid) => {
    // try {
    //     const {data} = await axios.delete(`http://localhost:3000/employees/${empid}`)
    //     employeeNew.value = data
    //     employeeEdit.value = data

    //     onResetForm()
    //     onLoad()
    // } catch (error) {
    //     console.table([error])
    // }

    store.methods.onDelete(empid)
    onResetForm()
    store.methods.onLoad()
}

const onUpdateCta = (employee) => {
    fullname.value = employee.fullname
    phone.value = employee.phone
    email.value = employee.email

    empid.value = employee.id
}

const onResetForm = () => {
    fullname.value = ''
    phone.value = ''
    email.value = ''

    empid.value = ''
}

const onCloseModal = () => {
    const btnclose = document.getElementById('btn-close')
    btnclose?.click()
}
</script>

<template>
    <div class="table-responsive">
        <table class="table table-success">
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
                <tr v-for="(employee, index) in store.state.employees" :key="index">
                    <th scope="row">{{index+1}}</th>
                    <td>{{employee.id}}</td>
                    <td>
                        <button @click="onUpdateCta(employee)" type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#employeeFormModal">update</button>
                    </td>
                    <td>
                        <button @click="onDelete(employee.id)" type="button" class="btn btn-secondary btn-sm">delete</button>
                    </td>
                    <td>{{employee.fullname}}</td>
                    <td>{{employee.phone}}</td>
                    <td>{{employee.email}}</td>
                </tr>
            </tbody>
        </table>

        <div class="modal fade" id="employeeFormModal" tabindex="-1" aria-labelledby="employeeFormModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5 text-uppercase text-dark" id="employeeFormModalLabel">Employee form</h1>
                        <button type="button" id="btn-close" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="fullname" class="form-label">fullname</label>
                                <input v-model="fullname" type="text" class="form-control" id="fullname" name="fullname" />
                            </div>
                            <div class="mb-3">
                                <label for="phone" class="form-label">phone</label>
                                <input v-model="phone" type="text" class="form-control" id="phone" name="phone" />
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">email</label>
                                <input v-model="email" type="email" class="form-control" id="email" name="email" />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">cancel</button>
                        <button @click="onUpdate()" type="button" class="btn btn-info btn-sm">update</button>
                        <button @click="onAdd()" type="button" class="btn btn-danger btn-sm">add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
