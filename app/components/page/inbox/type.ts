export interface Conversation {
  id: string;
  targetName: string;
  targetAvatar?: string;
}

export interface MessageType {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: Date;
}
