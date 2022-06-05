import { ArrowBackIosNew, ExpandMore } from "@mui/icons-material"
import { Card, CardContent, CardMedia, Container, Dialog, Divider, Grid, Typography,Tooltip, CardActionArea, AccordionSummary, Accordion, AccordionDetails } from "@mui/material"
import { Descriptions, PageHeader, Table } from "antd"
import { useState } from "react";
import { Singer } from "./MusicHubTypes";

const testSingers=[{
    cover:"https://y.qq.com/music/photo_new/T001R300x300M0000025NhlN2yWrP4.jpg",
    name:"周杰伦",
}
]
const initialSinger:Singer={
    mid:"",
    singerId:-1,
    singerName:"",
    singerAlias:"",
    singerNationality:"",
    singerBirthplace:"",
    singerOccupation:"",
    singerBirthday:"",
    singerRepresentativeWorks:"",
    singerRegion:"",
    singerCoverUrl:"",
    singerAlbums:[],
}

export default function SingerContent(props:{
    initialContentText:string;
    singers:Singer[];
}){
    const [detailOpen, setDetailOpen] = useState(false);
    const [detailContent, setDetailContent] = useState<Singer>(initialSinger);

    const handleDetailOpen=(index:number)=>{
        setDetailContent(props.singers[index]);
        setDetailOpen(true);
    }
    
    return props.singers.length===0?(
        <InitialSingerContent text={props.initialContentText} />
    ):(
        <Grid container spacing={2} justifyContent='center'>
            {props.singers.map((singer,i)=>(
                <Grid key={i} item>
                    <Tooltip title="点击查看详情" placement="top">
                        <CardActionArea onClick={()=>handleDetailOpen(i)}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height={240}
                                    width={240}
                                    image={singer.singerCoverUrl}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography variant="h5" textAlign='center'>{singer.singerName}</Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Tooltip>
                </Grid>
            ))}
            <SingerDetail open={detailOpen} setOpen={setDetailOpen} singer={detailContent}/>
        </Grid>
    )
}

const singerCovers=[
    "https://y.qq.com/music/photo_new/T001R300x300M0000025NhlN2yWrP4.jpg",
    "https://y.qq.com/music/photo_new/T001R300x300M000003Nz2So3XXYek.jpg",
    "https://y.qq.com/music/photo_new/T001R300x300M000001BLpXF2DyJe2.jpg",
    "https://y.qq.com/music/photo_new/T001R300x300M000000aHmbL2aPXWH.jpg",
    "https://y.qq.com/music/photo_new/T001R300x300M000002ZOuVm3Qn20Y.jpg",
    "https://y.qq.com/music/photo_new/T001R300x300M0000020PeOh4ZaCw1.jpg",
    "https://y.qq.com/music/photo_new/T001R300x300M000002DYpxl3hW3EP.jpg",
    "https://y.qq.com/music/photo_new/T001R300x300M000000qrPik2w6lDr.jpg",
    "https://y.qq.com/music/photo_new/T001R300x300M000000LExWa0hMj4m.jpg",
    "https://y.qq.com/music/photo_new/T001R300x300M000000f1b6W1wzyRN.jpg",
    "https://y.qq.com/music/photo_new/T001R300x300M000004AlfUb0cVkN1.jpg",
    "https://y.qq.com/music/photo_new/T001R300x300M000001QVwtq3l8cKC.jpg",
    "https://y.qq.com/music/photo_new/T001R300x300M000003DBAjk2MMfhR.jpg"
]
const singerNames=[
    "周杰伦","陈奕迅","林俊杰","李荣浩","李宇春","Alan Walker","Justin Bieber","Taylor Swift",
    "米津玄師","RADWIMPS","BigBang","EXO","BLACKPINK"
]

function InitialSingerContent(props:any){
    return(
        <Grid>
            <Grid>
                <Typography variant='h3' textAlign='center'>{props.text}</Typography>
            </Grid>
            <Grid item container xs={12} justifyContent='center' spacing={1} mt={1}>
                {singerCovers.map((url,i)=>(
                    <Grid item>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={url}
                                alt="green iguana"
                            />
                            <Typography variant="h6" textAlign='center'>
                                {singerNames[i]}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Grid>
                <Typography variant='h3' textAlign='center'>.....</Typography>
            </Grid>
        </Grid>
    )
}

function SingerDetail(props:{
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    singer:Singer;
}){
    const handleClose=()=>{
        props.setOpen(false);
    }

    function SingerDetailHeader(props:{
        singer:Singer;
    }){
        return(
            <PageHeader
                title={<Typography variant="subtitle1" fontFamily={'YouYuan'}>歌手详情</Typography>}
                subTitle=''
                onBack={handleClose}
                backIcon={<ArrowBackIosNew/>}
                tags={[
                    
                ]}
                extra={[
                    
                ]}
                footer={
                    <div></div>
                }
            >
                <Grid container>
                    <Grid item xs={12} md={5} justifyContent='center'>
                        <img src={props.singer.singerCoverUrl} width={300} height={300} />
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Typography variant="h4">
                            {props.singer.singerName}
                        </Typography>
    
                        <Descriptions size="small" column={2}>
                            <Descriptions.Item label="别名">{props.singer.singerAlias}</Descriptions.Item> 
                            <Descriptions.Item label="国籍">{props.singer.singerNationality}</Descriptions.Item>{/* if infomation is "" not show. */}
                            <Descriptions.Item label="出生地">{props.singer.singerBirthplace}</Descriptions.Item>
                            <Descriptions.Item label="地区分类">{props.singer.singerRegion}</Descriptions.Item>
                        </Descriptions>
                        <Descriptions size="small" column={1}>
                            <Descriptions.Item label="出生日期">{props.singer.singerBirthday}</Descriptions.Item>
                            <Descriptions.Item label="职业">{props.singer.singerOccupation}</Descriptions.Item>
                            <Descriptions.Item label="代表作品">{props.singer.singerRepresentativeWorks}</Descriptions.Item>
                        </Descriptions>
    
                    </Grid>
                </Grid>
            </PageHeader>
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
            <SingerDetailHeader singer={props.singer}/>
            <Divider variant="middle" sx={{marginTop:2,marginBottom:1}}/>
            <SingerDetailContent singer={props.singer}/>{/*DialogContent's scollbar is different with scollbar belongs to whole dialog. */}
        </Dialog>
    )
}

interface musicListModel{
    mid:string,
    musicName:string,
    albumName:string
}

const albumListData:musicListModel[] = [
    {
        mid:'abc',
        musicName: '轨迹',
        albumName:'寻找周杰伦'
    },
    {
        mid:'abc',
        musicName: '明明就',
        albumName:'十二新作'
    },
    {
        mid:'abc',
        musicName: '轨迹',
        albumName:'寻找周杰伦'
    },
    {
        mid:'abc',
        musicName: '明明就',
        albumName:'十二新作'
    },
    {
        mid:'abc',
        musicName: '轨迹',
        albumName:'寻找周杰伦'
    },
    {
        mid:'abc',
        musicName: '明明就',
        albumName:'十二新作'
    },
    {
        mid:'abc',
        musicName: '轨迹',
        albumName:'寻找周杰伦'
    },
    {
        mid:'abc',
        musicName: '明明就',
        albumName:'十二新作'
    },
    {
        mid:'abc',
        musicName: '轨迹',
        albumName:'寻找周杰伦'
    },
    {
        mid:'abc',
        musicName: '明明就',
        albumName:'十二新作'
    },
    {
        mid:'abc',
        musicName: '轨迹',
        albumName:'寻找周杰伦'
    },
    {
        mid:'abc',
        musicName: '明明就',
        albumName:'十二新作'
    },
    {
        mid:'abc',
        musicName: '轨迹',
        albumName:'寻找周杰伦'
    },
    {
        mid:'abc',
        musicName: '明明就',
        albumName:'十二新作'
    },
    {
        mid:'abc',
        musicName: '轨迹',
        albumName:'寻找周杰伦'
    },
    {
        mid:'abc',
        musicName: '明明就',
        albumName:'十二新作'
    },
    {
        mid:'abc',
        musicName: '轨迹',
        albumName:'寻找周杰伦'
    },
    {
        mid:'abc',
        musicName: '明明就',
        albumName:'十二新作'
    },
    {
        mid:'abc',
        musicName: '轨迹',
        albumName:'寻找周杰伦'
    },
    {
        mid:'abc',
        musicName: '明明就',
        albumName:'十二新作'
    },
    {
        mid:'abc',
        musicName: '轨迹',
        albumName:'寻找周杰伦'
    },
    {
        mid:'abc',
        musicName: '明明就',
        albumName:'十二新作'
    },
    {
        mid:'abc',
        musicName: '轨迹',
        albumName:'寻找周杰伦'
    },
    {
        mid:'abc',
        musicName: '明明就',
        albumName:'十二新作'
    },
    {
        mid:'abc',
        musicName: '轨迹',
        albumName:'寻找周杰伦'
    },
    {
        mid:'abc',
        musicName: '明明就',
        albumName:'十二新作'
    },

  ];

const albumListColumns = [
    {
      title: '歌曲',
      dataIndex: 'musicName',
      key: 'musicName',
      width:'70%'
    },
    {
      title: '专辑',
      dataIndex: 'albumName',
      key: 'albumName',
    },
  ];

function SingerDetailContent(props:{
    singer:Singer;
}){
    return(
        <Grid p={2}>
            <SingerDetailContentAlbumsAccordion singer={props.singer}/>
        </Grid>
    )
}

function SingerDetailContentAlbumsAccordion(props:{
    singer:Singer;
}){
    return(
        <Grid>
            <Grid mb={2}>
                <Typography variant="h5">
                    歌手专辑
                </Typography>
            </Grid>
            <Grid container spacing={2} height={500} justifyContent='center' overflow='auto'>
                {props.singer.singerAlbums.map((album,i)=>(
                    <Grid item width={240}>
                        <Tooltip title="点击查看详情" placement="bottom">
                            <CardActionArea onClick={()=>window.open(`https://y.qq.com/n/ryqq/albumDetail/${props.singer.singerAlbums[i].mid}`)}>{/*TODO 把开启 Dialog 以及对应的开启 state 放到 MusicHub Page ，那么我们就可以在不同组件下唤醒 Dialog （例如歌手界面唤起专辑）*/}
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height={240}
                                        width={240}
                                        image={album.albumCoverUrl}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{album.albumName}</Typography>
                                        <Typography variant="subtitle1">发行时间：{album.publishTime}</Typography>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </Tooltip>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}