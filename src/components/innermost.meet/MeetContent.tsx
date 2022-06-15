import { HubConnection } from "@microsoft/signalr";
import { Add, ArrowBackIosNew, Autorenew, Search } from "@mui/icons-material";
import { Avatar, Badge, Button, CardActionArea, Container, Dialog, DialogContent, Divider, Grid, IconButton, InputBase, List, Menu, Paper, Typography } from "@mui/material";
import { message, PageHeader, Tag } from "antd";
import { User } from "oidc-client";
import { createRef, useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { SignalRContext } from "../../pages/innermost.meet/MeetPage";
import { getRandomSharedLifeRecordsAsync } from "../../services/apiServices/meet/sharedliferecord";
import { getConfidantRequestsAsync, getConfidantsAsync } from "../../services/apiServices/meet/socialcontact";
import { statueChineseDictionary, statueEmojiDictionary } from "../../services/statueServices";
import { getFormatedLocationTime } from "../../services/timeServices";
import { ErrorColor, GuiJiBlue, randomInternalTagColor, SubTitleColor, SunSetOrigin, WindowsBlue } from "../../themes/InnermostColor";
import NotSignIn from "../NotSignIn";
import ConfidantsBar from "./ConfidantsBar";
import { ChattingRecord, Confidant, ConfidantRequest } from "./MeetTypes";
import { SharedLifeRecord, SharedLifeRecordContentRecordCard } from "./SharedLifeRecordCard";
import SharedLifeRecordContent from "./SharedLifeRecordContent";

export const initShredLifeRecord:SharedLifeRecord={
    sharedLifeRecordObjectId:"init",
    userId:"13B8D30F-CFF8-20AB-8D40-1A64ADA8D067",//Admin
    userName:"Admin",
    userNickName:"管理员",
    userAvatarUrl:"",
    title:"你好，这是一条来自管理员的提醒。",
    text:"目前还没有任何用户分享了他们的心情记录哦，您也许可以成为第一个分享心情记录的人哦",
    likesCount:-1,
    likes:[],
    tagSummaries:[],
    createTime:getFormatedLocationTime(),
};

export default function MeetContent(props:{
    user:User,
}){
    const [confidants, setConfidants] = useState<Array<Confidant>>([])
    const [notReceivedMessageUsers, setNotReceivedMessageUsers] = useState<Array<string>>(new Array<string>());

    SignalRContext.useSignalREffect(
        "NotReceviedChattingMessage",
        (chattingRecord) => {
            setNotReceivedMessageUsers(notReceivedMessageUsers.concat(chattingRecord.sendUserId));
        },
        [notReceivedMessageUsers],
    );

    useEffect(() => {
        if(props.user===null){
            return;
        }
    }, [])

    return props.user===null?(
        <NotSignIn/>
    ):(
        <Grid container columnSpacing={1}>
            <Grid item xl={2} display={{xs:'none',xl:'block'}}>
                <ConfidantsBar 
                    confidants={confidants} 
                    setConfidants={setConfidants} 
                    notReceivedMessageUsers={notReceivedMessageUsers} 
                    setNotReceivedMessageUsers={setNotReceivedMessageUsers}
                />
            </Grid>

            <Grid item xs={12} xl={8} borderLeft={1} borderRight={1} borderColor="#2B2B2B" pr={1}> {/*spacing 1 will pl 1 */}
                <SharedLifeRecordContent user={props.user} confidants={confidants}/>
            </Grid>

            <Grid item xs={0} xl={2} display={{xs:'none',xl:'block'}}>
                
            </Grid>
        </Grid>
    )
}