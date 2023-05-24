import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './index.css';

const socket = io(process.env.REACT_APP_SOCKET_HOST);

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendChat = (event) => {
    event.preventDefault();
    socket.emit('chat message', { id: socket.id, message });
    setMessage('');
  };

  useEffect(() => {
    socket.on('chat message', (data) => {
      setChat([...chat, data]);
    });

    return () => socket.off('chat message');
  }, [chat]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-8">
      <div className="flex-1 overflow-y-auto w-full max-w-lg border border-gray-300 rounded px-4 py-2 mb-4 bg-white">
        {chat.map((data, index) => (
          <p key={index} className={data.id === socket.id ? 'text-right bg-blue-200 rounded mb-2 py-2 px-2' : 'text-left bg-gray-300 rounded mb-2 py-2 px-2'}>{data.msg}</p>
        ))}
      </div>

      <form onSubmit={sendChat} className="chat-input">
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
