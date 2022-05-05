import { createTheme, CssBaseline,Divider, Grid, ThemeProvider } from "@mui/material";
import {  PageHeader } from "antd";
import { HomeAppBar } from "../../components/innermost.appbar/HomeAppBar";
import LifeRecordList from "../../components/innermost.loglife/LifeRecordList";
import LogLifeContent from "../../components/innermost.loglife/LogLifeContent";
import LogLifeHeader from "../../components/innermost.loglife/LogLifeHeader";

const logLifeDarkTheme=createTheme({
    palette:{
        mode:"dark",
        secondary:{
            main:'#0078D4',
            light:'#1893F8',
        }
    }
})

export default function LogLifePage(props:any){
    return(
        <ThemeProvider theme={logLifeDarkTheme}>
            <CssBaseline/>
            <HomeAppBar/>
            <LogLifeHeader/>
            <Divider variant="middle" sx={{ marginTop:2,borderBottomWidth: 2 }}/>
            <LogLifeContent/>
        </ThemeProvider>
    )
}