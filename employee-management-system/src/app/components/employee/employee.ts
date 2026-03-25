import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { EmployeeService } from '../../services/employee'
import { Employee } from '../../models/employee.model'
import { HttpErrorResponse } from '@angular/common/http'
import { retry } from 'rxjs'

@Component({
  selector: 'app-employee',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class EmployeeComponent implements OnInit {
  es: EmployeeService = inject(EmployeeService)
  fb: FormBuilder = inject(FormBuilder)

  empForm!: FormGroup

  employees: Employee[] = []
  employeeNew: Employee = new Employee
  employeeEdit: Employee = new Employee
  
  empid: String = ''

  constructor() {}

  ngOnInit(): void {
    this.empForm = this.fb.group({
      fullname: [''],
      phone: [''],
      email: ['']
    })

    this.onLoad()
  }

  onLoad(): void {
    this.es.onLoad().pipe(retry(2)).subscribe({
      next: (res: Employee[]) => {
        this.employees = res || []
      },
      error: (err: HttpErrorResponse) => console.error('LOAD ERROR => ', err),
      complete: () => {}
    })
  }

  onAdd(): void {
    if(this.empForm.value.fullname == '' || this.empForm.value.phone == '' || this.empForm.value.email == '') {
      return
    }

    const empObj = {
      fullname: this.empForm.value.fullname,
      phone: this.empForm.value.phone,
      email: this.empForm.value.email
    }

    this.es.onAdd(empObj).subscribe({
      next: (res: Employee) => {
        this.employeeNew = res
        this.employeeEdit = new Employee
        
        this.onResetForm()
        this.onCloseModal()
        this.onLoad()
      },
      error: (err: HttpErrorResponse) => console.error('LOAD ERROR => ', err),
      complete: () => {}
    })
  }

  onUpdate(): void {
    if(this.empForm.value.fullname == '' || this.empForm.value.phone == '' || this.empForm.value.email == '') {
      return
    }

    const empObj = {
      fullname: this.empForm.value.fullname,
      phone: this.empForm.value.phone,
      email: this.empForm.value.email
    }

    this.es.onUpdate(empObj, this.empid).subscribe({
      next: (res: Employee) => {
        this.employeeEdit = res
        this.employeeNew = new Employee

        this.onResetForm()
        this.onCloseModal()
        this.onLoad()
      },
      error: (err: HttpErrorResponse) => console.error('LOAD ERROR => ', err),
      complete: () => {}
    })
  }

  onDelete(empid: String): void {
    this.es.onDelete(empid).subscribe({
      next: (res: Employee) => {
        this.employeeNew = res
        this.employeeEdit = res

        this.onResetForm()
        this.onLoad()
      },
      error: (err: HttpErrorResponse) => console.error('LOAD ERROR => ', err),
      complete: () => {}
    })
  }

  onUpdateCta(employee: Employee): void {
    this.empForm.controls['fullname'].setValue(employee.fullname)
    this.empForm.controls['phone'].setValue(employee.phone)
    this.empForm.controls['email'].setValue(employee.email)

    this.empid = employee.id
  }

  onResetForm(): void {
    // this.empForm.reset()

    this.empForm.controls['fullname'].setValue('')
    this.empForm.controls['phone'].setValue('')
    this.empForm.controls['email'].setValue('')

    this.empid = ''
  }
  
  onCloseModal(): void {
    const btnclose = document.getElementById('btn-close')
    btnclose?.click()
  }
  
}
