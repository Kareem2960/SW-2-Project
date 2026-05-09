import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { GATEWAY_ORIGIN } from '../config/apiBase';

let stompClient = null;

export const connectWebSocket = (token, userId, onNotificationReceived) => {
  if (stompClient && stompClient.connected) {
    return stompClient;
  }

  const socket = new SockJS(`${GATEWAY_ORIGIN}/notifications`);
  
  stompClient = new Client({
    webSocketFactory: () => socket,
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    debug: import.meta.env.DEV
      ? (str) => {
          if (str.includes('ERROR') || str.includes('closed')) console.warn('[STOMP]', str);
        }
      : () => {},
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  stompClient.onConnect = (frame) => {
    if (import.meta.env.DEV) console.log('WebSocket connected');

    // Subscribe to user-specific notifications
    stompClient.subscribe(`/topic/user/${userId}/notifications`, (message) => {
      const notification = JSON.parse(message.body);
      onNotificationReceived(notification);
    });

    // Subscribe to general notifications
    stompClient.subscribe('/topic/notifications', (message) => {
      const notification = JSON.parse(message.body);
      onNotificationReceived(notification);
    });
  };

  stompClient.onStompError = (frame) => {
    console.error('WebSocket Error:', frame);
  };

  stompClient.activate();
  return stompClient;
};

export const disconnectWebSocket = () => {
  if (stompClient && stompClient.connected) {
    stompClient.deactivate();
    stompClient = null;
  }
};

export const sendNotification = (notification) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: '/app/notifications/send',
      body: JSON.stringify(notification),
    });
  }
};

export const markNotificationAsRead = (notificationId) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: '/app/notifications/mark-read',
      body: JSON.stringify(notificationId),
    });
  }
};
