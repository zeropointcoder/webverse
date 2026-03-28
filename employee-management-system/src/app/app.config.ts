import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideEffects } from '@ngrx/effects'
import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import { employeeReducer } from './store/employee/employee.reducer'
import { EmployeeEffects } from './store/employee/employee.effects'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideStore({
      employee: employeeReducer,
    }),
    provideStoreDevtools({
      maxAge: 25,
    }),
    provideEffects([
      EmployeeEffects
    ]),
    provideRouter(routes)
  ]
}
