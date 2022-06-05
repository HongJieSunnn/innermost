import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import store from "../redux/stores";

export const chatHubConnection = new HubConnectionBuilder()
                            .withUrl("https://localhost:7182/chat",{accessTokenFactory:()=>store.getState().auth.user.access_token})
                            .withAutomaticReconnect()
                            .build();

export const pushHubConnection = new HubConnectionBuilder()
                            .withUrl("https://localhost:7266/push",{accessTokenFactory:()=>store.getState().auth.user.access_token})
                            .withAutomaticReconnect()
                            .build();

export async function startHubConnection(hubConnection:HubConnection) {
  if(hubConnection.state==="Connected"){
    return;
  }
  try {
    await hubConnection.start();
    console.log("SignalR Connected.");
  } catch (error) {
    setTimeout(() => {
      startHubConnection(hubConnection);
    }, 5000);
  }
};