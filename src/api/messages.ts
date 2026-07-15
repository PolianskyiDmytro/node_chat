import { Message } from '../types/Message';
import { client } from '../utils/fetchClient';

export const USER_ID = 3589;

export const getMessages = () => {
  return client.get<Message[]>(`/messages`);
};

export const getMessageById = (id: string) => {
  return client.get<Message>(`/messages/${id}`);
};

export const addMessage = (message: string) => {
  return client.post<Message>('/messages', {
    message,
  });
};

export const deleteMessage = (id: string) => {
  return client.delete(`/messages/${id}`);
};

export const updateMessage = (id: string, message: string) => {
  return client.patch<Message>(`/messages/${id}`, { message });
};
