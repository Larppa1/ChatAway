import React from 'react'

const Message = ({message}) => {
    if(message.msg === true) {
        return(
            <div className='chatDiv'>
                <p className='chatText'>{message.nickname}: {message.text}</p>
            </div>
        )
    }else if(message.info === true) {
        return(
            <div className='infoDiv'>
                <p className='infoText'>{message.text}</p>
            </div>
        )
    }
}

export default Message;