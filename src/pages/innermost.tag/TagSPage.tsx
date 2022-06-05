import { createTheme, CssBaseline, Divider, Grid, ThemeProvider } from "@mui/material"
import axios from "axios"
import { useEffect } from "react"
import { Copyright } from "../../components/CopyRight"
import { HomeAppBar } from "../../components/innermost.appbar/HomeAppBar"
import TagSContent from "../../components/innermost.tag/TagSContent"
import TagSHeader from "../../components/innermost.tag/TagSHeader"
import { InnermostTag } from "../../components/innermost.tag/TagSTypes"


const tagSDarkTheme=createTheme({
    palette:{
        mode:"dark",
    }
})

export interface TagSPageLocationState{
    links:{name:string,url:string}[],
    tags:InnermostTag[],
    selectedIndex:number,
    scrollPosition?:number,//get scroll Y of List instead of window
}

export interface TagSummary{
    tagId:string;
    tagName:string;
}

export default function TagSPage(props:any){
    return(
        <ThemeProvider theme={tagSDarkTheme}>
            <CssBaseline/>
            <HomeAppBar/>
            <TagSHeader tag={props.location.state?.tags[props.location.state?.tags.length-1]} createButtonDisabled={props.location.state===undefined}/>
            <Divider variant="middle" sx={{ borderBottomWidth: 2 }}/>
            <TagSContent locationState={props.location.state} />
        </ThemeProvider>
    )
}