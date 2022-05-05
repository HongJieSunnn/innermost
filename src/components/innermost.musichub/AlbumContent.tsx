import { ArrowBackIosNew } from "@mui/icons-material"
import { Card, CardActionArea, CardContent, CardMedia, Container, Dialog, Divider, Grid, Tooltip, Typography } from "@mui/material"
import { Descriptions, PageHeader, Table } from "antd"
import InitialAlbumContentBg from '../../images/backgrounds/InitialAlbumBg.png'
import { WindowsBlue } from "../../themes/InnermostColor"

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

export default function AlbumContent(props:any){
    return props.albums===undefined?(
        <InitialSongContent/>
    ):(
        <Grid container spacing={2} justifyContent='center'>
            {testAlbums.map((album,i)=>(
                <Grid item>
                    <Tooltip title="点击查看详情" placement="top">
                        <CardActionArea>
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
                                    <Typography variant="body2">歌手：{album.singer}</Typography>
                                    <Typography variant="subtitle1">发行时间：{album.publishTime}</Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Tooltip>
                </Grid>
            ))}
            <AlbumDetail/>
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
                    <Typography variant='h3' textAlign='center'>探索你想发现的专辑</Typography>
                </Grid>
            </Container>
        </Grid>
    )
}

function AlbumDetail(props:any){
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
            <AlbumDetailHeader/>
            <Divider variant="middle" sx={{marginTop:2,marginBottom:1}}/>
            <AlbumDetailContent/>{/*DialogContent's scollbar is different with scollbar belongs to whole dialog. */}
        </Dialog>
    )
}

function AlbumDetailHeader(props:any){
    return(
        <PageHeader
            title={<Typography variant="subtitle1" fontFamily={'YouYuan'}>专辑详情</Typography>}
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
                    <img src="https://y.qq.com/music/photo_new/T002R300x300M000001BGzMs369FzU_1.jpg" width={300} height={300} />
                </Grid>
                <Grid item xs={12} md={7}>
                    <Typography variant="h4">
                        寻找周杰伦
                    </Typography>

                    <Descriptions size="default" column={1}>
                        <Descriptions.Item label='歌手'>周杰伦</Descriptions.Item>
                    </Descriptions>

                    <Descriptions size="small" column={2}>
                        <Descriptions.Item label="流派">POP流行</Descriptions.Item> 
                        <Descriptions.Item label="语种">国语</Descriptions.Item>
                        <Descriptions.Item label="发行时间">2003-11-13</Descriptions.Item>
                        <Descriptions.Item label="唱片公司">杰威尔音乐有限公司</Descriptions.Item>
                    </Descriptions>

                    <Descriptions size="small" title='简介'/>
                    <Typography 
                        variant="body2" 
                        paragraph
                        color='#DCDCDC'
                        fontWeight='bold'
                        fontFamily={'Cascadia Code'}>
                        《周杰伦&叶惠美：寻找周杰伦EP》是与同名电影作为结合的一张EP专辑，收录了主题曲“轨迹”、插曲“断了的弦”及其卡拉OK版本。为了感谢Jay歌迷一直的支持，随EP特别加送他上一张专辑《叶惠美》11首MV之VCD，让歌迷可以完整收藏Jay的每一首歌曲！爱情就像一张遗失的唱片，在这出《寻找周杰伦》电影里，那是一张神秘的周杰伦唱片，说它神秘，是因唱片里面藏有一首神秘的歌曲，当整张唱片所有曲目播完时，才会突然出现的“hidden track”，它没有名字，没有封面说明！“hidden track”曾经伴著片中的女主角的初恋一起燃烧过，失恋后的她为了找回那种燃烧的感觉，于是展开一次《寻找周杰伦》的旅程。 周杰伦遇上电影的第一次，创造出绝美的情歌。 轨迹《寻找周杰伦》电影主题曲，杰伦以[英式抒情摇滚]曲风，深情唱出恋人在分手后，依循过去的痕迹找寻想念的身影，在忘记之前、直到看不见。 断了的弦《寻找周杰伦》电影插曲，清新小品曲风，说明失去相爱的感觉，就像断掉的弦，弹不出优美的旋律，唯有相爱的两人，才能有最美的音色。 2首Original Karaoke版让你可在KTV之外尽情欢唱，9首[叶惠美]专辑千万制作MV，首度公开发表[懦夫]、[爱情悬崖]新出炉MV，独家收录，支支精彩
                    </Typography>

                </Grid>
            </Grid>
        </PageHeader>
    )
}

interface albumListModel{
    mid:string,
    musicName:string,
    singerName:string
}

const albumListData:albumListModel[] = [
    {
        mid:'abc',
        musicName: '轨迹',
        singerName:'周杰伦'
    },
    {
        mid:'abc',
        musicName: '断了的弦',
        singerName:'周杰伦'
    },
  ];

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

function AlbumDetailContent(props:any){
    return(
        <Grid p={3}>
            <Table 
                onRow={record => {
                    return {
                        onClick: event => {console.log(record.mid)},
                    };
                }}
                pagination={false} 
                dataSource={albumListData} 
                columns={albumListColumns} 
            />
        </Grid>
    )
}