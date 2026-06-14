import { CanActivateFn } from '@angular/router'

export const authGuard: CanActivateFn = () => {
  const user = localStorage.getItem('loggedInUser')

  return !!user

}
