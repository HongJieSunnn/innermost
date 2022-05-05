import { Avatar,Accordion, AccordionDetails, AccordionSummary, Card, CardActionArea, CardContent, CardMedia, Container, Dialog, DialogContent, Divider, Grid, Link, Paper, Tooltip, Typography } from "@mui/material"
import { WindowsBlue } from "../../themes/InnermostColor"
import InitialSongContentBg from '../../images/backgrounds/InitialSongContentBg.png'
import { Descriptions, PageHeader } from "antd"
import { ArrowBackIosNew,ExpandMore } from "@mui/icons-material"

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

export default function SongContent(props:any){
    return props.songs!==undefined?(
        <InitialSongContent/>
    ):(
        <Grid container spacing={2} justifyContent='center'>
            {testSongs.map((song,i)=>(
                <Grid item>
                    <Tooltip title="点击查看详情" placement="top">
                        <CardActionArea>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height={240}
                                    width={240}
                                    image={song.cover}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography variant="h6">{song.name}</Typography>
                                    <Typography variant="body2">歌手：{song.singer}</Typography>
                                    <Typography variant="subtitle1">专辑：{song.album}</Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Tooltip>
                </Grid>
            ))}
            <SongDetail/>
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
                    <Typography variant='h3' textAlign='center'>探索你想发现的音乐</Typography>
                </Grid>
            </Container>
        </Grid>
    )
}

function SongDetail(props:any){
    return(
        <Dialog 
            maxWidth='md' 
            fullWidth 
            open={true}
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
            <SongDetailHeader/>
            <Divider variant="middle" sx={{marginTop:2,marginBottom:1}}/>
            <SongDetailContent/>{/*DialogContent's scollbar is different with scollbar belongs to whole dialog. */}
        </Dialog>
    )
}

function SongDetailHeader(props:any){
    return(
        <PageHeader
            title={<Typography variant="subtitle1" fontFamily={'YouYuan'}>歌曲详情</Typography>}
            subTitle=''
            onBack={()=>{}}
            backIcon={<ArrowBackIosNew/>}
            tags={[
                
            ]}
            extra={[
                
            ]}
            footer={
                <LyricAccodion/>
            }
        >
            <Grid container>
                <Grid item xs={12} md={5} justifyContent='center'>
                    <img src="https://y.qq.com/music/photo_new/T002R300x300M000000f01724fd7TH_1.jpg" width={300} height={300} />
                </Grid>
                <Grid item xs={12} md={7}>
                    <Typography variant="h4">
                        星晴
                    </Typography>

                    <Descriptions size="default" column={1}>
                        <Descriptions.Item label='歌手'>周杰伦</Descriptions.Item>
                    </Descriptions>

                    <Descriptions size="small" column={2}>
                        <Descriptions.Item label="专辑">Jay</Descriptions.Item>
                        <Descriptions.Item label="语种">国语</Descriptions.Item>
                        <Descriptions.Item label="流派">Pop</Descriptions.Item>
                        <Descriptions.Item label="唱片公司">杰威尔音乐有限公司</Descriptions.Item>
                        <Descriptions.Item label="发行时间">
                            2000-11-07
                        </Descriptions.Item>
                    </Descriptions>

                    <Descriptions size="small" title='简介'/>
                    <Typography 
                        variant="body2" 
                        paragraph
                        color='#DCDCDC'
                        fontWeight='bold'
                        fontFamily={'Cascadia Code'}>
                        《星晴》这首歌的作词、作曲、合声编写、自搭guitar及合声都是由周杰伦亲自完成，歌曲中的合声则录制了21轨之多。前奏的汽车引擎是由PORCH收音。
                    </Typography>

                </Grid>
            </Grid>
        </PageHeader>
    )
}

function LyricAccodion(props:any){
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
                    <Typography>
                        星晴 - 周杰伦 (Jay Chou)<br/>词：周杰伦<br/>曲：周杰伦<br/>编曲：洪敬尧<br/>一步两步三步四步望着天手牵手<br/>一颗两颗三颗四颗连成线看星星<br/>一步两步三步四步望着天手牵手<br/>一颗两颗三颗四颗连成线看星<br/>乘着风游荡在蓝天边<br/>一片云掉落在我面前<br/>捏成你的形状<br/>随风跟着我<br/>一口一口吃掉忧愁<br/>载着你仿佛载着阳光<br/>不管到哪里都是晴天<br/>蝴蝶自在飞<br/>花也布满天<br/>一朵一朵因你而香<br/>试图让夕阳飞翔<br/>带领你我环绕大自然<br/>迎着风<br/>开始共度每一天<br/>手牵手<br/>一步两步三步四步望着天<br/>看星星一颗两颗三颗四颗连成线<br/>背对背<br/>默默许下心愿<br/>看远方的星<br/>是否听的见<br/>手牵手<br/>一步两步三步四步望着天<br/>看星星一颗两颗三颗四颗连成线<br/>背对背<br/>默默许下心愿<br/>看远方的星<br/>如果听的见<br/>它一定实现<br/>载着你仿佛载着阳光<br/>不管到哪里都是晴天<br/>蝴蝶自在飞<br/>花也布满天<br/>一朵一朵因你而香<br/>试图让夕阳飞翔<br/>带领你我环绕大自然<br/>迎着风<br/>开始共度每一天<br/>手牵手一步两步三步四步望着天<br/>看星星一颗两颗三颗四颗连成线<br/>背对背<br/>默默许下心愿<br/>看远方的星<br/>是否听的见<br/>手牵手一步两步三步四步望着天<br/>看星星一颗两颗三颗四颗连成线<br/>背对背<br/>默默许下心愿<br/>看远方的星<br/>如果听的见<br/>它一定实现
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
                <SongDetailContentRecordSummary/>
            </Grid>
        </Grid>
    )
}

function SongDetailContentRecordSummary(props:any){
    return(
        <Grid item xs={12}>
            <Paper sx={{ display: 'flex',borderRadius:2 ,width:'100%'}}>
                <Grid container pb={1} spacing={1}>
                    <Grid container item xs={12} >
                        <Grid item p={1}>
                            <Avatar variant="rounded" sx={{width:50,height:50}}></Avatar>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" noWrap fontFamily={'"Cascadia Code","YouYuan"'} pt={1} pl={1}>
                                HongJieSun
                                <br/>
                                📆 2022-4-13 13:33:33
                            </Typography>
                        </Grid>
                    </Grid>

                    <Container sx={{mt:1}}>
                        <Grid item xs={12}>
                                <Typography 
                                    variant="body2" 
                                    paragraph
                                    color='#DCDCDC'
                                    fontWeight='bold'
                                    fontFamily={'Cascadia Code'}
                                >{/*sx identify max lines */}
                                    二手摩托尾气臭黑痞老板的电脑老婆凯伦用量子技术弄出了分子超黑超略吧热狗破解RSA加密算法，使瑜典二手摩托启动量子纠缠特性，导致我放在家里的麻辣火锅底料量子衰变成为番茄火锅底料，随后被我煮掉吃了并被量子衰变给影响，从而导致我代码写不出来去扫厕所，偶然发现马桶蓝月亮的蓝色很漂亮，于是骑车来到海边导致腿好酸，吃了碗拌面清汤忘记放醋，结果猪油太油，使拌面表面产生超滑平面，使空气里的一个中子一不小心滑倒了而引起了链式反应时空扭曲，使我自行车被吞没最终找不到女朋友
                                </Typography>
                        </Grid>
                    </Container>
                </Grid>
            </Paper>
        </Grid>
    )
}