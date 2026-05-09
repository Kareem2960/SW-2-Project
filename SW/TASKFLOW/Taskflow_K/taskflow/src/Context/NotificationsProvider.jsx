import React, { createContext, useContext, useMemo, useState, useCallback } from "react";

const NotificationsContext = createContext(null);

const starterNotifications = [
  {
    id: "seed-1",
    type: "assigned",
    title: "Task assigned to you",
    message: 'You have been assigned to "Set up contact form".',
    createdAt: Date.now() - 10 * 60 * 1000,
  },
];

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(starterNotifications);

  const fetchNotifications = useCallback(async () => {
    // Disabled - using local state only
    console.log("fetchNotifications called - using local state");
  }, []);

  const addNotification = useCallback(({ type = "updated", title, message }) => {
    const item = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type,
      title,
      message,
      createdAt: Date.now(),
    };

    setNotifications((prev) => [item, ...prev].slice(0, 30));
  }, []);

  const clearNotifications = useCallback(() => setNotifications([]), []);

  const value = useMemo(
    () => ({ notifications, addNotification, clearNotifications, fetchNotifications }),
    [notifications, addNotification, clearNotifications, fetchNotifications],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used inside NotificationsProvider");
  }
  return context;
};
