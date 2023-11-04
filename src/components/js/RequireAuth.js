
import {useLocation, Navigate, Outlet} from "react-router-dom"
import { useAuthContext } from "../../hooks/AuthContext"

export default function RequireAuth(){
  const {authorisation} = useAuthContext();
  const location = useLocation();

  return (
    authorisation !== null
      ? <Outlet />
      : <Navigate to="/" state = {{from: location}} replace />
  )
}