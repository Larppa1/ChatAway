import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCn9jgsYhl5CcmdLAG820HXb93bCmubV6A",
    authDomain: "chataway-4e3b9.firebaseapp.com",
    projectId: "chataway-4e3b9",
    storageBucket: "chataway-4e3b9.appspot.com",
    messagingSenderId: "300147469207",
    appId: "1:300147469207:web:4c8bbdc81115bcce89b2d2",
    measurementId: "G-05XC1Y810Q"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)