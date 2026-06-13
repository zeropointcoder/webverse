import { Component, OnInit } from "@angular/core"
import { Router, RouterLink } from "@angular/router"
import { AuthService } from "../core/services/auth"
import { User } from "../core/models/user.model"

@Component({
  selector: "app-header",
  imports: [RouterLink],
  templateUrl: "./header.html",
  styleUrl: "./header.css",
})
export class Header implements OnInit {
  user: User | null = null

  constructor(
    private auth: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe(
      user => {
        this.user = user
      }
    )
  }

  logout() {
    this.auth.logout()
    this.user = null
    this.router.navigate(['/login'])
  }
}
