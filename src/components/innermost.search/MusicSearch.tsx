import { HelpOutlineOutlined, LocationCity, Search } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, CardMedia, DialogContent, DialogTitle, Divider, Grid, IconButton, InputBase, Menu, Paper, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { searchMusicRecords } from "../../services/apiServices/musichub/musichub";
import { MusicRecord } from "../innermost.musichub/MusicHubTypes";

export default function MusicSearch(props:any){
    const [musicName, setMusicName] = useState("");
    const [searchButtonDisabled, setSearchButtonDisabled] = useState(true);
    const [musicRecords, setMusicRecords] = useState<Array<MusicRecord>>();

    const handleSearchInputChange=(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        let disabled=e.target.value==="";
        if(disabled!=searchButtonDisabled){
            setSearchButtonDisabled(disabled);
        }
        setMusicName(e.target.value);
    }

    const handleSearchButtonClick=()=>{
        searchMusicRecords(musicName).then((musicRecords)=>{
            setMusicRecords(musicRecords);
        })
    }

    return(
        <Menu 
            id="menu-music"
            anchorEl={props.anchorElMusicButton}
            open={Boolean(props.anchorElMusicButton)}
            onClose={props.handleCloseMusicMenu}
            PaperProps={{
                elevation: 0,
                sx: {
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    borderRadius:3,
                    border:1,
                    borderColor:'#66BB6A',
                    bgcolor:'#161616',
                    width:700,
                    backgroundColor:'transparent',
                    backdropFilter:'blur(15px)'
                },
            }}
            transformOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
            <DialogTitle>
            <Paper
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            >                
                <InputBase
                    autoFocus
                    value={musicName}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={"🎧搜索音乐(<歌名> - <歌手> 搜索更准确)"}
                    onChange={handleSearchInputChange}
                />
                <IconButton 
                    disabled={searchButtonDisabled}
                    sx={{ p: '10px' }} 
                    aria-label="search"
                    onClick={handleSearchButtonClick}
                >
                    <Search/>
                </IconButton>
            </Paper>
            </DialogTitle>
            <Divider/>
            <DialogContent sx={{height:400}}>
            <Grid container spacing={1}>
                {musicRecords?.length===0?(
                    <Grid container justifyContent='center'>
                        抱歉，MusicHub 中暂时没有这首歌哦
                    </Grid>
                ):musicRecords?.map((mr,i)=>(
                    <Grid key={i} item xs={12} md={6}>
                        <CardActionArea sx={{height:'100%'}} onClick={()=>props.handleMusicRecordSelect(mr)}>
                            <Paper sx={{
                                backgroundImage:`url(${mr.albumCoverUrl.replace("800x800","300x300")})`,
                                height:'100%'
                            }}>
                            <Card sx={{ display: 'flex',borderRadius:2 ,backgroundColor:'transparent',backdropFilter:'blur(15px)',width:'100%',height:'100%'}}>
                                <CardMedia sx={{pt:3,pb:3,pl:3,pr:1}}>
                                    <img src={mr.albumCoverUrl} width={100}></img>
                                </CardMedia>
                                <CardContent>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Typography variant="h5">
                                                {mr.musicName}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body1">
                                                歌手：{mr.singers.map((s)=>s.singerName).join(",")}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle2">
                                                专辑：{mr.album.albumName}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                            </Paper>
                        </CardActionArea>
                    </Grid>
                ))}
                
            </Grid>
            </DialogContent>
        </Menu>
    )
}