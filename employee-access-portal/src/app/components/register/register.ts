import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms"
import { AuthService } from "../../services/auth"
import { Router, RouterLink } from "@angular/router"

@Component({
  selector: "app-register",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./register.html",
  styleUrl: "./register.css",
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup
  errorMessage: string = ''
  successMessage: string = ''

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullname: ['', Validators.required],
      position: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }
  
  register(): void {
    this.successMessage = ''
    this.errorMessage = ''
    
    if(this.registerForm.value.fullname === '' || this.registerForm.value.position === '' || this.registerForm.value.email === '' || this.registerForm.value.password === '') {
      return
    }

    const success = this.auth.register({
      id: Date.now(),
      fullname: this.registerForm.value.fullname,
      position: this.registerForm.value.position,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    })

    if(success) {
      this.successMessage = 'Registration successful! Redirecting to login page..'
      setTimeout(() => this.router.navigate(['/login']), 3000)
    } else {
      this.errorMessage = 'Email already exists'
    }
  }
}
