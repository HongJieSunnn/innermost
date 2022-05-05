import { createTheme, CssBaseline, Divider, Grid, ThemeProvider } from "@mui/material"
import { HomeAppBar } from "../../components/innermost.appbar/HomeAppBar"
import MusicHubContent from "../../components/innermost.musichub/MusicHubContent"
import MusicHubHeader from "../../components/innermost.musichub/MusicHubHeader"

const musicHubDarkTheme=createTheme({
    palette:{
        mode:"dark",
    }
})

export default function MusicHubPage(props:any){
    return(
        <ThemeProvider theme={musicHubDarkTheme}>
            <CssBaseline/>
            <HomeAppBar/>
            <MusicHubHeader/>
            <Grid container pt={2} pl={4} pr={4} columnSpacing={1}>
                <MusicHubContent/>
            </Grid>
        </ThemeProvider>
    )
}