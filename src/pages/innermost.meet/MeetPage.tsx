import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { HomeAppBar } from "../../components/innermost.appbar/HomeAppBar"
import MeetContent from "../../components/innermost.meet/MeetContent"


const meetDarkTheme=createTheme({
    palette:{
        mode:"dark",
    }
})

export default function MeetPage(props:any){
    return(
        <ThemeProvider theme={meetDarkTheme}>
            <CssBaseline/>
            <HomeAppBar/>
            <MeetContent/>
        </ThemeProvider>
    )
}