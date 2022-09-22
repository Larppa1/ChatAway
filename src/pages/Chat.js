import { signOut } from 'firebase/auth'
import { doc, updateDoc, getDoc, collection, query, onSnapshot, addDoc, orderBy, serverTimestamp, getDocs, where } from "firebase/firestore"; 
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../firebase-config'
import './Chat.css'
import Message from '../components/Message'

var nickname = ''

export default function Chat() {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('time', 'desc'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let messages = []
            querySnapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id})
            })
            setMessages(messages)
        })
        return () => unsubscribe()
    }, [])

    if(auth.currentUser === null ) {
        setTimeout(() => {
            return(
                <div className='notLoggedContainer'>
                    <h1 className='accessDenied'>ACCESS DENIED</h1>
                    <h3>You must be logged in to view this page</h3>
                    <Link className='backLink' to='/'>To homepage</Link>
                </div>
            )
        }, 50)
    }else {
        return(
            <div className='chatContainer'>
                <div className='chatHeader'>
                    <Link className='logOutBtn' to='/' onClick={logoutUser}>Log out</Link>
                    <div className='content'>
                        <input className='inputNickname' id='inputNickname' placeholder='Nickname...' autoComplete='off' onKeyPress={(e) => e.key === 'Enter' && setNickname()}/>
                        <button className='setNickname' onClick={setNickname}>Set</button>
                    </div>
                </div>
                <div className='chatContent' id='chatContent'>
                    {messages && messages.map((message) => (
                        <Message key={message.id} message={message} nickname={nickname} />
                    ))}
                </div>
                <div className='chatFooter'>
                    <input className='inputMessage' id='inputMessage' placeholder='Chat...' autoComplete='off' onKeyPress={(e) => e.key === 'Enter' && sendChat()}/>
                    <button className='sendBtn' id='sendBtn' onClick={sendChat}>Send</button>
                </div>
            </div>
        )
    }
}


//Send new message
const sendChat = async () => {
    if(document.getElementById('inputMessage').value === '') return
    //IF nickname value in Firestore is null, alert user
    if((await getDoc(doc(db, 'users', auth.currentUser.uid))).data().nickname === '') {
        alert('Please set a nickname before sending a message')
    //IF local nickname value is null, get nickname value from Firestore
    }else if(nickname === '') {
        nickname = (await getDoc(doc(db, 'users', auth.currentUser.uid))).data().nickname
        await addDoc(collection(db, 'messages'), {
            text: document.getElementById('inputMessage').value,
            nickname: nickname,
            time: serverTimestamp(),
            id: auth.currentUser.uid,
            msg: true,
            info: false,
        })
        document.getElementById('inputMessage').value = ''
    //Else add new message object to Firestore containing text, nickname, time and id values
    }else {
        await addDoc(collection(db, 'messages'), {
            text: document.getElementById('inputMessage').value,
            nickname: nickname,
            time: serverTimestamp(),
            id: auth.currentUser.uid,
            msg: true,
            info: false,
        })

        // Set inputMessage element value to null
        document.getElementById('inputMessage').value = ''
    }
}

//Set new nickname for user
const setNickname = async () => {
    //Get nickname value from inputNickname element
    nickname = document.getElementById('inputNickname').value

    //Boolean to indicate whether desired nickname is in use or not
    let isNicknameOccupied = false

    //Get all nicknames from Firestore
    const q = query(collection(db, 'users'))
    const querySnapshot = await getDocs(q)

    //If query returns a nickname that equals to desired nickname, set boolean isNicknameOccupied to true
    querySnapshot.forEach((doc) => {
        if(doc.data().nickname === nickname) {
            isNicknameOccupied = true
        }
    })

    //IF desired nickname is not occupied, update nickname value to Firestore
    if(!isNicknameOccupied) {
        await addDoc(collection(db, 'messages'), {
            text: (await getDoc(doc(db, 'users', auth.currentUser.uid))).data().nickname + ' changed nickname to ' + nickname,
            time: serverTimestamp(),
            id: auth.currentUser.uid,
            msg: false,
            info: true,
        })

        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            nickname: nickname,
        })
    //IF desired nickname is occupied, alert user
    }else {
        alert('Nickname is already in use, choose another nickname')
    }

    //Set inputNickname value to null
    nickname = document.getElementById('inputNickname').value = ''

    // CHANGE NEW NICKNAME TO PREVIOUS MESSAGES
}

//Log out user
const logoutUser = async () => {
    //Set local nickname value to null
    nickname = ''

    //Log out current user with Firebase Auth
    await signOut(auth)
}