import * as signalR from '@microsoft/signalr';
import { GATEWAY_ORIGIN } from "../config/apiBase";

let connection = null;

export const createSignalRConnection = async (token) => {
  if (connection) {
    return connection;
  }

  connection = new signalR.HubConnectionBuilder()
    .withUrl(`${GATEWAY_ORIGIN}/notifications`, {
      accessTokenFactory: () => token,
    })
    .withAutomaticReconnect()
    .build();

  await connection.start();
  return connection;
};

export const getSignalRConnection = () => connection;

export const onReceiveNotification = (callback) => {
  if (connection) {
    connection.on('ReceiveNotification', callback);
  }
};

export const stopSignalRConnection = async () => {
  if (connection) {
    await connection.stop();
    connection = null;
  }
};
