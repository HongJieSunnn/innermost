import { Avatar, Button, Container, Grid, List, Paper, Typography } from "@mui/material";
import { Tooltip } from "antd";
import { FunctionComponent } from "react";
import { TagSummary } from "../../pages/innermost.tag/TagSPage";
import { SubTitleColor, WindowsBlue } from "../../themes/InnermostColor";

interface SharedLifeRecordContentRecordCardProps{
    sharedLifeRecord?:SharedLifeRecord;
    displayCountEachLine?:number;
}

export interface SharedLifeRecord{
    sharedLifeRecordObjectId:string;
    userId:string;
    userName:string;
    userNickName:string;
    userAvatarUrl:string;
    title?:string;
    text:string;
    locationUId?:string;
    locationName?:string;
    province?:string;
    city?:string;
    district?:string;
    address?:string;
    longitude?:number;
    latitude?:number;
    musicMId?:string;
    musicName?:string;
    singer?:string;
    album?:string;
    imagePaths?:string[];
    likesCount:number;
    likes:Liker[];
    tagSummaries:TagSummary[];
    createTime:string;
    updateTime?:string;
    deleteTime?:string;
}

export interface Liker{
    likerUserId:string;
    likerUserName:string;
    likerUserNickName:string;
    likerUserAvatarUrl:string;
    likeTime:string;
}

export const SharedLifeRecordContentRecordCard:FunctionComponent<SharedLifeRecordContentRecordCardProps>=(props)=>{
    const signinUserId='b';
    const liked:boolean=props.sharedLifeRecord?.likes.filter(l=>l.likerUserId===signinUserId).length!==0;
    const infomations=[
        `@${props.sharedLifeRecord?.userName}`,
        `📆${props.sharedLifeRecord?.createTime}`,
        `📌${props.sharedLifeRecord?.locationName}`,
        `🎧${props.sharedLifeRecord?.musicName}-${props.sharedLifeRecord?.singer}`
    ]
    return(
        <Grid container item xs={12} xl={props.displayCountEachLine===undefined?6:12/props.displayCountEachLine}>
            <Paper sx={{ display: 'flex',borderRadius:2 ,width:'100%',border:2,borderColor:WindowsBlue}}>
                <Grid container pb={1} spacing={1}>
                    <Grid container item xs={12} >
                        <Grid container item p={1} xs={2} justifyContent='center'>
                            <Avatar variant="rounded" sx={{width:50,height:50}} src={props.sharedLifeRecord?.userAvatarUrl}></Avatar>
                        </Grid>
                        <Grid item xs={10}>
                            <Grid item container>
                                <Typography variant="subtitle1" noWrap fontFamily={'"Cascadia Code","YouYuan"'} pt={1} pl={1}>
                                    {props.sharedLifeRecord?.userNickName}
                                </Typography>
                            </Grid>
                            <Grid item container>
                                {infomations.map((infor,i)=>(
                                    <Tooltip title={infor}>
                                        <Grid container item xs={6}>
                                            <Typography noWrap variant="caption" color={SubTitleColor} fontFamily={'"Cascadia Code","YouYuan"'}>
                                                {infor}
                                            </Typography>
                                        </Grid>
                                    </Tooltip>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Container sx={{mt:1,overflow: 'auto'}}>
                        <List id={'confidantslist'} dense component="div" role="list" sx={{height: 200}}>
                            <Typography 
                                variant="body2" 
                                paragraph
                                color='#DCDCDC'
                                fontWeight='bold'
                                fontFamily={'Cascadia Code'}
                            >{/*sx identify max lines */}
                                {props.sharedLifeRecord?.text}
                            </Typography>
                        </List>
                    </Container>

                    <Grid container alignItems='flex-end'>
                    <Container sx={{mt:1}}>
                        <Grid item container xs={12} spacing={1}>
                            <Grid item xs>
                                <Button 
                                    fullWidth 
                                    variant="contained" 
                                    color='error'
                                    disabled={liked}
                                >
                                    {liked?"已点赞":"点赞"}
                                </Button>
                            </Grid>
                            <Grid item xs>
                                <Button fullWidth variant="outlined" color='info'>添加好友</Button>
                            </Grid>
                        </Grid>
                    </Container>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

SharedLifeRecordContentRecordCard.defaultProps={
    sharedLifeRecord:{
        sharedLifeRecordObjectId:"abc",
        userId:"abbbb",
        userName:"HongJieSun",
        userNickName:"HongJieSunnn",
        userAvatarUrl:"https://innermost-user-img-1300228246.cos.ap-nanjing.myqcloud.com/avatars/13ED0CD35270F8C5850930EB2975B12F.jpg",
        title:"无语",
        text:"二手摩托尾气臭黑痞老板的电脑老婆凯伦用量子技术弄出了分子超黑超略吧热狗破解RSA加密算法，使瑜典二手摩托启动量子纠缠特性，导致我放在家里的麻辣火锅底料量子衰变成为番茄火锅底料，随后被我煮掉吃了并被量子衰变给影响，从而导致我代码写不出来去扫厕所，偶然发现马桶蓝月亮的蓝色很漂亮，于是骑车来到海边导致腿好酸，吃了碗拌面清汤忘记放醋，结果猪油太油，使拌面表面产生超滑平面，使空气里的一个中子一不小心滑倒了而引起了链式反应时空扭曲，使我自行车被吞没最终找不到女朋友",
        locationUId:"abc",
        locationName:"南京工业大学",
        province:"江苏省",
        city:"南京市",
        district:"浦口区",
        address:"浦珠南路23号",
        longitude:32.222,
        latitude:101.22,
        musicMId:"aaaa",
        musicName:"借口",
        singer:"周杰伦",
        album:"七里香",
        imagePaths:new Array<string>(),
        likesCount:10,
        likes:[
            {
                likerUserId:"b",
                likerUserName:"Yuri",
                likerUserNickName:"Yuriii",
                likerUserAvatarUrl:"https://img1.baidu.com/it/u=3551121392,119175192&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                likeTime:"2021-05-03 22:22:22"
            }
        ],
        tagSummaries:[
            {
                tagId:"abccc",
                tagName:"心情:积极",
            },
        ],
        createTime:"2021-05-03 22:22:22",
    },
    displayCountEachLine:3,
}