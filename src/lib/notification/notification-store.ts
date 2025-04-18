
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "createdAt" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [
    {
      id: "note-1",
      title: "New Article Reported",
      message: "Article 'New Technology Breakthrough in AI' has been reported for inappropriate content",
      type: "warning",
      createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 mins ago
      read: false,
      linkTo: "/reports",
      source: "report"
    },
    {
      id: "note-2",
      title: "Comment Added",
      message: "New comment on 'Global Summit on Climate Change Begins'",
      type: "info",
      createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      read: true,
      linkTo: "/news/NEWS-2AB7CD",
      source: "comment"
    }
  ],
  
  // Calculate unread count based on notifications array
  get unreadCount() {
    return get().notifications.filter(note => !note.read).length;
  },
  
  addNotification: (notification) => set((state) => {
    const newNotification = {
      ...notification,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      read: false
    };
    return { 
      notifications: [newNotification, ...state.notifications]
    };
  }),
  
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((note) => 
      note.id === id ? { ...note, read: true } : note
    )
  })),
  
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map((note) => ({ ...note, read: true }))
  })),
  
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter((note) => note.id !== id)
  })),
  
  clearAllNotifications: () => set({ notifications: [] })
}));

// Utility functions to create notifications for common events

export const createReportNotification = (articleTitle: string, articleId: string) => {
  return {
    title: "New Article Reported",
    message: `Article '${articleTitle}' has been reported and needs review`,
    type: "warning" as const,
    linkTo: `/reports`,
    source: "report" as const
  };
};

export const createCommentNotification = (articleTitle: string, articleId: string) => {
  return {
    title: "New Comment Added",
    message: `New comment on article '${articleTitle}'`,
    type: "info" as const,
    linkTo: `/news/${articleId}`,
    source: "comment" as const
  };
};

export const createSystemNotification = (title: string, message: string) => {
  return {
    title,
    message,
    type: "info" as const,
    source: "system" as const
  };
};
