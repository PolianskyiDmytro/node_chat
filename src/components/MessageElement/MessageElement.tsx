/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useState } from 'react';
import { Message } from '../../types/Message';
import classNames from 'classnames';
import { deleteMessage } from '../../api/messages';

interface Props {
  message: Message;
  loading: boolean;
  onDelete: (id: string) => void;
  editedMessage: string;
  setEditedMessage: (message: string) => void;
  editedMessageId: string | null;
  setEditedMessageId: (id: string | null) => void;
  onUpdate: (id: string, message: string) => void;
}

export const MessageElement: React.FC<Props> = ({
  message,
  loading,
  onDelete,
  editedMessage,
  setEditedMessage,
  editedMessageId,
  setEditedMessageId,
  onUpdate,
}) => {
  const editInputRef = React.useRef<HTMLInputElement>(null);

  const handleEditClick = (id: string, currentMessage: string) => {
    setEditedMessageId(id);
    setEditedMessage(currentMessage);
  };

  const handleEditKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (editedMessageId && editedMessage.trim()) {
        onUpdate(editedMessageId, editedMessage);
      }
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: message.createdAt !== message.updatedAt,
      })}
    >
      <label className="todo__status-label">
        <button
          type="button"
          className="message__edit fa-sm"
          onClick={() => handleEditClick(message.id, message.message)}
        >
          <i className="fas fa-pen " />
        </button>
      </label>

      {editedMessageId !== message.id ? (
        <>
          <span className="todo__title">{message.message}</span>
          <button
            type="button"
            className="todo__remove"
            onClick={() => onDelete(message.id)}
          >
            ×
          </button>
        </>
      ) : (
        <form>
          <input
            ref={editInputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            onChange={(e) => {
              setEditedMessage(e.target.value);
            }}
            value={editedMessage}
            onKeyDown={(e) => handleEditKeyPress(e)}
          />
        </form>
      )}

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': loading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
