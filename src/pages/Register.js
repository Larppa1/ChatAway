import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase-config'
import './Register.css'

var navigate = ''

export default function Register() {
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

//Register user
const registerUser = async () => {

    //Get 'email' and 'password' values from emailInput and passwordInput elements
    const email = document.getElementById('emailInput').value
    const password = document.getElementById('passwordInput').value

    //IF 'email' does not contain '@'-sign, alert user for invalid email address
    if(!email.includes('@')) {
        alert('Please give a valid email address')
    
    //IF 'password' is under 6 characters, alert user for too short password
    }else if(password.length < 6) {
        alert('Password too short')
    
    //Else try to create new account with given email and password values and navigate to Chat.js, on error situations catch error and log error to console
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