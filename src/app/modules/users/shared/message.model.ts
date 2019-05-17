export interface Message {
    severity: string;
    summary: string;
    id: number;
    senderId: string;
    senderKnownAs: string;
    senderPhotoUrl: string;
    recipientId: string;
    recipientKnwonAs: string;
    recipientPhotoUrl: string;
    content: string;
    isRead: Boolean;
    dateRead: Date;
    messageSent: Date;
    senderDeleted: Boolean;
    recipientDeleted: Boolean;
}