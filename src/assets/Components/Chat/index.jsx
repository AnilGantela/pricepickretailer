import React, { useState } from "react";
import {
  Container,
  Header,
  Messages,
  Message,
  InputContainer,
  TextInput,
  SendButton,
  CloseButton,
} from "./styledComponents";

const ChatContainer = ({ setShowChat }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: input },
        { sender: "helpdesk", text: "How can I assist you?" },
      ]);
      setInput("");
    }
  };

  return (
    <Container>
      <Header>
        Help Desk
        <CloseButton onClick={() => setShowChat(false)}>✕</CloseButton>
      </Header>
      <Messages>
        {messages.map((message, index) => (
          <Message key={index} sender={message.sender}>
            {message.text}
          </Message>
        ))}
      </Messages>
      <InputContainer>
        <TextInput
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </InputContainer>
    </Container>
  );
};

export default ChatContainer;
