import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase/app'
// import { useFirestoreQuery } from '../hooks'
// Components
import Message from './Message'

// passing message comp inside talking channel

const Channel = ({ user = null }) => {


//fetches firestore data and stores messages and dates from user into variables 
  const db = firebase.firestore();
  const messagesRef = db.collection('messages');
  const messages = useFirestoreQuery(
    messagesRef.orderBy('createdAt', 'desc').limit(100)
  );

//create state to update new messages
  
  const [newMessage, setNewMessage] = useState('');

  const inputRef = useRef();
  const bottomListRef = useRef();

  const { uid, displayName, photoURL } = user;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  //tracks user input
  const handleOnChange = e => {
    setNewMessage(e.target.value);
  };

  //submits user input to firebase
  const handleOnSubmit = e => {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      // Add new message in Firestore
      messagesRef.add({
        text: trimmedMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });
      // Clear input field
      setNewMessage('');
      // Scroll down to the bottom of the list
      bottomListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <div >
              <p>Welcome to</p>
              <p>React FireChat</p>
            </div>
            <p>
              This is the beginning of this chat.
            </p>
          </div>
          <ul>
            {messages
              ?.sort((first, second) =>
                first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
              )
              ?.map(message => (
                <li key={message.id}>
                  <Message {...message} />
                </li>
              ))}
          </ul>
          <div ref={bottomListRef} />
        </div>
      </div>
      <div>
        <form onSubmit={handleOnSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            placeholder="Type your message here..."
          />
          <button type="submit" disabled={!newMessage}>Send</button>
        </form>
      </div>
    </div>
  );
};

//sets default proptype for channel
Channel.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }),
};
export default Channel
