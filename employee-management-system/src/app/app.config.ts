import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import { employeeReducer } from './store/employee/employee.reducer'

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
    provideRouter(routes)
  ]
}
