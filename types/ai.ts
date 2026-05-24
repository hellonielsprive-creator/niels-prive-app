export interface AiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface AiConversation {
  id: string;
  userId: string;
  userRole: "guest" | "partner";
  messages: AiMessage[];
  createdAt: Date;
  updatedAt: Date;
  context: {
    pathname?: string;
    propertyId?: string;
    propertyName?: string;
    roomId?: string;
    roomName?: string;
    bookingId?: string;
    dashboardSection?: string;
  };
}

export interface AiContext {
  pathname: string;
  userRole: "guest" | "partner" | null;
  propertyId?: string;
  propertyName?: string;
  roomId?: string;
  roomName?: string;
  bookingId?: string;
  dashboardSection?: string;
}
