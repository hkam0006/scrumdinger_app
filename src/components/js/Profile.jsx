import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/AuthContext'
import '../css/Profile.css'

export default function Profile() {
  const { authorisation, deleteAccount } = useAuthContext()
  const navigate = useNavigate()

  function deleteButtonPressed() {
    deleteAccount().then((res) => {
      navigate("/")
    });
  }

  return <>
    <div className='container'>
      <div className='content'>
        <div className='sidebar'>
          <h1>User Settings</h1>
          <ul>
            <li>My Account</li>
            <li>Manage Subscription</li>
          </ul>
        </div>
        <div className='main-screen'>
          <h1>My Account</h1>
          <div className='AccountInformation'>
            <label>First Name: <input type='text'></input></label>
            <label>Last Name: <input type='text'></input></label>
            <label>Email: <input type='email' value={authorisation.user.email} disabled={true} /></label>
            <button className='ChangePasswordButton'>Change Password</button>
            <button className='DeleteButton' onClick={() => deleteButtonPressed()}>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  </>
}