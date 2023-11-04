import { useNavigate } from "react-router-dom";
import NavBar from "../../components/js/NavBar";
import Profile from "../../components/js/Profile";
import { useAuthContext } from "../../hooks/AuthContext";


export default function HomePage(){
  const {authorisation} = useAuthContext()
  const navigate = useNavigate()

  return <>
    <NavBar />
    <Profile />
  </>
}