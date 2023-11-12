import { useEffect, useState } from "react"
import { useAuthContext } from "../../hooks/AuthContext"

export default function PasswordModal({toggleShow}){
  const {changePassword, reauthenticateUser, currentUser} = useAuthContext();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [disableButton, setDisableButton] = useState(true)

  function submitButtonPressed(){
    reauthenticateUser(currentPassword)
      .then(() => {
        changePassword(newPassword)
          .then(() => {
            toggleShow()
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if ( newPassword === '' || confirmNewPassword === '' || newPassword !== confirmNewPassword){
      setDisableButton(true)
    } else{
      setDisableButton(false)
    }
  }, [currentPassword, newPassword, confirmNewPassword])

  return <>
    <div className='modal'>
      <div className='modal-positioner'>
        <div className='modal-content'>
          <span className='CloseModal' onClick={() => toggleShow()}>&times;</span>
          <h1 style={{ color: "black" }}>Change Password</h1>
          <div className='modal-form'>
            <label className='InputLabel'>Current Password: </label>
            <input type='password' id="currentPassword" className='ChangePasswordInput' onChange={(e) => setCurrentPassword(e.target.value)}/>
            <label className='InputLabel'>New Password:</label>
            <input type='password' id='newPassword' className='ChangePasswordInput' onChange={(e) => setNewPassword(e.target.value)}/>
            <label className='InputLabel'>Confirm New Password:</label>
            <input type='password' id='confirmNewPassword' className='ChangePasswordInput' onChange={(e) => setConfirmNewPassword(e.target.value)}/>
            <button onClick={() => toggleShow()}>Cancel</button>
            <button onClick={() => submitButtonPressed()} disabled={disableButton}>Done</button>
          </div>
        </div>
      </div>
    </div> 
  </>
}