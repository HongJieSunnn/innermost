import { HubConnection } from "@microsoft/signalr"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { User } from "oidc-client"
import { useEffect, useState } from "react"
import { RootStateOrAny, useSelector } from "react-redux"
import { createSignalRContext } from "react-signalr"
import { HomeAppBar } from "../../components/innermost.appbar/HomeAppBar"
import MeetContent from "../../components/innermost.meet/MeetContent"
import { chatHubConnection, startHubConnection } from "../../services/signalRServices"


const meetDarkTheme=createTheme({
    palette:{
        mode:"dark",
    }
})

export const SignalRContext = createSignalRContext();

window.onbeforeunload=()=>{
    SignalRContext.connection?.stop();
}

export default function MeetPage(props:any){
    let user:User=useSelector((state:RootStateOrAny|null)=>state.auth.user);
    useEffect(() => {
        if(user===null){
            return;
        }
        return () => {
            SignalRContext.connection?.stop();
        }
        
    }, [user])
    
    return(
        <SignalRContext.Provider
            connectEnabled={!!user?.access_token}
            accessTokenFactory={() => user?.access_token}
            dependencies={[user?.access_token]} //remove previous connection and create a new connection if changed
            url={"https://localhost:7182/chat"}
        >
            <ThemeProvider theme={meetDarkTheme}>
                <CssBaseline/>
                <HomeAppBar/>
                <MeetContent user={user} />
            </ThemeProvider>
        </SignalRContext.Provider>
    )
}