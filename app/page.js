'use client'
import { useState } from 'react';
import ChatWindow from './component/chatWindow';
import MessageInput from './component/MessageInput';

export default function Home() {

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text) => {
    
    setMessages(prevMessages => [...prevMessages, { text, sender: 'user' }]);
    setIsLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/flashcard/query?index=flashcard-embeddings&query=${encodeURIComponent(text)}`, {
        method: 'GET',
      });

      const data = await response.json();
      console.log(data.answer)
      
      setMessages(prevMessages => [...prevMessages, { text: data.answer, sender: 'ai' }]);
    } catch (error) {
      console.error('Error calling AI API:', error);
      setMessages(prevMessages => [...prevMessages, { text: 'Sorry, I encountered an error.', sender: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>RAG AI Chat Bot</h1>
      <div className="chat-container">
        <img src="/robot.png" alt="Robot" className="robot-image" />
        <ChatWindow messages={messages} isLoading={isLoading} />
      </div>
      <MessageInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
}