export interface ChatMessage {
  message_type: number;
  message: string;
  message_date: Date;
  imageUrl: string;
  audioUrl: string;
  webcamUrl: string;
  senderId: string;
  reciverId: string;
  isRead: boolean;
}
