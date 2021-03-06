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
        `????${formatJsonTime(props.sharedLifeRecord?.createTime)}`,
        `????${props.sharedLifeRecord?.location===null?"???????????????":props.sharedLifeRecord.location?.locationName}`,
        `????${props.sharedLifeRecord?.musicRecord===null?"???????????????":`${props.sharedLifeRecord.musicRecord?.musicName}-${props.sharedLifeRecord.musicRecord?.singer}`}`
    ]

    const handleLikeButtonClick=async ()=>{
        let likeResult=await likeSharedLifeRecord({
            sharedLifeRecordObjectId:props.sharedLifeRecord.sharedLifeRecordObjectId,
        })

        if(likeResult){
            setLiked(true);
            setLikeCount(likeCount+1);
        }else{
            message.error("????????????");
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
                                    {props.sharedLifeRecord.userNickName}{isMe?"(??????)":""}
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
                                    {likeCount}&nbsp;{liked?"?????????":"??????"}
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
                                    {isConfidant?"?????????":"????????????"}
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
        title:"??????",
        text:"???????????????????????????????????????????????????????????????????????????????????????????????????????????????RSA????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
        location:{
            locationUId:"abc",
            locationName:"??????????????????",
            province:"?????????",
            city:"?????????",
            district:"?????????",
            address:"????????????23???",
            longitude:32.222,
            latitude:101.22,
        },
        musicRecord:{
            musicMId:"aaaa",
            musicName:"??????",
            singer:"?????????",
            album:"?????????",
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
                tagName:"??????:??????",
            },
        ],
        createTime:"2021-05-03 22:22:22",
    },
    displayCountEachLine:3,
}