import { Avatar, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, List, Paper, TextField, Typography } from "@mui/material";
import { message, Tooltip } from "antd";
import { FunctionComponent, useState } from "react";
import { TagSummary } from "../../pages/innermost.tag/TagSPage";
import { likeSharedLifeRecord } from "../../services/apiServices/meet/sharedliferecord";
import { addConfidantRequest } from "../../services/apiServices/meet/socialcontact";
import { formatJsonTime } from "../../services/timeServices";
import { SubTitleColor, WindowsBlue } from "../../themes/InnermostColor";
import { Confidant } from "./MeetTypes";

interface SharedLifeRecordContentRecordCardProps{
    sharedLifeRecord:SharedLifeRecord;
    displayCountEachLine?:number;
    boder?:number;
    height?:number;
    userId:string;
    confidants?:Confidant[];
    handleAddConfidantRequestDialogOpen?:(sharedLifeRecord:SharedLifeRecord)=>void;
}

export interface SharedLifeRecord{
    sharedLifeRecordObjectId:string;
    userId:string;
    userName:string;
    userNickName:string;
    userAvatarUrl:string;
    title?:string;
    text:string;
    location?:Location;
    musicRecord?:MusicRecord;
    imagePaths?:string[];
    likesCount:number;
    likes:Liker[];
    tagSummaries:TagSummary[];
    createTime:string;
    updateTime?:string;
    deleteTime?:string;
}

export interface Location{
    locationUId?:string;
    locationName?:string;
    province?:string;
    city?:string;
    district?:string;
    address?:string;
    longitude?:number;
    latitude?:number;
}

export interface MusicRecord{
    musicMId?:string;
    musicName?:string;
    singer?:string;
    album?:string;
}

export interface Liker{
    likerUserId:string;
    likerUserName:string;
    likerUserNickName:string;
    likerUserAvatarUrl:string;
    likeTime:string;
}

export const SharedLifeRecordContentRecordCard:FunctionComponent<SharedLifeRecordContentRecordCardProps>=(props)=>{
    const signinUserId=props.userId;
    const [liked, setLiked] = useState<boolean>(props.sharedLifeRecord?.likes.filter(l=>l.likerUserId===signinUserId).length!==0);
    const [likeCount, setLikeCount] = useState<number>(props.sharedLifeRecord.likesCount);
    const isMe:boolean=props.userId===undefined?false:(props.sharedLifeRecord?.userId===signinUserId);
    const showAddConfidantButton=props.confidants===undefined?'none':'flex';
    const isConfidant:boolean=props.confidants===undefined?true:(props.confidants.filter(c=>c.confidantUserId===props.sharedLifeRecord.userId).length>0)
    const infomations=[
        `@${props.sharedLifeRecord?.userName}`,
        `📆${formatJsonTime(props.sharedLifeRecord?.createTime)}`,
        `📌${props.sharedLifeRecord?.location===null?"无位置记录":props.sharedLifeRecord.location?.locationName}`,
        `🎧${props.sharedLifeRecord?.musicRecord===null?"无音乐记录":`${props.sharedLifeRecord.musicRecord?.musicName}-${props.sharedLifeRecord.musicRecord?.singer}`}`
    ]

    const handleLikeButtonClick=async ()=>{
        let likeResult=await likeSharedLifeRecord({
            sharedLifeRecordObjectId:props.sharedLifeRecord.sharedLifeRecordObjectId,
        })

        if(likeResult){
            setLiked(true);
            setLikeCount(likeCount+1);
        }else{
            message.error("点赞失败");
        }
    }

    return(
        <Grid container item xs={12} xl={props.displayCountEachLine===undefined?6:12/props.displayCountEachLine} height='fit-content'>
            <Paper sx={{ display: 'flex',borderRadius:2 ,width:'100%',border:props.boder===undefined?2:props.boder,borderColor:WindowsBlue}}>
                <Grid container pb={1} spacing={1}>
                    <Grid container item xs={12} >
                        <Grid container item p={1} xs={2} justifyContent='center'>
                            <Avatar variant="rounded" sx={{width:50,height:50}} src={props.sharedLifeRecord.userAvatarUrl}></Avatar>
                        </Grid>
                        <Grid item xs={10}>
                            <Grid item container>
                                <Typography variant="subtitle1" noWrap fontFamily={'"Cascadia Code","YouYuan"'} pt={1} pl={1}>
                                    {props.sharedLifeRecord.userNickName}{isMe?"(自己)":""}
                                </Typography>
                            </Grid>
                            <Grid item container>
                                {infomations.map((infor,i)=>(
                                    <Tooltip key={i} title={infor}>
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
                        <List id={'confidantslist'} dense component="div" role="list" sx={{height:(props.height===undefined?200:props.height)}}>
                            <Typography 
                                variant="body2" 
                                paragraph
                                color='#DCDCDC'
                                fontWeight='bold'
                                fontFamily={'Cascadia Code'}
                            >{/*sx identify max lines */}
                                {props.sharedLifeRecord.text}
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
                                    disabled={liked||isMe||props.sharedLifeRecord.likesCount==-1}
                                    onClick={handleLikeButtonClick}
                                >
                                    {likeCount}&nbsp;{liked?"已点赞":"点赞"}
                                </Button>
                            </Grid>
                            <Grid item xs>
                                <Button 
                                    disabled={isMe||isConfidant} 
                                    fullWidth 
                                    variant="outlined" 
                                    color='info'
                                    sx={{display:showAddConfidantButton}}
                                    onClick={()=>{
                                        if(props.handleAddConfidantRequestDialogOpen!==undefined){
                                            props.handleAddConfidantRequestDialogOpen(props.sharedLifeRecord)
                                        }
                                    }}
                                >
                                    {isConfidant?"已添加":"添加好友"}
                                </Button>
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
        location:{
            locationUId:"abc",
            locationName:"南京工业大学",
            province:"江苏省",
            city:"南京市",
            district:"浦口区",
            address:"浦珠南路23号",
            longitude:32.222,
            latitude:101.22,
        },
        musicRecord:{
            musicMId:"aaaa",
            musicName:"借口",
            singer:"周杰伦",
            album:"七里香",
        },
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