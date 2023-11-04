import { useState } from 'react'
import { Circles } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from "../../hooks/AuthContext"

export default function SignUp({ setLoginState }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { signUpUser, loading } = useAuthContext()


  function signInPressed() {
    setLoginState(true)
  }

  const signUpButtonPressed = (e) => {
    e.preventDefault()
    signUpUser(email, password).then((userCredential) => {
      navigate("/home")
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className='LoginForm'>
      <div className='FormHeader'>Create an Account</div>
      <div className='FormSubtitle'>Streamline Agile Collaboration with our Scrum Master's Toolbox.</div>
      <label className='Input'>
        <input value={email} className='EmailInput' type='email' id='emailInput' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className='Input'>
        <input value={password} className='PasswordInput' type='password' id='passwordInput' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
      </label>
      {
        loading
          ? <button className='LoginButtonPressed' onClick={signUpButtonPressed}>
            <Circles
              height="30"
              width="30"
              color="#BCCC57"
              ariaLabel="circles-loading"
              visible={true}
            />
          </button>
          : <button className='LoginButton' onClick={signUpButtonPressed}>
            <a className='LoginLink'>SIGN UP</a>
          </button>
      }
      <div className='SignUp'>Already have an account? Log in <a className='SignUpLink' onClick={() => signInPressed()}> here </a></div>
    </div>
  )
}