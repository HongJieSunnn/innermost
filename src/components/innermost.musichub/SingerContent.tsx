import { ArrowBackIosNew, ExpandMore } from "@mui/icons-material"
import { Card, CardContent, CardMedia, Container, Dialog, Divider, Grid, Typography,Tooltip, CardActionArea, AccordionSummary, Accordion, AccordionDetails } from "@mui/material"
import { Descriptions, PageHeader, Table } from "antd"

const testSingers=[{
    cover:"https://y.qq.com/music/photo_new/T001R300x300M0000025NhlN2yWrP4.jpg",
    name:"周杰伦",
}
]

export default function SingerContent(props:any){
    return props.singers===undefined?(
        <InitialSingerContent/>
    ):(
        <Grid container spacing={2} justifyContent='center'>
            {testSingers.map((singer,i)=>(
                <Grid item>
                    <Tooltip title="点击查看详情" placement="top">
                        <CardActionArea>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height={240}
                                    width={240}
                                    image={singer.cover}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography variant="h5" textAlign='center'>{singer.name}</Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Tooltip>
                </Grid>
            ))}
            <SingerDetail/>
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
    "https://y.qq.com/music/photo_new/T001R300x300M000001Erp1x1jDOoQ.jpg",
    "https://y.qq.com/music/photo_new/T001R300x300M000000f1b6W1wzyRN.jpg",
    "https://y.qq.com/music/photo_new/T001R300x300M000004AlfUb0cVkN1.jpg",
    "https://y.qq.com/music/photo_new/T001R300x300M000001QVwtq3l8cKC.jpg",
    "https://y.qq.com/music/photo_new/T001R300x300M000003DBAjk2MMfhR.jpg"
]

const singerNames=[
    "周杰伦","陈奕迅","林俊杰","李荣浩","李宇春","Alan Walker","Justin Bieber","Taylor Swift",
    "米津玄師","YOASOBI","RADWIMPS","BigBang","EXO","BLACKPINK"
]

function InitialSingerContent(props:any){
    return(
        <Grid>
            <Grid>
                <Typography variant='h3' textAlign='center'>了解你喜欢的歌手</Typography>
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

function SingerDetail(props:any){
    return(
        <Dialog 
            maxWidth='md' 
            fullWidth 
            open={false}
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
            <SingerDetailHeader/>
            <Divider variant="middle" sx={{marginTop:2,marginBottom:1}}/>
            <SingerDetailContent/>{/*DialogContent's scollbar is different with scollbar belongs to whole dialog. */}
        </Dialog>
    )
}

function SingerDetailHeader(props:any){
    return(
        <PageHeader
            title={<Typography variant="subtitle1" fontFamily={'YouYuan'}>歌手详情</Typography>}
            subTitle=''
            onBack={()=>{}}
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
                    <img src="https://y.qq.com/music/photo_new/T001R300x300M0000025NhlN2yWrP4.jpg" width={300} height={300} />
                </Grid>
                <Grid item xs={12} md={7}>
                    <Typography variant="h4">
                        周杰伦
                    </Typography>

                    <Descriptions size="small" column={2}>
                        <Descriptions.Item label="别名">Jay Chou</Descriptions.Item> 
                        <Descriptions.Item label="国籍">中国</Descriptions.Item>{/* if infomation is "" not show. */}
                        <Descriptions.Item label="出生地">台湾省新北市</Descriptions.Item>
                        <Descriptions.Item label="地区分类">港台</Descriptions.Item>
                    </Descriptions>
                    <Descriptions size="small" column={1}>
                        <Descriptions.Item label="出生日期">1979年1月18日（农历腊月二十）</Descriptions.Item>
                        <Descriptions.Item label="职业">音乐人、制作人、导演、企业家等</Descriptions.Item>
                        <Descriptions.Item label="代表作品">《龙卷风》、《菊花台》、《青花瓷》、《晴天》</Descriptions.Item>
                    </Descriptions>

                </Grid>
            </Grid>
        </PageHeader>
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

function SingerDetailContent(props:any){
    return(
        <Grid p={3}>
            <Typography variant="h5" sx={{mb:2}}>
                发行歌曲
            </Typography>
            <Table 
                onRow={record => {
                    return {
                        onClick: event => {console.log(record.mid)},//TODO redirect to music
                    };
                }}
                dataSource={albumListData} 
                columns={albumListColumns} 
            />
            <SingerDetailContentAlbumsAccordion/>
        </Grid>
    )
}

function SingerDetailContentAlbumsAccordion(props:any){
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
    return(
        <Grid>
            <Accordion sx={{mt:2}}>
                <Tooltip title="点击查看发行专辑" placement="top-start">
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>发行专辑</Typography>
                    </AccordionSummary>
                </Tooltip>

                <AccordionDetails>
                    <Grid container spacing={2} justifyContent='center'>
                        {testAlbums.map((album,i)=>(
                            <Grid item>
                                <Tooltip title="点击查看详情" placement="top">
                                    <CardActionArea>{/*TODO 把开启 Dialog 以及对应的开启 state 放到 MusicHub Page ，那么我们就可以在不同组件下唤醒 Dialog （例如歌手界面唤起专辑）*/}
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                height={240}
                                                width={240}
                                                image={album.cover}
                                                alt="green iguana"
                                            />
                                            <CardContent>
                                                <Typography variant="h6">{album.name}</Typography>
                                                <Typography variant="subtitle1">发行时间：{album.publishTime}</Typography>
                                            </CardContent>
                                        </Card>
                                    </CardActionArea>
                                </Tooltip>
                            </Grid>
                        ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Grid>
    )
}