export const CHAT_ROOMS_UPDATED = "chat_rooms_updated" as const;
export const CHAT_ROOM_DELETED = "chat_room_deleted" as const;
export const CHAT_MESSAGES_UPDATED = "chat_messages_updated" as const;

export type ChatRoomDeletedDetail = { id: string };
export type ChatMessagesUpdatedDetail = { roomId?: string };
