// Interface for a chat message
export interface ChatMessage {
  id?: number;
  timestamp: string;
  senderId: number;
  recipientId: number;
  text: string;
  attachment?:string
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

export interface LoginUser {
  userId?: number;
  name?: string;
  emailId: string;
  password: string;
   avatar?: string;
  createdDate?: string;
  token?: string;
}

export interface LoginResponse{
  token:string;
  user:LoginUser;
}
export interface User {
  id?: number;
  fullName?: string;
  emailId: string;
  password: string;
  designation?: string;
  createdDate?: string;
  token?: string;
}
