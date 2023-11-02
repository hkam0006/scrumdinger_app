import '../css/LandingPage.css'
import SignIn from '../../components/js/SignIn'
import { FaPersonRunning } from "react-icons/fa6";
import { useState } from 'react';
import SignUp from '../../components/js/SignUp';

export default function Login(){
  const [loginState, setLoginState] = useState(true)

  return (
    <>
    <div className="page">
      <div className='LogoName'>Scrummer<FaPersonRunning/></div>
      <div className="LeftPanel">
        <div className='Slogan'>
          <div className='SloganHeader'>Start Scrumming...</div>
          <div className='Slogan'>Unite, Collaborate, and Sprint to Success</div>
        </div>
      </div>
      <div className='RightPanel'>
        {loginState ? <SignIn setLoginState={setLoginState}/> : <SignUp setLoginState={setLoginState}/>}
      </div>
    </div>
    </>
  )
}