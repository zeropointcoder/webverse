import { Component, OnInit } from "@angular/core"
import { AuthService } from "../core/services/auth"
import { Router } from "@angular/router"

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css",
})
export class DashboardComponent {

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout()
    this.router.navigate(['/login'])
  }
}
