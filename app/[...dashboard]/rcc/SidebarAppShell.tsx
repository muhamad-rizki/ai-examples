"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { CHAT_ROOMS_UPDATED, CHAT_ROOM_DELETED } from "@/lib/chat/events";
import { Room, deleteMessages, loadRooms, saveRooms } from "@/lib/chat/storage";
import { cn } from "@/lib/utils";
import { MessageSquare, Pencil, Plus, Star, StarOff, Trash2, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";

// Room type and storage helpers are imported

export default function SidebarAppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  // Rooms via SWR so other components can refresh by mutate('chat_rooms')
  const { data: rooms = [], mutate: mutateRooms } = useSWR<Room[]>(
    "chat_rooms",
    () =>
      Promise.resolve(
        loadRooms()
          .sort((a, b) => b.updatedAt - a.updatedAt)
          .slice(0, 50)
      )
  );
  const [open, setOpen] = useState<boolean | undefined>(undefined);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Auth guard
  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("isAuthenticated")) {
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    // Revalidate on path change to keep list fresh when navigating
    mutateRooms();
  }, [pathname, mutateRooms]);

  // Sidebar open state persistence via cookie set by sidebar library
  useEffect(() => {
    if (open !== undefined) return; // initialize once
    try {
      const cookie = document.cookie.split(";").map((s) => s.trim()).find((c) => c.startsWith("sidebar_state="));
      if (cookie) {
        const value = cookie.split("=")[1];
        setOpen(value === "true");
      } else {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, [open]);

  // Cross-tab sync for rooms
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "chat_rooms") {
        mutateRooms(
          loadRooms().sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 50),
          { revalidate: false }
        );
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // Same-tab updates via custom event
  useEffect(() => {
    const refresh = () => {
      mutateRooms(
        loadRooms().sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 50),
        { revalidate: false }
      );
    };
    window.addEventListener(CHAT_ROOMS_UPDATED, refresh as EventListener);
    return () => window.removeEventListener(CHAT_ROOMS_UPDATED, refresh as EventListener);
  }, []);

  const segments = useMemo(() => pathname?.split("/").filter(Boolean) ?? [], [pathname]);
  const activeRoomId = useMemo(() => {
    if (!segments.length) return undefined;
    const last = segments[segments.length - 1];
    return rooms.some((r) => r.id === last) ? last : undefined;
  }, [segments, rooms]);

  const basePath = useMemo(() => {
    // If first segment is 'dashboard', keep it. Otherwise base is root.
    return segments[0] === "dashboard" ? "/dashboard" : "";
  }, [segments]);

  const createNewChat = () => {
    // Do not create a room yet. Navigate to base dashboard; a room will be created on first submit.
    router.push(basePath || "/dashboard");
  };

  const openRoom = (id: string) => {
    router.push(`${basePath}/${id}`);
  };

  const renameRoom = (id: string) => {
    const current = rooms.find((r) => r.id === id);
    setEditingId(id);
    setEditTitle(current?.title ?? "");
  };

  const requestDeleteRoom = (id: string) => {
    setConfirmDeleteId(id);
  };

  const confirmDeleteRoom = () => {
    if (!confirmDeleteId) return;
    const id = confirmDeleteId;
    const next = rooms.filter((r) => r.id !== id);
    saveRooms(next);
    mutateRooms(next, { revalidate: false });
    deleteMessages(id);
    // notify same-tab listeners that a room was deleted
    try {
      window.dispatchEvent(new CustomEvent(CHAT_ROOM_DELETED, { detail: { id } }));
    } catch {}
    
    if (activeRoomId === id) {
      router.push(basePath || "/dashboard");
    }

    setConfirmDeleteId(null);
  };

  // Pin / filter helpers
  const togglePin = (id: string) => {
    const next = rooms.map((r) => (r.id === id ? { ...r, pinned: !r.pinned } : r));
    next.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.updatedAt - a.updatedAt);
    saveRooms(next);
    mutateRooms(next, { revalidate: false });
  };

  const filteredRooms: Room[] = rooms
    .filter((r) => (query ? r.title.toLowerCase().includes(query.toLowerCase()) : true))
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.updatedAt - a.updatedAt);

  const handleLogout = () => {
    try {
      localStorage.removeItem("isAuthenticated");
    } catch {}
    router.replace("/login");
  };

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <div className={cn("flex h-svh w-full bg-background overflow-x-hidden")}>
        <Sidebar className="overflow-x-hidden">
          <SidebarHeader className="border-b p-0">
            <SidebarGroup>
              <SidebarGroupLabel>Conversations</SidebarGroupLabel>
              <SidebarGroupAction className="cursor-pointer" aria-label="New chat" onClick={createNewChat}>
                <Plus />
              </SidebarGroupAction>
              <SidebarGroupContent />
            </SidebarGroup>
          </SidebarHeader>
          <SidebarContent className="overflow-x-hidden">
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2">
                <span>Recent</span>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-2 pb-2">
                  <SidebarInput
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="overflow-x-hidden"
                  />
                </div>
                <SidebarMenu>
                  {filteredRooms.length === 0 && (
                    <div className="px-2 py-1 text-xs text-muted-foreground">
                      No chats yet. Click the + to start a conversation.
                    </div>
                  )}
                  {filteredRooms.map((room: Room) => (
                    <SidebarMenuItem key={room.id}>
                      {editingId === room.id ? (
                        <div className="flex items-center gap-2 p-2">
                          <input
                            className="h-8 w-full rounded-md border bg-background px-2 text-sm outline-hidden"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                const updated = rooms.map((r) =>
                                  r.id === room.id
                                    ? {
                                        ...r,
                                        title: editTitle || r.title,
                                        updatedAt: Date.now(),
                                      }
                                    : r
                                );
                                saveRooms(updated);
                                mutateRooms(updated, { revalidate: false });
                                setEditingId(null);
                              } else if (e.key === "Escape") {
                                setEditingId(null);
                              }
                            }}
                          />
                          <Button
                            className="h-8"
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const updated = rooms.map((r) =>
                                r.id === room.id
                                  ? {
                                      ...r,
                                      title: editTitle || r.title,
                                      updatedAt: Date.now(),
                                    }
                                  : r
                              );
                              saveRooms(updated);
                              mutateRooms(updated, { revalidate: false });
                              setEditingId(null);
                            }}
                          >
                            Save
                          </Button>
                          <Button
                            className="h-8"
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingId(null)}
                          >
                            <X className="size-4" />
                          </Button>
                        </div>
                      ) : (
                        <SidebarMenuButton
                          isActive={room.id === activeRoomId}
                          onClick={() => openRoom(room.id)}
                          tooltip={room.title}
                          size="sm"
                        >
                          <MessageSquare className="size-4" />
                          <span className="truncate">{room.title}</span>
                        </SidebarMenuButton>
                      )}
                      {editingId !== room.id && (
                        <SidebarMenuAction
                          showOnHover
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            togglePin(room.id);
                          }}
                          style={{ right: 4 + 0 * 24 }}
                        >
                          {room.pinned ? (
                            <Star className="size-4" />
                          ) : (
                            <StarOff className="size-4" />
                          )}
                        </SidebarMenuAction>
                      )}
                      {editingId !== room.id && (
                        <SidebarMenuAction
                          showOnHover
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            renameRoom(room.id);
                          }}
                          style={{ right: 4 + 1 * 24 }}
                        >
                          <Pencil className="size-4" />
                        </SidebarMenuAction>
                      )}
                      {editingId !== room.id && (
                        <SidebarMenuAction
                          showOnHover
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            requestDeleteRoom(room.id);
                          }}
                          style={{ right: 4 + 2 * 24 }}
                        >
                          <Trash2 className="size-4" />
                        </SidebarMenuAction>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t">
            <div className="flex items-center justify-between px-2 py-1.5 gap-2">
              <div className="text-xs text-muted-foreground">Demo: admin/admin</div>
              <Button size="sm" variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="flex items-center gap-2 border-b p-2">
            <SidebarTrigger />
            <div className="font-medium">Dashboard</div>
          </header>
          <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
        </SidebarInset>
        {/* Delete confirmation dialog */}
        <Dialog open={!!confirmDeleteId} onOpenChange={(o) => !o && setConfirmDeleteId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete conversation</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the selected conversation and its messages.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDeleteRoom}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
}
