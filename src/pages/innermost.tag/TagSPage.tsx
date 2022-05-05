import { createTheme, CssBaseline, Divider, Grid, ThemeProvider } from "@mui/material"
import axios from "axios"
import { useEffect } from "react"
import { Copyright } from "../../components/CopyRight"
import { HomeAppBar } from "../../components/innermost.appbar/HomeAppBar"
import TagSContent from "../../components/innermost.tag/TagSContent"
import TagSHeader from "../../components/innermost.tag/TagSHeader"
import { start } from "../../services/signalRServices"


const tagSDarkTheme=createTheme({
    palette:{
        mode:"dark",
    }
})

export interface InnermostTag{
    id?:string,
    preferredTagName:string,
    tagDetail:string,
    previousTagId?:string|null,
    createTime?:string,
    updateTime?:string|null,
    deleteTime?:string|null,
    ancestors?:string[]|null,
    synonyms:string[],
    relatedTagIds?:string[],
}

export interface TagSPageLocationState{
    links:{name:string,url:string}[],
    tag:any,//InnermostTag
    selectedIndex:number,
    scrollPosition?:number,//get scroll Y of List instead of window
}

export interface TagSummary{
    tagId:string;
    tagName:string;
}

export default function TagSPage(props:any){
    //if(props.location.state===undefined)
        //TODO axios
    //axios.get("https://localhost:7002/api/loglife/records").then((res)=>console.log(res));
    start();
    return(
        <ThemeProvider theme={tagSDarkTheme}>
            <CssBaseline/>
            <HomeAppBar/>
            <TagSHeader createButtonDisabled={props.location.state===undefined}/>
            <Divider variant="middle" sx={{ borderBottomWidth: 2 }}/>
            <TagSContent locationState={props.location.state} />
        </ThemeProvider>
    )
}