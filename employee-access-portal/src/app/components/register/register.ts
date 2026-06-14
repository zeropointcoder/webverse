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
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }
  
  register(): void {
    if(this.registerForm.value.username === '' || this.registerForm.value.email === '' || this.registerForm.value.password === '') {
      return
    }

    const success = this.auth.register({
      id: Date.now(),
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    })

    if(success) {
      alert('Registration successful')
      this.router.navigate(['/login'])
    } else {
      alert('Email already exists')
    }
  }
}
