import { Outlet } from "react-router-dom";
import NavBar from "../../components/js/NavBar";
import '../css/HomePage.css'


export default function HomePage(){
  return <>
      <NavBar />
      <Outlet />
  </>
}