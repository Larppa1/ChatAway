import React from 'react'
import { Link } from 'react-router-dom';
import './Landing.css'

export default function Landing() {
    return(
        <div className='containerLanding'>
            <div className='headerLanding'>
                <h1>Chat App</h1>
            </div>
            <div className='contentLanding'>
                <Link to='/login' className='loginOption'>
                    <h4>Login</h4>
                </Link>
                <Link to='/register' className='registerOption'>
                    <h4>Register</h4>
                </Link>
            </div>
        </div>
    )
}