export default function ChatWindow({ messages, isLoading }) {
    return (
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className="message ai loading">
            <div className="loading-indicator">...</div>
          </div>
        )}
      </div>
    );
  }