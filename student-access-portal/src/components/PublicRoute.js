import { Navigate } from "react-router-dom"
import { isAuthenticated } from "../services/authService"

const PublicRoute = ({children}) => {
    return isAuthenticated() ? <Navigate to={'/dashboard'} /> : children
}

export default PublicRoute