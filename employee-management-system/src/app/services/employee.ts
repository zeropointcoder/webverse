import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Employee } from '../models/employee.model'
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  http: HttpClient = inject(HttpClient)
  baseUrl: String = `http://localhost:3000`

  constructor() {}

  onLoad(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employees`).pipe(
      map((res: Employee[]) => res)
    )
  }

  onAdd(empObj: any): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/employees`, empObj).pipe(
      map((res: Employee) => res)
    )
  }

  onUpdate(empObj: any, empid: String): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/employees/${empid}`, empObj).pipe(
      map((res: Employee) => res)
    )
  }

  onDelete(empid: String): Observable<Employee> {
    return this.http.delete<Employee>(`${this.baseUrl}/employees/${empid}`).pipe(
      map((res: Employee) => res)
    )
  }

}
