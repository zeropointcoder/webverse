import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { EmployeeService } from '../../services/employee'
import { Employee } from '../../models/employee.model'
import { HttpErrorResponse } from '@angular/common/http'

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

  employees: any = []
  employeeNew: Employee = new Employee
  employeeEdit: Employee = new Employee
  
  empid: String = ''

  constructor() {
    this.empForm = this.fb.group({
      fullname: [''],
      phone: [''],
      email: ['']
    })
  }

  ngOnInit(): void {
    this.onLoad()
  }

  onLoad(): void {
    this.es.onLoad().subscribe({
      next: (res: any) => {
        this.employees = res.users
      },
      error: (err: HttpErrorResponse) => console.error(err?.message),
      complete: () => {}
    })
  }

  onAdd(): void {

  }

  onUpdate(): void {

  }

  onDelete(): void {

  }

  onUpdateCta(): void {

  }

  onReset(): void {

  }
  
  onCloseModal(): void {

  }
  
}
