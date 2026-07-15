import classNames from 'classnames';
import { Message } from '../../types/Message';
import { useRef } from 'react';

interface Props {
  newMessage: string;
  onMessageSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onMessageChange: (newTitle: string) => void;
  loading: boolean;
}

export const NewMessage: React.FC<Props> = ({
  newMessage,
  onMessageSubmit,
  onMessageChange,
  loading,
}) => {
  const messageInput = useRef<HTMLTextAreaElement>(null);

  const handleSubmitClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    messageInput.current?.form?.requestSubmit();
  };

  return (
    <header className="todoapp__header-container">
      <div className="todoapp__header">
        <form onSubmit={onMessageSubmit}>
          <textarea
            ref={messageInput}
            data-cy="NewTodoField"
            className="todoapp__new-todo"
            placeholder="Message"
            value={newMessage}
            disabled={loading}
            onChange={(event) => onMessageChange(event.target.value)}
          ></textarea>
          <button
            type="submit"
            className="todoapp__toggle-all"
            aria-label="Add message"
            title="Add message"
          >
            <span aria-hidden="true">➤</span>
          </button>
        </form>
      </div>
    </header>
  );
};
