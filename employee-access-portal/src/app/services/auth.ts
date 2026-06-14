import { Injectable } from "@angular/core"
import { User } from "../models/user.model"
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private usersKey = 'users'
  private loggedInUserKey = 'loggedInUser'
  private currentUserSubject = new BehaviorSubject<User | null>(this.getLoggedInUser())

  currentUser$ = this.currentUserSubject.asObservable()

  register(user: User): boolean {
    const users = this.getUsers()

    const exists = users.some(u => u.email === user.email)

    if(exists) {
      return false
    }

    users.push(user)

    localStorage.setItem(this.usersKey, JSON.stringify(users))

    return true
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers()

    const user = users.find(u => u.email === email && u.password === password)

    if(user) {
      localStorage.setItem(this.loggedInUserKey, JSON.stringify(user))
      this.currentUserSubject.next(user)

      return true
    }

    return false
  }

  logout(): void {
    localStorage.removeItem(this.loggedInUserKey)

    this.currentUserSubject.next(null)
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.loggedInUserKey)
  }

  getLoggedInUser(): User | null {
    const user = localStorage.getItem(this.loggedInUserKey)

    return user ? JSON.parse(user) : null
  }
  
  getUsers(): User[] {
    console.log(localStorage.getItem(this.usersKey))
    
    return JSON.parse(
      localStorage.getItem(this.usersKey) || '[]'
    )
  }
}
