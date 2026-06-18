import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http"
import { catchError, throwError } from "rxjs"

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An unexpected error occurred.'

            if(error.status === 0) {
                errorMessage = 'Unable to connect to server.'
            } else if(error.status === 400) {
                errorMessage = 'Bad request.'
            } else if(error.status === 401) {
                errorMessage = 'Unauthorised access.'
            } else if(error.status === 403) {
                errorMessage = 'Access denied.'
            } else if(error.status === 404) {
                errorMessage = 'Resource not found.'
            } else if(error.status >= 500) {
                errorMessage = 'Server error. Please try again later.'
            }

            console.error('[HTTP ERROR]', error.status, errorMessage)

            return throwError(() => new Error(errorMessage))
        })
    )
}