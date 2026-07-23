interface Props {
  newMessage: string;
  onMessageSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onMessageChange: (newTitle: string) => void;
  loading: boolean;
  messageInputRef: React.RefObject<HTMLTextAreaElement>;
}

export const NewMessage: React.FC<Props> = ({
  newMessage,
  onMessageSubmit,
  onMessageChange,
  loading,
  messageInputRef,
}) => {
  return (
    <header className="todoapp__header-container">
      <div className="todoapp__header">
        <form onSubmit={onMessageSubmit}>
          <textarea
            ref={messageInputRef}
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
