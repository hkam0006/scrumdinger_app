import { Link, useNavigate } from 'react-router-dom';
import '../css/NavBar.css'
import { SlLogout } from 'react-icons/sl';
import { BsPersonCircle } from "react-icons/bs";
import { useAuthContext } from '../../hooks/AuthContext';

export default function NavBar() {
  const { signOutUser } = useAuthContext()
  const navigate = useNavigate()

  function handleLogOut() {
    signOutUser().then((res) => {
      navigate("/")
    }).catch((error) => {
      console.log(error)
    })
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
            <Link to="/home/team">Teams</Link>
            <div className='LinkDivider'>|</div>
            <Link to="/home/sprint">Sprint</Link>
            <div className='LinkDivider'>|</div>
            <Link to="/home/metrics">Metrics</Link>
            <div className='LinkDivider'>|</div>
            <Link to='/home/chat'>Chat</Link>
          </div>

          <div className='ProfileIcon'><Link to="/home/profile"><BsPersonCircle /></Link></div>

          {/* Log in/out */}
          <div className='LogOutIcon' onClick={() => handleLogOut()}><SlLogout /></div>
        </div>
      </div>
    </>
  )
}