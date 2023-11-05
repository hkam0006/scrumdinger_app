import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/AuthContext'
import '../css/Profile.css'
import { useState } from 'react';
import PasswordModal from './PasswordModal';

export default function Profile() {
  const { currentUser, deleteAccount, changePassword } = useAuthContext()
  const [modal, setModal] = useState(false)
  const navigate = useNavigate()

  function deleteButtonPressed() {
    deleteAccount().then((res) => {
      navigate("/")
    });
  }

  function toggleShowModal() {
    setModal(!modal)
  }

  return <>
    {modal ? <PasswordModal toggleShow={() => toggleShowModal()} /> : <></>}
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
            <label>First Name:<input type='text'></input></label>
            <label>Last Name: <input type='text'></input></label>
            <label>Email: <input type='email' /></label>
          </div>
          <div className='BottomGrid'>
            <button className='ChangePasswordButton' onClick={() => toggleShowModal()}>Change Password</button>
            <button className='DeleteButton' onClick={() => deleteButtonPressed()}>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  </>
}