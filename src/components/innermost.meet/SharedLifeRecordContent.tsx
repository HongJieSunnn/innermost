import { Add, Autorenew, MoreVert, Search } from "@mui/icons-material"
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, InputBase, Paper, TextField, Typography } from "@mui/material"
import { message, PageHeader, Tag } from "antd"
import { User } from "oidc-client"
import { useEffect, useState } from "react"
import { RootStateOrAny, Shared, useSelector } from "react-redux"
import { getRandomSharedLifeRecordsAsync } from "../../services/apiServices/meet/sharedliferecord"
import { addConfidantRequest, getConfidantsAsync } from "../../services/apiServices/meet/socialcontact"
import { getFormatedLocationTime } from "../../services/timeServices"
import { IconColor, SubTitleColor, WindowsBlue } from "../../themes/InnermostColor"
import NotSignIn from "../NotSignIn"
import { Confidant } from "./MeetTypes"
import {SharedLifeRecord, SharedLifeRecordContentRecordCard} from "./SharedLifeRecordCard"

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

export default function SharedLifeRecordContent(props:{
    confidants:Confidant[],
    user:User,
}){
    const [sharedLifeRecords, setSharedLifeRecords] = useState<Array<SharedLifeRecord>>([initShredLifeRecord]);
    const handleGetRandomSharedLifeRecords=()=>{
        getRandomSharedLifeRecordsAsync().then((sharedLifeRecords)=>{
            setSharedLifeRecords(sharedLifeRecords);
            if(sharedLifeRecords.length>0){
                message.success("随机获取成功");
            }
        });
    }

    useEffect(() => {
        handleGetRandomSharedLifeRecords();
    }, [])
    
    function SharedLifeRecordContentHeader(props:{
        user:User
    }){
        return(
            <PageHeader
                title={<Typography variant="h4" fontFamily={'YouYuan'}>记录分享🧩</Typography>}
                subTitle=''
                tags={[
                    <Tag key='1' color="blue">😆</Tag>,
                    <Tag key='2' color="orange">😉</Tag>,
                    <Tag key='3' color="#123456">😗</Tag>,
                    <Tag key='4' color="#556677">🙁</Tag>,
                    <Tag key='5' color="#FFA5BA">🏄‍♀️</Tag>,
                ]}
                extra={[
                    <Button key='1' disabled={props.user===null} variant="outlined" startIcon={<Autorenew/>} onClick={handleGetRandomSharedLifeRecords}>随机获取</Button>
                ]}
                footer={
                    <Typography variant="caption" color={SubTitleColor} fontWeight='bold' >
                        在这里，你可以发现他人对生活的感悟，我们相信总会在机缘巧合下出现一条和你 Innermost 相契合的记录
                    </Typography>
                }
            />
            
        )
    }

    function SharedLifeRecordContentRecordList(props:{
        confidants:Confidant[],
        user:User,
    }){

        const [addConfidantRequestDialogOpen, setAddConfidantRequestDialogOpen] = useState(false);
        const [addConfidantRequestDialogDetail, setAddConfidantRequestDialogDetail] = useState<SharedLifeRecord>();
        const handleAddConfidantRequestDialogOpen=(sharedLifeRecord:SharedLifeRecord)=>{
            setAddConfidantRequestDialogDetail(sharedLifeRecord);
            setAddConfidantRequestDialogOpen(true);
        }
        const handleAddConfidantRequestDialogClose=()=>{
            setAddConfidantRequestDialogOpen(false);
        }
        return sharedLifeRecords.length===0?(
            <Grid container>
                <Container maxWidth='xs' sx={{border:2,borderColor:WindowsBlue,borderRadius:2,mt:20}}>
                    <Grid item container xs={12} justifyContent='center'>
                        <Typography variant='h1'>🙂</Typography>
                    </Grid>
                    <Grid item container xs={12} justifyContent='center'>
                        <Typography variant='h6' textAlign='center'>抱歉，获取分享记录时出错了</Typography>
                    </Grid>
                </Container>
            </Grid>
        ):(
            <Grid item container mt={1} xs={12} spacing={1} height='80vh' overflow='auto'>
                {sharedLifeRecords.map((slr,i)=>(
                    <SharedLifeRecordContentRecordCard
                        key={i}
                        sharedLifeRecord={slr}
                        userId={props.user.profile.sub}
                        confidants={props.confidants}
                        handleAddConfidantRequestDialogOpen={handleAddConfidantRequestDialogOpen}
                    />
                ))}
                <AddConfidantRequestDialog 
                    open={addConfidantRequestDialogOpen} 
                    handleClose={handleAddConfidantRequestDialogClose}
                    sharedLifeRecord={addConfidantRequestDialogDetail}
                />
            </Grid>
        )
    }

    return (
        <Grid>
            <SharedLifeRecordContentHeader user={props.user}/>
            <Divider variant="middle" sx={{ marginTop:2,borderBottomWidth: 2 }}/>
            <SharedLifeRecordContentRecordList confidants={props.confidants} user={props.user}/>
        </Grid>
    )
}

function AddConfidantRequestDialog(props:{
    open:boolean,
    handleClose:()=>void,
    sharedLifeRecord:SharedLifeRecord|undefined,
}){

    const handleClose=()=>{
        setRequestMessage("");
        props.handleClose();
    }

    const [requestMessage, setRequestMessage] = useState("");

    const handleAddConfidantDialogConfirmButtonClick=async ()=>{
        handleClose();
        let addResult=await addConfidantRequest({
            toUserId:props.sharedLifeRecord!.userId,
            requestMessage:requestMessage,
        });

        if(addResult!=="发送添加好友请求失败"){
            message.success(addResult);
        }else{
            message.error(addResult);
        }
    }

    const requestMessageTextFieldChange=(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        setRequestMessage(e.target.value);
    }

    return(
        <Dialog maxWidth='xs' open={props.open} onClose={handleClose}>
            <DialogTitle>好友请求</DialogTitle>
            <DialogContent>
            <DialogContentText>
                你很喜欢 {props.sharedLifeRecord?.userNickName}@{props.sharedLifeRecord?.userName}的这句话吗？
                <br/>
                也许你们可以成为知己哦
                <br/>
                <Typography variant="caption">
                    Tip:详细的附加消息可以让对方更容易通过请求哦
                </Typography>
            </DialogContentText>
            <TextField
                autoFocus
                value={requestMessage}
                margin="dense"
                id="requestmessage"
                label="附加消息"
                type="requestmessage"
                fullWidth
                multiline
                variant="standard"
                onChange={requestMessageTextFieldChange}
            />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>取消</Button>
                <Button onClick={handleAddConfidantDialogConfirmButtonClick}>发送</Button>
            </DialogActions>
        </Dialog>
    )
}