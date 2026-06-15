import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms"
import { AuthService } from "../../services/auth"
import { Router, RouterLink } from "@angular/router"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./login.html",
  styleUrl: "./login.css",
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  errorMessage = ''

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(): void {
    this.errorMessage = ''
    
    if(this.loginForm.value.email === '' || this.loginForm.value.password === '') {
      return
    }

    const success = this.auth.login(
      this.loginForm.value.email!,
      this.loginForm.value.password
    )

    if(success) {
      this.router.navigate(['/dashboard'])
    } else {
      this.errorMessage = 'Invalid email or password!'
    }
  }
}
