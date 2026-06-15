import { Component, OnInit } from "@angular/core"
import { AuthService } from "../../services/auth"
import { Router } from "@angular/router"
import { User } from "../../models/user.model"

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css",
})
export class DashboardComponent implements OnInit {
  employees!: User[]

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.employees = this.auth.getUsers()
  }

  logout() {
    this.auth.logout()
    this.router.navigate(['/login'])
  }
}
