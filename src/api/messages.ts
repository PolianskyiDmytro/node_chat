import { Message } from '../types/Message';
import { client } from '../http/fetchClient';

export const getMessages = () => {
  return client.get<Message[]>(`/messages`);
};

export const getMessageById = (id: string) => {
  return client.get<Message>(`/messages/${id}`);
};

export const addMessage = (message: string, roomId: string, userId: string) => {
  return client.post<Message>('/messages', {
    message,
    roomId,
    userId,
  });
};

export const deleteMessage = (id: string) => {
  return client.delete(`/messages/${id}`);
};

export const updateMessage = (id: string, message: string) => {
  return client.patch<Message>(`/messages/${id}`, { message });
};

export const getAllByRoomId = (roomId: string) => {
  return client.get<Message[]>(`/messages/room/${roomId}`);
};
