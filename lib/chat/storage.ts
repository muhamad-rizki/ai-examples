export type Room = {
  id: string;
  title: string;
  updatedAt: number;
  pinned?: boolean;
};

const ROOMS_KEY = "chat_rooms";

export function loadRooms(): Room[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ROOMS_KEY);
    if (!raw) return [];
    const rooms = JSON.parse(raw) as Room[];
    return Array.isArray(rooms) ? rooms : [];
  } catch {
    return [];
  }
}

export function saveRooms(rooms: Room[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms));
}

function storageKey(roomId?: string) {
  return roomId ? `chat_messages_${roomId}` : null;
}

export function loadMessages(roomId?: string): UIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const key = storageKey(roomId);
    if (!key) return [];
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as UIMessage[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

import { UIMessage } from "ai";
import { CHAT_MESSAGES_UPDATED, CHAT_ROOMS_UPDATED } from "./events";

export function saveMessages(roomId: string | undefined, msgs: UIMessage[]) {
  if (typeof window === "undefined") return;
  const key = storageKey(roomId);
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(msgs));
  try {
    window.dispatchEvent(new CustomEvent(CHAT_MESSAGES_UPDATED, { detail: { roomId } }));
  } catch {}
}

export function deleteMessages(roomId: string) {
  try {
    localStorage.removeItem(`chat_messages_${roomId}`);
  } catch {}
}

export function updateRoomMeta(roomId: string | undefined, title?: string) {
  if (!roomId || typeof window === "undefined") return;
  try {
    const rooms = loadRooms();
    const idx = rooms.findIndex((r) => r.id === roomId);
    const next = [...rooms];
    if (idx >= 0) {
      const shouldApplyTitle = !!title && (next[idx].title === "" || next[idx].title === "New chat");
      next[idx] = {
        ...next[idx],
        title: shouldApplyTitle ? (title as string) : next[idx].title,
        updatedAt: Date.now(),
      };
    } else {
      next.unshift({ id: roomId, title: title || "New chat", updatedAt: Date.now() });
    }
    saveRooms(next.sort((a, b) => b.updatedAt - a.updatedAt));
    try {
      window.dispatchEvent(new Event(CHAT_ROOMS_UPDATED));
    } catch {}
  } catch {}
}
