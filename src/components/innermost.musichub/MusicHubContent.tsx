import { Search } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import { message, Tabs } from "antd";
import { User } from "oidc-client";
import { useRef, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { searchAlbums, searchMusicRecords, searchSingers } from "../../services/apiServices/musichub/musichub";
import NotSignIn from "../NotSignIn";
import AlbumContent from "./AlbumContent";
import { Album, MusicRecord, Singer } from "./MusicHubTypes";
import SingerContent from "./SingerContent";
import SongContent from "./SongContent";

const { TabPane } = Tabs;

const tabs=[
    "歌曲",
    "专辑",
    "歌手"
]

export default function MusicHubContent(props:any){
    const user:User=useSelector((state:RootStateOrAny|null) => state.auth.user);

    const focusRef = useRef<HTMLInputElement|null>(null);

    const [searchType, setSearchType] = useState("歌曲");

    const [searchBarInput, setSearchBarInput] = useState("");

    const handleSelectedTabChange=(activeKey: string)=>{
        setSearchType(activeKey);
        focusRef.current?.focus();
    }

    const [musicRecords, setMusicRecords] = useState<Array<MusicRecord>>([]);
    const [initialSongContentText, setInitialSongContentText] = useState("探索你想发现的音乐");
    const handleSearchMusicRecord=()=>{
        if(searchBarInput===""){
            message.error("您想要查询什么呢🙂");
            return;
        }
        searchMusicRecords(searchBarInput).then((mrs)=>{
            if(mrs.length===0){
                setMusicRecords(mrs);
                setInitialSongContentText("🤧你想要发现的音乐暂时不存在于音乐库中");
                return;
            }
            setMusicRecords(mrs);
        })
    }

    const [albums, setAlbums] = useState<Array<Album>>([]);
    const [initialAlbumContentText, setInitialAlbumContentText] = useState("探索你想发现的专辑");
    const handleSearchAlbum=()=>{
        if(searchBarInput===""){
            message.error("您想要查询什么呢🙂");
            return;
        }
        searchAlbums(searchBarInput).then((a)=>{
            if(a.length===0){
                setAlbums(a);
                setInitialAlbumContentText("🤧你想要发现的专辑暂时不存在于音乐库中");
                return;
            }
            setAlbums(a);
        })
    }

    const [singers, setSingers] = useState<Array<Singer>>([]);
    const [initialSingerContentText, setInitialSingerContentText] = useState("了解你喜欢的歌手");
    const handleSearchSinger=()=>{
        if(searchBarInput===""){
            message.error("您想要查询什么呢🙂");
            return;
        }
        searchSingers(searchBarInput).then((s)=>{
            if(s.length===0){
                setSingers(s);
                setInitialSingerContentText("🤧你想要发现的歌手暂时不存在于音乐库中");
                return;
            }
            setSingers(s);
        })
    }

    const tabContents=[
        <SongContent initialContentText={initialSongContentText} musicRecords={musicRecords}/>,
        <AlbumContent initialContentText={initialAlbumContentText} albums={albums}/>,
        <SingerContent initialContentText={initialSingerContentText} singers={singers}/>
    ]

    const tabSearchAction:{[index:string]:()=>void}={
        "歌曲":handleSearchMusicRecord,
        "专辑":handleSearchAlbum,
        "歌手":handleSearchSinger,
    }
    

    return user===null?(
        <NotSignIn/>
    ):(
        <Tabs 
            defaultActiveKey="歌曲"
            tabBarExtraContent={
                <MusicHubContentTabsSearchBar 
                    searchType={searchType} 
                    focusRef={focusRef} 
                    searchBarInput={searchBarInput} 
                    setSearchBarInput={setSearchBarInput} 
                    searchBarAction={tabSearchAction[searchType]}
                />
            } 
            style={{
                width:'100%'
            }}
            onChange={handleSelectedTabChange}
        >
            {tabs.map((t,i)=>(
                <TabPane key={t} tab={t}>
                    {tabContents[i]}
                </TabPane>
            ))}
        </Tabs>
    )
}

function MusicHubContentTabsSearchBar(props:{
    searchType:string;
    focusRef:React.Ref<any> | undefined;
    searchBarInput:string;
    setSearchBarInput:React.Dispatch<React.SetStateAction<string>>;
    searchBarAction:()=>void;
}){

    const handleInputChange=(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        props.setSearchBarInput(e.target.value);
    }

    const handleSearchEnterKeyDown=(e:React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        if(e.key==='Enter'){
            e.preventDefault();
            props.searchBarAction();
        }else if(props.searchBarInput===""&&e.key==='-'&&props.searchType==="歌曲"){
            e.preventDefault();
            message.info("请先填写音乐名");
        }
    }

    return(
        <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
        >                
            <InputBase
                autoFocus
                sx={{ ml: 1, flex: 1 }}
                value={props.searchBarInput}
                placeholder={"搜索"+props.searchType}
                inputRef={props.focusRef}
                onChange={handleInputChange}
                onKeyDown={handleSearchEnterKeyDown}
            />
            <IconButton sx={{ p: '10px' }} aria-label="search" onClick={props.searchBarAction}>
                <Search/>
            </IconButton>
        </Paper>
    )
}