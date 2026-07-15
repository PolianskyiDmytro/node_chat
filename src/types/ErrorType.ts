export enum ErrorType {
  NoError = '',
  LoadMessagesError = 'Unable to load messages',
  AddMessageError = 'Unable to add a message',
  UpdateMessageError = 'Unable to update a message',
  DeleteMessageError = 'Unable to delete a message',
  EmptyMessageTitleError = 'Title should not be empty',
}
