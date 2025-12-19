import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7133/orderHub")
  .withAutomaticReconnect()
  .build();

const startConnection = async () => {
  try {
    if (connection.state === "Disconnected") {
      await connection.start();
      console.log("SignalR connected");
    }
  } catch (err) {
    console.error("SignalR connection error:", err);
  }
};

export { connection, startConnection };