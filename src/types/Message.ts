export interface Message {
  id: string;
  userId: string;
  roomId: string;
  message: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
