import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../css/SignIn.css'
import { Circles } from 'react-loader-spinner';
import { useAuthContext } from '../../hooks/AuthContext';

export default function SignIn({ setLoginState }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { signInUser, authorisation, loading } = useAuthContext()

  function signUpPressed() {
    setLoginState(false);
  }

  function loginButtonPressed(e) {
    e.preventDefault();
    signInUser(email, password).then((userCredential) => {
      console.log(userCredential)
      navigate("/home")
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className='LoginForm'>
      <div className='FormHeader'>Welcome to Scrummer</div>
      <div className='FormSubtitle'>Streamline Agile Collaboration with our Scrum Master's Toolbox.</div>
      <label className='Input'>
        <input value={email} className='EmailInput' type='email' id='emailInput' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className='Input'>
        <input value={password} className='PasswordInput' type='password' id='passwordInput' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
      </label>
      {loading ?
        <button className='LoginButtonPressed' onClick={loginButtonPressed}>
          <Circles
            height="30"
            width="30"
            color="#BCCC57"
            ariaLabel="circles-loading"
            visible={true}
          />
        </button> : <button className='LoginButton' onClick={loginButtonPressed}>
          <a className='LoginLink'>LOGIN</a>
        </button>
      }
      <div className='SignUp'>New to Scrummer? Sign up <a className='SignUpLink' onClick={() => signUpPressed()}> here </a></div>
    </div>
  )
}