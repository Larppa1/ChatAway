import { signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase-config'
import './Login.css'

var navigate = ''

function Login() {
    navigate = useNavigate()
    return(
        <div className='loginContainer'>
            <div className='loginHeader'>
                <h1>Login</h1>
            </div>
            <div className='loginContent'>
                <div className='email'>
                    <p>Email</p>
                    <input className='emailInput' id='emailInput' onKeyPress={(e) => e.key === 'Enter' && loginUser()}/>
                </div>
                <div className='password'>
                    <p>Password</p>
                    <input className='passwordInput' id='passwordInput' type='password' onKeyPress={(e) => e.key === 'Enter' && loginUser()}/>
                </div>
                <button className='loginBtn' onClick={loginUser}>Login</button>
            </div>
            <footer>
                <Link className='backLink' to='/'>Go back</Link>
            </footer>
        </div>
    )
}

const loginUser = async () => {
    const email = document.getElementById('emailInput').value
    const password = document.getElementById('passwordInput').value
    try {
        const user = await signInWithEmailAndPassword(auth, email, password)
        navigate('/chat')
    }catch(err) {
        alert('Login credentials incorrect, try again')
    }
}

export default Login;