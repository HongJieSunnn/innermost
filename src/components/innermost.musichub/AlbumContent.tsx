import { ArrowBackIosNew } from "@mui/icons-material"
import { Card, CardActionArea, CardContent, CardMedia, Container, Dialog, Divider, Grid, Tooltip, Typography } from "@mui/material"
import { Descriptions, PageHeader, Table } from "antd"
import { useState } from "react"
import InitialAlbumContentBg from '../../images/backgrounds/InitialAlbumBg.png'
import { SubTitleColor, WindowsBlue } from "../../themes/InnermostColor"
import { Album } from "./MusicHubTypes"

const testAlbums=[{
    cover:"https://y.gtimg.cn/music/photo_new/T002R800x800M0000024bjiL2aocxT.jpg",
    name:"十一月的肖邦",
    singer:"周杰伦",
    publishTime:"2000-01-01"
},{
    cover:"https://y.qq.com/music/photo_new/T002R300x300M000000MkMni19ClKG_3.jpg",
    name:"叶惠美",
    singer:"周杰伦",
    publishTime:"2000-01-01"
},{
    cover:"https://y.qq.com/music/photo_new/T002R300x300M000003Ow85E3pnoqi_1.jpg",
    name:"十二新作",
    singer:"周杰伦",
    publishTime:"2000-01-01"
},{
    cover:"https://y.qq.com/music/photo_new/T002R300x300M000001BGzMs369FzU_1.jpg",
    name:"寻找周杰伦",
    singer:"周杰伦",
    publishTime:"2000-01-01"
},{
    cover:"https://y.qq.com/music/photo_new/T002R300x300M000004MGitN0zEHpb_1.jpg",
    name:"八度空间",
    singer:"周杰伦",
    publishTime:"2000-01-01"
},{
    cover:"https://y.qq.com/music/photo_new/T002R300x300M000002eFUFm2XYZ7z_1.jpg",
    name:"我很忙",
    singer:"周杰伦",
    publishTime:"2000-01-01"
},{
    cover:"https://y.qq.com/music/photo_new/T002R300x300M000003DFRzD192KKD_1.jpg",
    name:"七里香",
    singer:"周杰伦",
    publishTime:"2000-01-01"
},{
    cover:"https://y.qq.com/music/photo_new/T002R300x300M000000f01724fd7TH_1.jpg",
    name:"Jay",
    singer:"周杰伦",
    publishTime:"2000-01-01"
},{
    cover:"https://y.qq.com/music/photo_new/T002R300x300M000002jLGWe16Tf1H_1.jpg",
    name:"依然范特西",
    singer:"周杰伦",
    publishTime:"2000-01-01"
}
    
]
const initialAlbum:Album={
    mid:"",
    albumId:-1,
    albumName:"",
    albumDescriptions:"",
    albumGenre:"",
    albumLanguage:"",
    albumSongCount:-1,
    albumCoverUrl:"",
    albumSingerName:"",
    albumSingerMid:"",
    publishCompany:"",
    publishTime:"",
    albumMusicRecords:[],
}
export default function AlbumContent(props:{
    initialContentText:string;
    albums:Album[];
}){
    const [detailOpen, setDetailOpen] = useState(false);
    const [detailContent, setDetailContent] = useState<Album>(initialAlbum);

    const handleDetailOpen=(index:number)=>{
        setDetailContent(props.albums[index]);
        setDetailOpen(true);
    }
    return props.albums.length===0?(
        <InitialSongContent text={props.initialContentText}/>
    ):(
        <Grid container spacing={2} justifyContent='center'>
            {props.albums.map((album,i)=>(
                <Grid key={i} item>
                    <Tooltip title="点击查看详情" placement="top">
                        <CardActionArea onClick={()=>handleDetailOpen(i)}>
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
                                    <Typography variant="body2">歌手：{album.albumSingerName}</Typography>
                                    <Typography variant="subtitle1">发行时间：{album.publishTime}</Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Tooltip>
                </Grid>
            ))}
            <AlbumDetail open={detailOpen} setOpen={setDetailOpen} album={detailContent}/>
        </Grid>
    )
}

function InitialSongContent(props:any){
    return(
        <Grid container>
            <Container maxWidth='sm' sx={{mt:10}}>
                <Grid item container xs={12} justifyContent='center'>
                    <img src={InitialAlbumContentBg}/>
                </Grid>
                <Grid item container xs={12} justifyContent='center'>
                    <Typography variant='h3' textAlign='center'>{props.text}</Typography>
                </Grid>
            </Container>
        </Grid>
    )
}

function AlbumDetail(props:{
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    album:Album;
}){
    const handleClose=()=>{
        props.setOpen(false);
    }
    return(
        <Dialog 
            maxWidth='md' 
            fullWidth 
            open={props.open}
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
            onClose={handleClose}
        >
            <AlbumDetailHeader handleClose={handleClose} album={props.album}/>
            <Divider variant="middle" sx={{marginTop:2,marginBottom:1}}/>
            <AlbumDetailContent album={props.album}/>{/*DialogContent's scollbar is different with scollbar belongs to whole dialog. */}
        </Dialog>
    )
}

function AlbumDetailHeader(props:{
    handleClose:()=>void;
    album:Album;
}){
    return(
        <PageHeader
            title={<Typography variant="subtitle1" fontFamily={'YouYuan'}>专辑详情</Typography>}
            subTitle=''
            onBack={props.handleClose}
            backIcon={<ArrowBackIosNew/>}
            tags={[
                
            ]}
            extra={[
                
            ]}
        >
            <Grid container>
                <Grid item xs={12} md={5} justifyContent='center'>
                    <img src={props.album.albumCoverUrl} width={300} height={300} />
                </Grid>
                <Grid item xs={12} md={7}>
                    <Typography variant="h4">
                        {props.album.albumName}
                    </Typography>

                    <Descriptions size="default" column={1}>
                        <Descriptions.Item label='歌手'>{props.album.albumSingerName}</Descriptions.Item>
                    </Descriptions>

                    <Descriptions size="small" column={2}>
                        <Descriptions.Item label="流派">{props.album.albumGenre}</Descriptions.Item> 
                        <Descriptions.Item label="语种">{props.album.albumLanguage}</Descriptions.Item>
                        <Descriptions.Item label="发行时间">{props.album.publishTime}</Descriptions.Item>
                        <Descriptions.Item label="唱片公司">{props.album.publishCompany}</Descriptions.Item>
                    </Descriptions>

                    <Descriptions size="small" title='简介'/>
                    <Grid height={200} overflow='auto' p={1} border={2} borderRadius={2} borderColor={WindowsBlue}>
                        <Typography 
                            variant="body2" 
                            paragraph
                            color='#DCDCDC'
                            fontWeight='bold'
                            fontFamily={'Cascadia Code'}
                            whiteSpace='pre-line'
                        >
                                {props.album.albumDescriptions}
                        </Typography>
                    </Grid>

                </Grid>
            </Grid>
        </PageHeader>
    )
}

interface albumListModel{
    musicName:string;
    singerName:string;
    musicUrl:string;
}

const albumListColumns = [
    {
      title: '歌曲',
      dataIndex: 'musicName',
      key: 'musicName',
      width:'75%'
    },
    {
      title: '歌手',
      dataIndex: 'singerName',
      key: 'singerName',
    },
  ];

function AlbumDetailContent(props:{
    album:Album;
}){
    return(
        <Grid height={400} p={3} overflow='auto'>
            <Grid container mb={2}>
                <Typography variant="h5">
                    专辑歌曲
                </Typography>
                <Typography p={1} variant="caption" color={SubTitleColor}>
                    Tip:点击歌曲对应行可跳转到播放页
                </Typography>
            </Grid>
            <Table 
                onRow={record => {
                    return {
                        onClick: event => {window.open(record.musicUrl)},
                    };
                }}
                pagination={false} 
                dataSource={props.album.albumMusicRecords.map((amr,i)=>{
                    let listItem:albumListModel={
                        musicName: amr.musicName,
                        singerName:amr.albumSingers.map((as)=>as.singerName).join(","),
                        musicUrl:amr.musicUrl,
                    }
                    return listItem;
                })} 
                columns={albumListColumns} 
            />
        </Grid>
    )
}