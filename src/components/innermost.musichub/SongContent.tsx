import { Avatar,Accordion, AccordionDetails, AccordionSummary, Card, CardActionArea, CardContent, CardMedia, Container, Dialog, DialogContent, Divider, Grid, Link, Paper, Tooltip, Typography } from "@mui/material"
import { randomInternalTagColor, randomTagColor, WindowsBlue } from "../../themes/InnermostColor"
import InitialSongContentBg from '../../images/backgrounds/InitialSongContentBg.png'
import { Descriptions, message, PageHeader, Tag } from "antd"
import { ArrowBackIosNew,ExpandMore } from "@mui/icons-material"
import { MusicRecord } from "./MusicHubTypes"
import { useEffect, useState } from "react"
import { User } from "oidc-client"
import { RootStateOrAny, useSelector } from "react-redux"
import { searchMusicRecords } from "../../services/apiServices/musichub/musichub"
import { SharedLifeRecord, SharedLifeRecordContentRecordCard } from "../innermost.meet/SharedLifeRecordCard"
import { getSharedLifeRecordsByMusicRecord } from "../../services/apiServices/musichub/musichubSharedLifeRecordApis"

const testSongs=[{
        cover:"https://y.gtimg.cn/music/photo_new/T002R800x800M0000024bjiL2aocxT.jpg",
        name:"一路向北",
        singer:"周杰伦",
        album:"十一月的肖邦"
    },{
        cover:"https://y.qq.com/music/photo_new/T002R300x300M000000MkMni19ClKG_3.jpg",
        name:"你听得到",
        singer:"周杰伦",
        album:"叶惠美"
    },{
        cover:"https://y.qq.com/music/photo_new/T002R300x300M000003Ow85E3pnoqi_1.jpg",
        name:"明明就",
        singer:"周杰伦",
        album:"十二新作"
    },{
        cover:"https://y.qq.com/music/photo_new/T002R300x300M000001BGzMs369FzU_1.jpg",
        name:"轨迹",
        singer:"周杰伦",
        album:"寻找周杰伦"
    },{
        cover:"https://y.qq.com/music/photo_new/T002R300x300M000004MGitN0zEHpb_1.jpg",
        name:"暗号",
        singer:"周杰伦",
        album:"八度空间"
    },{
        cover:"https://y.qq.com/music/photo_new/T002R300x300M000002eFUFm2XYZ7z_1.jpg",
        name:"彩虹",
        singer:"周杰伦",
        album:"我很忙"
    },{
        cover:"https://y.qq.com/music/photo_new/T002R300x300M000003DFRzD192KKD_1.jpg",
        name:"搁浅",
        singer:"周杰伦",
        album:"七里香"
    },{
        cover:"https://y.qq.com/music/photo_new/T002R300x300M000000f01724fd7TH_1.jpg",
        name:"星晴",
        singer:"周杰伦",
        album:"Jay"
    },{
        cover:"https://y.qq.com/music/photo_new/T002R300x300M000002jLGWe16Tf1H_1.jpg",
        name:"退后",
        singer:"周杰伦",
        album:"依然范特西"
    }
        
]
const initialMusicRecord:MusicRecord={
    mid:"init",
    musicId:-1,
    musicName:"init",
    translatedMusicName:"",
    introduction:"",
    genre:"",
    language:"",
    albumCoverUrl:"",
    musicUrl:"",
    wikiUrl:"",
    lyric:"",
    singers:[],
    album:{
        mid:"init",
        albumName:"",
        albumDescriptions:"",
        albumGenre:"",
        albumLanguage:"",
        albumSingerName:"",
        albumSingerMid:"",
        albumSongCount:-1,
        publishCompany:"",
        publishTime:"",
    },
    publishTime:"",
    tagSummaries:[],
}
export default function SongContent(props:{
    initialContentText:string;
    musicRecords:MusicRecord[];
}){
    const [detailOpen, setDetailOpen] = useState(false);
    const [detailContent, setDetailContent] = useState<MusicRecord>(initialMusicRecord);

    const handleDetailOpen=(index:number)=>{
        setDetailContent(props.musicRecords[index]);
        setDetailOpen(true);
    }
    return props.musicRecords.length===0?(
        <InitialSongContent text={props.initialContentText}/>
    ):(
        <Grid container spacing={2} justifyContent='center'>
            {props.musicRecords.map((song,i)=>(
                <Grid key={i} item>
                    <Tooltip title="点击查看详情" placement="top">
                        <CardActionArea onClick={()=>handleDetailOpen(i)}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height={240}
                                    width={240}
                                    image={song.albumCoverUrl}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography variant="h6">{song.musicName}</Typography>
                                    <Typography variant="body2">歌手：{song.singers.map((s)=>s.singerName).join(",")}</Typography>
                                    <Typography variant="subtitle1">专辑：{song.album.albumName}</Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Tooltip>
                </Grid>
            ))}
            <SongDetail open={detailOpen} setOpen={setDetailOpen} musicRecord={detailContent}/>
        </Grid>
    )
}

function InitialSongContent(props:any){
    return(
        <Grid container>
            <Container maxWidth='sm' sx={{mt:10}}>
                <Grid item container xs={12} justifyContent='center'>
                    <img src={InitialSongContentBg}/>
                </Grid>
                <Grid item container xs={12} justifyContent='center'>
                    <Typography variant='h3' textAlign='center'>{props.text}</Typography>
                </Grid>
                <Grid item container xs={12} justifyContent='center'>
                    <Typography variant='subtitle1' textAlign='center'>{"使用 <音乐> - <歌手(完整名)> 的格式搜索更准确哦"}</Typography>
                </Grid>
            </Container>
        </Grid>
    )
}



function SongDetail(props:{
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    musicRecord:MusicRecord;
}){
    const user:User=useSelector((state:RootStateOrAny|null) => state.auth.user);
    const [sharedLifeRecords, setSharedLifeRecords] = useState<Array<SharedLifeRecord>>([]);
    const [initialContentText, setInitialContentText] = useState("🙂这首歌之下还没有分享的记录哦，说不定你就是第一个留下记录的人呢");

    useEffect(() => {
        if(user===null){
            return;
        }
        getSharedLifeRecordsByMusicRecord(props.musicRecord.mid).then((res)=>{
            setSharedLifeRecords(res);
        }).catch((error)=>{
            setInitialContentText("🤕抱歉，获取记录时出错了");
        })
    }, [user,props.open])

    const handleClose=()=>{
        props.setOpen(false);
    }

    function SongDetailHeader(props:{
        musicRecord:MusicRecord;
    }){
        return(
            <PageHeader
                title={
                    <Grid container spacing={1}>
                        <Grid item>
                            <Typography variant="subtitle1" fontFamily={'YouYuan'}>歌曲详情</Typography>
                        </Grid>
                        {props.musicRecord.musicUrl===""?(<div></div>):(<Grid item><Link variant="subtitle1" href={props.musicRecord.musicUrl} target="_blank">播放页</Link></Grid>)}
                        {props.musicRecord.wikiUrl===""?(<div></div>):(<Grid item><Link variant="subtitle1" href={props.musicRecord.wikiUrl} target="_blank">wiki</Link></Grid>)}
                    </Grid>
                }
                subTitle=''
                onBack={handleClose}
                backIcon={<ArrowBackIosNew/>}
                tags={[
                    
                ]}
                extra={[
                    
                ]}
                footer={
                    <LyricAccodion lyric={props.musicRecord.lyric} />
                }
            >
                <Grid container>
                    <Grid item xs={12} md={5} justifyContent='center'>
                        <img src={props.musicRecord.albumCoverUrl} width={300} height={300} />
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Typography variant="h4">
                            {props.musicRecord.musicName}
                        </Typography>
    
                        <Descriptions size="default" column={1}>
                            <Descriptions.Item label='歌手'>{props.musicRecord.singers.map((s)=>s.singerName).join(",")}</Descriptions.Item>
                        </Descriptions>
    
                        <Descriptions size="small" column={2}>
                            <Descriptions.Item label="专辑">{props.musicRecord.album.albumName}</Descriptions.Item>
                            <Descriptions.Item label="语种">{props.musicRecord.language}</Descriptions.Item>
                            <Descriptions.Item label="流派">{props.musicRecord.genre}</Descriptions.Item>
                            <Descriptions.Item label="唱片公司">{props.musicRecord.album.publishCompany}</Descriptions.Item>
                            <Descriptions.Item label="发行时间">
                                {props.musicRecord.publishTime}
                            </Descriptions.Item>
                        </Descriptions>
    
                        <Descriptions size="small" title='简介'/>
                        <Grid height={100} overflow='auto' p={1} border={2} borderRadius={2} borderColor={WindowsBlue}>
                        <Typography 
                            variant="body2" 
                            paragraph
                            color='#DCDCDC'
                            fontWeight='bold'
                            fontFamily={'Cascadia Code'}
                            whiteSpace='pre-line'
                        >
                            {props.musicRecord.introduction===null?"暂无":props.musicRecord.introduction}
                        </Typography>
                        </Grid>
                        
                        <Typography variant='overline'>
                            🏷️标签：
                            {props.musicRecord.tagSummaries.length>0?props.musicRecord.tagSummaries.map((t,i)=>(
                                <Tag key={i} color={randomInternalTagColor()}>{t.tagName}</Tag>
                            )):(
                                <Tag>暂无标签</Tag>
                            )}
                        </Typography>
                        
                    </Grid>
                </Grid>
            </PageHeader>
        )
    }
    
    function LyricAccodion(props:{
        lyric:string;
    }){
        return(
            
                <Accordion>
                    <Tooltip title="说不定有这样一句歌词，它能触及到你的内心深处" placement="top-start">
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                        >
                            <Typography>歌词</Typography>
                        </AccordionSummary>
                    </Tooltip>
                    <AccordionDetails>
                        <Typography whiteSpace="pre-line">
                            {props.lyric.replace(/\[\d{2}:\d{2}.\d{2}\]/g,"")}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
        )
    }
    
    function SongDetailContent(props:any){
        return(
            <Grid p={3}>
                <Typography variant="h5">
                    承载着这首歌的记录
                </Typography>
                <Grid mt={2} p={1} border={2} borderColor={WindowsBlue} borderRadius={2}>
                    {sharedLifeRecords.length===0?(
                        <Grid item container xs={12} justifyContent='center'>
                            <Typography variant='h6' textAlign='center'>{initialContentText}</Typography>
                        </Grid>
                    ):(
                        <Grid container spacing={1}>
                            {sharedLifeRecords.map((slr,i)=>(
                                <SharedLifeRecordContentRecordCard key={i} sharedLifeRecord={slr} displayCountEachLine={1} boder={0} height={100} userId={user.profile.sub} />
                            ))}
                        </Grid>
                    )}
                </Grid>
            </Grid>
        )
    }

    return(
        <Dialog 
            maxWidth='md' 
            fullWidth 
            open={props.open}
            onClose={handleClose}
            PaperProps={{
                elevation:0,
                sx:{
                }
            }}
            BackdropProps={{
                sx:{
                    backdropFilter: "blur(2px)",
                }
            }}
        >
            <SongDetailHeader musicRecord={props.musicRecord} />
            <Divider variant="middle" sx={{marginTop:2,marginBottom:1}}/>
            <SongDetailContent mid={props.musicRecord.mid}/>{/*DialogContent's scollbar is different with scollbar belongs to whole dialog. */}
        </Dialog>
    )
}