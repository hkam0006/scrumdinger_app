import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import '../css/SignIn.css'
import { auth } from "../../firebase"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Circles } from 'react-loader-spinner';

export default function SignIn({ setLoginState }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function signUpPressed() {
    setLoginState(false);
  }

  const loginButtonPressed = (e) => {
    e.preventDefault();
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false)
        navigate("/home")
      }).catch((err) => {
        setLoading(false)
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