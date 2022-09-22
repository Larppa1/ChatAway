import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase-config'
import './Register.css'

var navigate = ''

function Register() {
    navigate = useNavigate()
    return(
        <div className='registerContainer'>
            <div className='registerHeader'>
                <h1>Register</h1>
            </div>
            <div className='registerContent'>
                <div className='email'>
                    <p>Email</p>
                    <input className='emailInput' id='emailInput' autoComplete='off' onKeyPress={(e) => e.key === 'Enter' && registerUser()}/>
                </div>
                <div className='password'>
                    <p>Password</p>
                    <input className='passwordInput' id='passwordInput' type='password' onKeyPress={(e) => e.key === 'Enter' && registerUser()}/>
                </div>
                <button className='registerBtn' onClick={registerUser}>Register</button>
            </div>
            <footer>
                <Link className='backLink' to='/'>Go back</Link>
            </footer>
        </div>
    )
}

const registerUser = async () => {
    const email = document.getElementById('emailInput').value
    const password = document.getElementById('passwordInput').value

    if(!email.includes('@')) {
        alert('Please give a valid email address')
    }else if(password.length < 6) {
        alert('Password too short')
    }else {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password)
            await setDoc(doc(db, 'users', user.user.uid), {
                email: email,
                nickname: '',
            })
            navigate('/chat')
        }catch(err) {
            console.log(err)
        }
    }
}

export default Register;