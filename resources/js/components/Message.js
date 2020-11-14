import React from 'react';

const Message = ({thisUser, message}) => {
    let className = thisUser === message.user ? 'message-right' : 'message-left';
    return (
        <div className={"message " + className}>
            <p>{message.text}</p>
        </div>
    );
};

export default Message;