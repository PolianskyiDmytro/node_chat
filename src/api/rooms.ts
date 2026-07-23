import { Room } from '../types/Room';
import { client } from '../http/fetchClient';

export const getRooms = () => {
  return client.get<Room[]>(`/rooms`);
};

export const getRoomById = (id: string) => {
  return client.get<Room>(`/rooms/${id}`);
};

export const addRoom = (roomName: string) => {
  return client.post<Room>('/rooms', {
    roomName,
  });
};

export const deleteRoom = (id: string) => {
  return client.delete(`/rooms/${id}`);
};

export const updateRoomName = (id: string, roomName: string) => {
  return client.patch<Room>(`/rooms/${id}`, { roomName });
};
