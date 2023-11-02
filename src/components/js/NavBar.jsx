import { Link, useNavigate } from 'react-router-dom';
import '../css/NavBar.css'
import { SlLogout } from 'react-icons/sl';
import { BsPersonCircle } from "react-icons/bs";
import { auth } from '../../firebase'

export default function NavBar() {
  const navigate = useNavigate()

  function handleLogOut() {
    auth.signOut()
    navigate("/")
  }

  return (
    <>
      {/* Navigation bar container */}
      <div className='NavBarContainer'>
        <div className='NavBarPositioner'>

          {/* Logo */}
          <div className="Logo">Scrummer</div>

          {/* Navigation */}
          <div className="NavBarLinks">
            <a href="#">Teams</a>
            <div className='LinkDivider'>|</div>
            <a href="#">Sprint</a>
            <div className='LinkDivider'>|</div>
            <a href="#">Metrics</a>
            <div className='LinkDivider'>|</div>
            <a href="#">Chat</a>
          </div>

          <div className='ProfileIcon'><BsPersonCircle /></div>

          {/* Log in/out */}
          <div className='LogOutIcon' onClick={() => handleLogOut()}><SlLogout /></div>
        </div>
      </div>
    </>
  )
}