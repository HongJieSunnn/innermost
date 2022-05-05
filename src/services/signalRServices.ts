import { HubConnectionBuilder } from "@microsoft/signalr";
import store from "../redux/stores";

export const hubConnection = new HubConnectionBuilder()
                            .withUrl("https://localhost:7182/chat",{accessTokenFactory:()=>store.getState().auth.user.access_token})
                            .build();

export async function start() {
  try {
      await hubConnection.start();
      console.log("SignalR Connected.");
  } catch (err) {
      console.log(err);
      setTimeout(start, 5000);
  }
};