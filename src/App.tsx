/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import {
  getMessages,
  addMessage,
  deleteMessage,
  updateMessage,
} from './api/messages';
import { Message } from './types/Message';
import { MessageElement } from './components/MessageElement/MessageElement';
import { NewMessage } from './components/NewMessage';
import { Error } from './components/Error';
import { ErrorType } from './types/ErrorType';

export const App: React.FC = () => {
  const messagesContainerRef = useRef<HTMLElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorType>(
    ErrorType.NoError,
  );
  const [editedMessage, setEditedMessage] = useState<string>('');
  const [editedMessageId, setEditedMessageId] = useState<string | null>(null);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;

    if (!container) {
      return;
    }

    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  };

  const timerId = useRef(0);

  const hideError = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    timerId.current = window.setTimeout(() => {
      setErrorMessage(ErrorType.NoError);
    }, 3000);
  };

  const handleNewMessageChange = (newMessage: string) => {
    setNewMessage(newMessage);
  };

  const handleNewMessageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newMessage.trim()) {
      return;
    }

    setLoading(true);

    addMessage(newMessage)
      .then((message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        setNewMessage('');
        scrollToBottom();
      })
      .catch((error) => {
        console.error('Error adding message:', error);
        setErrorMessage(ErrorType.AddMessageError);
        hideError();
      })
      .finally(() => {
        setLoading(false);
        setEditedMessageId(null);
      });
  };

  const handleDeleteMessage = (id: string) => {
    deleteMessage(id)
      .then(() => {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== id),
        );
      })
      .catch((error) => {
        console.error('Error deleting message:', error);
      });
  };

  const handleUpdateMessage = (id: string, message: string) => {
    if (!id) {
      return;
    }

    setLoading(true);

    updateMessage(id, message)
      .then((updatedMessage) => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) => (msg.id === id ? updatedMessage : msg)),
        );
        setEditedMessage('');
        setEditedMessageId(null);
      })
      .catch((error) => {
        console.error('Error updating message:', error);
        setErrorMessage(ErrorType.UpdateMessageError);
        hideError();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);

    getMessages()
      .then(setMessages)
      .catch((error) => {
        console.error('Error loading messages:', error);
        setErrorMessage(ErrorType.LoadMessagesError);
        hideError();
      })
      .finally(() => {
        setLoading(false);
      });

    setTimeout(() => {
      scrollToBottom();
    }, 500);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">Chat</h1>

      <div className="todoapp__content">
        <section ref={messagesContainerRef} className="todoapp__main">
          {messages.map((message) => (
            <MessageElement
              key={message.id}
              message={message}
              loading={loading}
              onDelete={handleDeleteMessage}
              editedMessage={editedMessage}
              setEditedMessage={setEditedMessage}
              editedMessageId={editedMessageId}
              setEditedMessageId={setEditedMessageId}
              onUpdate={handleUpdateMessage}
            />
          ))}
        </section>

        <NewMessage
          newMessage={newMessage}
          onMessageSubmit={handleNewMessageSubmit}
          onMessageChange={handleNewMessageChange}
          loading={loading}
        />
        <Error
          errorMessage={errorMessage}
          onRemoveError={() => setErrorMessage(ErrorType.NoError)}
        />
      </div>
    </div>
  );
};
