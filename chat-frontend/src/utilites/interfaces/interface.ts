// Interface for a chat message
export interface ChatMessage {
  id: number;
  timestamp: string;
  senderId: number;
  recipientId: number;
  text: string;
}

export interface User {
  name: string;
  avatar: string;
}
export interface ChatUser {
  id: number;

  messages: ChatMessage[];
}

// Interface for the chat data
export interface ChatData {
  conversations: ChatUser[];

}
