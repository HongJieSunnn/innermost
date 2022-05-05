import { Search } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import { Tabs } from "antd";
import { useRef, useState } from "react";
import AlbumContent from "./AlbumContent";
import SingerContent from "./SingerContent";
import SongContent from "./SongContent";

const { TabPane } = Tabs;

const tabs=[
    "歌曲",
    "专辑",
    "歌手"
]

export default function MusicHubContent(props:any){
    const focusRef = useRef<HTMLInputElement|null>(null);

    const [searchType, setSearchType] = useState("歌曲");

    const handleSelectedTabChange=(activeKey: string)=>{
        setSearchType(activeKey);
        focusRef.current?.focus();
    }

    const tabContents=[
        <SongContent/>,
        <AlbumContent/>,
        <SingerContent/>
    ]
    return(
        <Tabs 
            defaultActiveKey="歌曲"
            tabBarExtraContent={<MusicHubContentTabsSearchBar searchType={searchType} focusRef={focusRef}/>} 
            style={{
                width:'100%'
            }}
            onChange={handleSelectedTabChange}
        >
            {tabs.map((t,i)=>(
                <TabPane tab={t} key={t}>
                    {tabContents[i]}
                </TabPane>
            ))}
        </Tabs>
    )
}

function MusicHubContentTabsSearchBar(props:any){
    return(
        <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
        >                
            <InputBase
                autoFocus
                sx={{ ml: 1, flex: 1 }}
                placeholder={"搜索"+props.searchType}
                inputRef={props.focusRef}
            />
            <IconButton sx={{ p: '10px' }} aria-label="search">
                <Search/>
            </IconButton>
        </Paper>
    )
}