import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { AsyncPipe } from '@angular/common'
// import { HttpErrorResponse } from '@angular/common/http'
// import { Observable, retry } from 'rxjs'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { EmployeeService } from '../../services/employee'
import { Employee } from '../../models/employee.model'
// import { onAdd, onAddSuccess, onDelete, onDeleteSuccess, onLoad, onLoadSuccess, onUpdate, onUpdateSuccess } from '../../store/employee/employee.action'
import { onAdd, onDelete, onLoad, onUpdate } from '../../store/employee/employee.action'
import { selectEmployeeEdit, selectEmployeeNew, selectEmployees } from '../../store/employee/employee.select'

@Component({
  selector: 'app-employee',
  imports: [FormsModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class EmployeeComponent implements OnInit {
  store: Store = inject(Store)
  es: EmployeeService = inject(EmployeeService)
  fb: FormBuilder = inject(FormBuilder)

  empForm!: FormGroup

  // employees: Employee[] = []
  employees$: Observable<Employee[]> = this.store.select(selectEmployees)

  // employeeNew: Employee = new Employee
  employeeNew$: Observable<Employee> = this.store.select(selectEmployeeNew)

  // employeeEdit: Employee = new Employee
  employeeEdit$: Observable<Employee> = this.store.select(selectEmployeeEdit)
  
  empid: String = ''

  departments = ['Engineering', 'HR', 'Sales']
  employmenttypes = ['Full-time', 'Part-time', 'Contract']

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.empForm = this.fb.group({
      fullname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],

      jobtitle: [''],
      department: [''],
      dateofjoining: [''],

      employmenttype: [''],
      address: [''],
      profileimage: [''],
    })

    // this.onLoad()
    this.store.dispatch(onLoad())
  }

  // onLoad(): void {
  //   this.es.onLoad().pipe(retry(2)).subscribe({
  //     next: (res: Employee[]) => {
  //       // this.employees = res || []
  //       this.store.dispatch(onLoadSuccess({employees: res}))
  //     },
  //     error: (err: HttpErrorResponse) => console.error('LOAD ERROR => ', err),
  //     complete: () => {}
  //   })
  // }

  onAdd(): void {
    // if(this.empForm.value.fullname == '' || this.empForm.value.phone == '' || this.empForm.value.email == '') {
    //   return
    // }

    if(this.empForm.invalid) {
      return
    }

    // const empObj = {
    //   fullname: this.empForm.value.fullname,
    //   phone: this.empForm.value.phone,
    //   email: this.empForm.value.email,

    //   jobtitle: this.empForm.value.jobtitle,
    //   department: this.empForm.value.department,
    //   dateofjoining: this.empForm.value.dateofjoining,

    //   employmenttype: this.empForm.value.employmenttype,
    //   address: this.empForm.value.address,
    //   profileimage: this.empForm.value.profileimage
    // }

    const empObj = this.createEmpObj(this.empForm)
    
    // this.es.onAdd(empObj).subscribe({
    //   next: (res: Employee) => {
    //     // this.employeeNew = res
    //     // this.employeeEdit = new Employee
    //     this.store.dispatch(onAddSuccess({employeeNew: res}))
        
    //     this.onResetForm()
    //     this.onCloseModal()
    //     this.onLoad()
    //   },
    //   error: (err: HttpErrorResponse) => console.error('LOAD ERROR => ', err),
    //   complete: () => {}
    // })
    this.store.dispatch(onAdd({empObj}))
    this.onResetForm()
    this.onCloseModal()
    // this.store.dispatch(onLoad())
  }

  onUpdate(): void {
    // if(this.empForm.value.fullname == '' || this.empForm.value.phone == '' || this.empForm.value.email == '') {
    //   return
    // }

    if(this.empForm.invalid) {
      return
    }

    // const empObj = {
    //   fullname: this.empForm.value.fullname,
    //   phone: this.empForm.value.phone,
    //   email: this.empForm.value.email,

    //   jobTitle: this.empForm.value.jobtitle,
    //   department: this.empForm.value.department,
    //   dateofjoining: this.empForm.value.dateofjoining,

    //   employmenttype: this.empForm.value.employmenttype,
    //   address: this.empForm.value.address,
    //   profileimage: this.empForm.value.profileimage
    // }

    const empObj = this.createEmpObj(this.empForm)

    // this.es.onUpdate(empObj, this.empid).subscribe({
    //   next: (res: Employee) => {
    //     // this.employeeEdit = res
    //     // this.employeeNew = new Employee
    //     this.store.dispatch(onUpdateSuccess({employeeEdit: res}))

    //     this.onResetForm()
    //     this.onCloseModal()
    //     this.onLoad()
    //   },
    //   error: (err: HttpErrorResponse) => console.error('LOAD ERROR => ', err),
    //   complete: () => {}
    // })
    this.store.dispatch(onUpdate({empObj, empid: this.empid}))
    this.onResetForm()
    this.onCloseModal()
    // this.store.dispatch(onLoad())
  }

  onDelete(empid: String): void {
    // this.es.onDelete(empid).subscribe({
    //   next: (res: Employee) => {
    //     // this.employeeNew = res
    //     // this.employeeEdit = res
    //     this.store.dispatch(onDeleteSuccess({employee: res}))

    //     this.onResetForm()
    //     this.onLoad()
    //   },
    //   error: (err: HttpErrorResponse) => console.error('LOAD ERROR => ', err),
    //   complete: () => {}
    // })
    this.store.dispatch(onDelete({empid}))
    this.onResetForm()
    this.onCloseModal()
    // this.store.dispatch(onLoad())
  }

  createEmpObj(employeeForm: any): any {
    return {
      fullname: employeeForm.value.fullname,
      phone: employeeForm.value.phone,
      email: employeeForm.value.email,

      jobtitle: employeeForm.value.jobtitle,
      department: employeeForm.value.department,
      dateofjoining: employeeForm.value.dateofjoining,

      employmenttype: employeeForm.value.employmenttype,
      address: employeeForm.value.address,
      profileimage: employeeForm.value.profileimage
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0]

    if(!file) return

    // validate file type
    if(!file.type.startsWith('image/')) {
      alert('Only image files are allowed')
      return
    }

    // limit file size (up to 2MB)
    if(file.size > 2 * 1024 * 1024) {
      alert('Image must be less than 2MB')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      this.empForm.patchValue({
        profileimage: reader.result as string
      })
      this.cd.detectChanges(); // stabilise
    }

    reader.readAsDataURL(file)
  }

  onUpdateCta(employee: Employee): void {
    this.empForm.controls['fullname'].setValue(employee.fullname)
    this.empForm.controls['phone'].setValue(employee.phone)
    this.empForm.controls['email'].setValue(employee.email)

    this.empForm.controls['jobtitle'].setValue(employee.jobtitle)
    this.empForm.controls['department'].setValue(employee.department)
    this.empForm.controls['dateofjoining'].setValue(employee.dateofjoining)

    this.empForm.controls['employmenttype'].setValue(employee.employmenttype)
    this.empForm.controls['address'].setValue(employee.address)
    this.empForm.controls['profileimage'].setValue(employee.profileimage)

    this.empid = employee.id
  }

  onResetForm(): void {
    this.empForm.reset()

    // this.empForm.controls['fullname'].setValue('')
    // this.empForm.controls['phone'].setValue('')
    // this.empForm.controls['email'].setValue('')

    this.empid = ''
  }
  
  onCloseModal(): void {
    const btnclose = document.getElementById('btn-close')
    btnclose?.click()
  }
  
}
