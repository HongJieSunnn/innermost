import { HubConnection } from "@microsoft/signalr";
import { Add, ArrowBackIosNew, Search } from "@mui/icons-material";
import { Avatar, Badge, Button, CardActionArea, Container, Dialog, DialogContent, Divider, Grid, IconButton, InputBase, List, Menu, Paper, Typography } from "@mui/material";
import { message, PageHeader, Tag } from "antd";
import { User } from "oidc-client";
import { createRef, useEffect, useRef, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { SignalRContext } from "../../pages/innermost.meet/MeetPage";
import { getChattingRecordsAsync } from "../../services/apiServices/meet/chattingcontext";
import { getConfidantRequestsAsync, getConfidantsAsync, setConfidantRequestStatue } from "../../services/apiServices/meet/socialcontact";
import { statueEmojiDictionary,statueChineseDictionary } from "../../services/statueServices";
import {formatJsonTime, getFormatedLocationTime} from "../../services/timeServices";
import { ErrorColor, GuiJiBlue, randomInternalTagColor, SubTitleColor, SunSetOrigin, WindowsBlue } from "../../themes/InnermostColor";
import { ChattingRecord, Confidant, ConfidantRequest } from "./MeetTypes";



export default function ConfidantsBar(props:{
    confidants:Confidant[],
    setConfidants:React.Dispatch<React.SetStateAction<Confidant[]>>,
    notReceivedMessageUsers:Array<string>,
    setNotReceivedMessageUsers:React.Dispatch<React.SetStateAction<string[]>>,
}){
    let user:User=useSelector((state:RootStateOrAny|null)=>state.auth.user);

    useEffect(() => {
        if(user===null){
            return;
        }
        getConfidantsAsync().then((confidants)=>{
            props.setConfidants(confidants);
        });
    }, [user])

    return(
        <Grid item p={1} height='93vh' bgcolor='#1F1F1F'>
            <Typography variant="h5">
                好友列表
            </Typography>
            <Typography variant="caption" color={SubTitleColor}>
                &nbsp;&nbsp;在 Innermost ，我们更愿意将好友称之为知己
            </Typography>
            <Divider/>
            <ConfidantsBarSearchBar/>
            <ConfidantsBarConfidantRequestButton setConfidants={props.setConfidants}/>
            <Divider sx={{mt:1}} />
            <ConfidantsBarConfidantsList 
                confidants={props.confidants} 
                signInUser={user} 
                notReceivedMessageUsers={props.notReceivedMessageUsers} 
                setNotReceivedMessageUsers={props.setNotReceivedMessageUsers}
            />
        </Grid>
    )
}

function ConfidantsBarSearchBar(props:any){
    return(
        <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
        >                
            <InputBase
                sx={{ ml: 1, flex: 1,fontSize:13 }}
                placeholder={"搜索好友"}
                inputRef={props.focusRef}
            />
            <IconButton size='small' sx={{ p: '10px' }} aria-label="search">
                <Search sx={{fontSize:15,fontWeight:'bold'}} />
            </IconButton>
        </Paper>
    )
}

function ConfidantsBarConfidantRequestButton(props:{
    setConfidants:React.Dispatch<React.SetStateAction<Confidant[]>>,
}){
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [confidantRequestAnchorEl,setConfidantRequestAnchorEl]= useState<null | HTMLElement>(null);
    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        if(confidantRequestAnchorEl===null){
            setConfidantRequestAnchorEl(event.currentTarget);
        }
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const [confidantReqeusts, setConfidantReqeusts] = useState<Array<ConfidantRequest>>([]);

    const [accepted, setAccepted] = useState(confidantReqeusts.map((r,i)=>false));
    const [refused, setRefused] = useState(confidantReqeusts.map((r,i)=>false));

    useEffect(() => {
        getConfidantRequestsAsync().then((requests)=>{
            setConfidantReqeusts(requests);
        });
    }, [])

    function ConfidantsBarConfidantRequestMenu(props:{
        setConfidants:React.Dispatch<React.SetStateAction<Confidant[]>>,
        transformOrigin?:any,
        anchorOrigin?:any,
    }){

        const handlePassButtonClick=async(i:number)=>{
            let confidantReqeust=confidantReqeusts[i];

            let ans=await setConfidantRequestStatue({
                confidantRequestId:confidantReqeust.requestId,
                requestUserId:confidantReqeust.requestUserId,
                confidantRequestStatue:{
                    id:2,
                    name:"Passed",
                }
            });

            if(ans===false){
                message.error("同意好友请求状态失败");
                return;
            }else{
                message.success(ans);
            }

            let copyAccepted=[...accepted];
            copyAccepted[i]=true;
            setAccepted(copyAccepted);
            //refresh confidants list.
            getConfidantsAsync().then((confidants)=>{
                props.setConfidants(confidants);
            })
        }

        const handleRefuseButtonClick=async(i:number)=>{
            let confidantReqeust=confidantReqeusts[i];
            let ans=await setConfidantRequestStatue({
                confidantRequestId:confidantReqeust.requestId,
                requestUserId:confidantReqeust.requestUserId,
                confidantRequestStatue:{
                    id:3,
                    name:"Refused",
                }
            });

            if(ans===false){
                message.error("拒绝好友请求状态失败");
                return;
            }else{
                message.success(ans);
            }

            let copyRefused=[...refused];
            copyRefused[i]=true;
            setRefused(copyRefused);
        }
        return(
            <Menu
                id="menu-confidant-request"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                PaperProps={{
                    elevation: 0,
                    sx: {
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      '& .MuiList-root': {
                        paddingTop:0
                      },
                      '&:before': {
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                      borderRadius:3,
                      bgcolor:'#161616',
                    },
                }}
                transformOrigin={props.transformOrigin??{ horizontal: 'center', vertical: 'top' }}
                anchorOrigin={props.anchorOrigin??{ horizontal: 'center', vertical: 'bottom' }}
            >
                {confidantReqeusts.length===0?(
                    <Grid p={3} ml={3} mr={3}>
                        暂无请求
                    </Grid>
                ):(
                    <Grid width={280} m={1}>
                        {confidantReqeusts.map((r,i)=>(
                            <Grid container mt={1} border={2} borderRadius={2} borderColor={WindowsBlue}>
                                <Grid item mt={1} xs={3}>
                                    <Avatar variant="rounded" src={r.requestUserAvatarUrl} sx={{width:50,height:50}}></Avatar>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="subtitle1" noWrap fontFamily={'"Cascadia Code","YouYuan"'}>
                                        {r.requestUserNickName}
                                    </Typography>
                                    <Typography variant="caption" color={SubTitleColor} fontFamily={'"Cascadia Code","YouYuan"'}>
                                        {r.requestMessage}
                                    </Typography>
                                </Grid>
                                <Grid container item xs={12} spacing={1}>
                                    <Grid item xs={6}>
                                        <Button disabled={accepted[i]||refused[i]} fullWidth onClick={()=>handlePassButtonClick(i)}>{accepted[i]?'已同意':'同意'}</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button disabled={accepted[i]||refused[i]} fullWidth color="error" onClick={()=>handleRefuseButtonClick(i)}>{refused[i]?'已拒绝':'拒绝'}</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Menu>
        )
    }

    return(
        <Grid>
            <Button 
                variant='outlined' 
                startIcon={
                    <Badge 
                        color='error' 
                        variant={confidantReqeusts.length===0?undefined:'dot'}
                        overlap="circular" 
                        anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
                        >
                            <Add/>
                        </Badge>} 
                fullWidth 
                sx={{mt:1}} 
                onClick={handleOpenMenu}
            >
                好友请求
            </Button>

            <ConfidantsBarConfidantRequestMenu setConfidants={props.setConfidants}/>
        </Grid>
    )
}

function ConfidantsBarConfidantsList(props:{
    confidants:Array<Confidant>,
    signInUser:User,
    notReceivedMessageUsers:Array<string>,
    setNotReceivedMessageUsers:React.Dispatch<React.SetStateAction<string[]>>,
}){
    const [openChattingContent, setOpenChattingContent] = useState(false);
    const [openChattingContextConfidant, setOpenChattingContextConfidant] = useState<Confidant>();
    const handleChattingContentOpen=async (openChattingContextConfidant:Confidant)=>{
        props.setNotReceivedMessageUsers(props.notReceivedMessageUsers.filter(u=>u!==openChattingContextConfidant.confidantUserId))
        setOpenChattingContextConfidant(openChattingContextConfidant);
        setOpenChattingContent(true);
    }
    const handleChattingContentClose=()=>{
        setOpenChattingContent(false);
    }
    
    return props.confidants.length===0?(
        <Grid mt={5} container justifyContent='center'>
            <Typography>
                ☹️抱歉，加载失败了
            </Typography>
        </Grid>
    ):(
        <List id={'confidantslist'} dense component="div" role="list" sx={{height: '75%',overflow: 'auto'}}>
            {props.confidants.map((c,i)=>(
                <CardActionArea 
                    key={i} 
                    sx={{mt:1,border:2,borderRadius:2,borderColor:c.confidantOnline?'#FF6233':'#666666'}} 
                    onClick={()=>handleChattingContentOpen(c)}
                >
                    <Grid container>
                        <Grid item xs={3}>
                        <Badge 
                            //if while we connect to chatHub,there contains not received message,add dot badge to confidant
                            invisible={props.notReceivedMessageUsers.indexOf(c.confidantUserId)<0}
                            overlap="circular" 
                            color="error" 
                            variant="dot" 
                            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                        >
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    statueEmojiDictionary[c.confidantStatue]
                                }
                            >
                                <Avatar variant="rounded" src={c.confidantAvatarUrl} sx={{width:50,height:50}}></Avatar>
                            </Badge>
                        </Badge>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="subtitle2" noWrap fontFamily={'"Cascadia Code","YouYuan"'}>
                                {c.confidantUserNickName}
                            </Typography>
                            <Typography variant="caption" color={SubTitleColor} fontFamily={'"Cascadia Code","YouYuan"'}>
                                状态:{c.confidantOnline?statueChineseDictionary[c.confidantStatue]:"离线"}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardActionArea>
            ))}
            <ConfidantChattingContext 
                open={openChattingContent} 
                handleClose={handleChattingContentClose} 
                confidant={openChattingContextConfidant}
                signInUser={props.signInUser}
            />
        </List>
    )
}

function ConfidantChattingContext(props:{
    open:boolean,
    handleClose:()=>void,
    confidant:Confidant|undefined,
    signInUser:User,
}){
    const [chattingRecords, setChattingRecords] = useState<Array<ChattingRecord>>([]);
    useEffect(() => {
        if(props.signInUser===null){
            return;
        }
        if(props.open===true){
            getChattingRecordsAsync(props.confidant?.chattingContextId).then((chattingRecords)=>{
                setChattingRecords(chattingRecords);
            });
        }
    }, [props.open,props.signInUser])

    function ConfidantChattingContextHeader(props:any){
        return(
            <PageHeader
                title={<Typography variant="h5" fontFamily={'"Cascadia Code","YouYuan"'}>{props.userNickName}</Typography>}
                subTitle={'@ '+props.userName}
                onBack={()=>{props.handleClose()}}
                backIcon={<ArrowBackIosNew/>}
                tags={[
                    <Tag key={1} color={randomInternalTagColor()}>{statueEmojiDictionary[props.confidantStatue]}</Tag>
                ]}
                extra={[
                    
                ]}
            >
    
            </PageHeader>
        )
    }

    function ConfidantChattingContextContent(props:{
        confidant:Confidant|undefined,
        signInUser:User,
    }){
        const signinUserId=props.signInUser.profile.sub;
        const signinUserAvatarUrl=props.signInUser.profile.avatarimg;
        const confidantAvatarUrl=props.confidant!.confidantAvatarUrl;
    
        const chattingListContentRef = createRef<HTMLDivElement>();
        const [sendingMessage, setSendingMessage] = useState("");
        const [sendingBarPlaceholder, setSendingBarPlaceholder] = useState("请输入...");
        const [sendingBarColor, setSendingBarColor] = useState(WindowsBlue);

        const handleEnterKeyDown=(e:React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
            if(e.key==='Enter'){
                e.preventDefault();
                handleSendButtonClick();
            }
        }

        const handleSendButtonClick=async()=>{
            if(sendingMessage===undefined||sendingMessage===""||sendingMessage===null){
                setSendingBarColor(ErrorColor);
                setSendingBarPlaceholder("您还没输入呢");
                setTimeout(() => {
                    setSendingBarColor(WindowsBlue);
                    setSendingBarPlaceholder("请输入...");
                }, 1000);
                return;
            }
            
            try {
                //await props.chatHub.send("SendMessageToUser",props.confidant?.confidantUserId,props.confidant?.chattingContextId,sendingMessage);
                SignalRContext.invoke("SendMessageToUser",props.confidant?.confidantUserId,props.confidant?.chattingContextId,sendingMessage);
            } catch (error) {
                let message=sendingMessage;
                setSendingBarColor(ErrorColor);
                setSendingMessage("发送失败");
                setTimeout(() => {
                    setSendingMessage(message);
                }, 800);
                return;
            }

            setChattingRecords([...chattingRecords, {
                chattingRecordId:props.confidant?.chattingContextId,
                sendUserId:signinUserId,
                recordMessage:sendingMessage,
                tagSummaries:[],
                createTime:getFormatedLocationTime()
            }]);
            setSendingMessage("");
        }

        const handleSendingMessageChange=(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
            setSendingMessage(e.target.value);
        }
        
        //props.chatHub.on not work i don't know why.
        SignalRContext.useSignalREffect(
            "ChattingMessage",
            (chattingRecord) => {
                console.log("abc");
                
                setChattingRecords([...chattingRecords, chattingRecord]);
                const domNode = chattingListContentRef.current;
                if (domNode) {
                    domNode.scrollTop = domNode.scrollHeight;
                }
            },
            [chattingRecords],
        );                                                                                                                         
        
        useEffect(() => {
            const domNode = chattingListContentRef.current;
            if (domNode) {
                domNode.scrollTop = domNode.scrollHeight;
            }
        }, [])//chattingRecord changes,scroll to bottom
        
    
        return(
            <DialogContent>
                <List ref={chattingListContentRef} id={'chattingrecordcontent'} dense component="div" role="list" sx={{overflow: 'auto',height:450,backgroundColor:"#161616",borderRadius:2,border:3,borderColor:WindowsBlue}}>
                    <Grid container item justifyContent='center'>
                        <Typography variant="caption" color={SubTitleColor}>
                            暂时只展示最近50条消息
                        </Typography>
                    </Grid>
                    {chattingRecords.map((cr,i)=>{
                        return cr.sendUserId===signinUserId?(
                            <Grid key={i} container p={1} spacing={1} justifyContent='right'>
                                <Grid item container justifyContent='right' xs>
                                    <Paper sx={{p:1,minHeight:50,width:'fit-content',maxWidth:250,bgcolor:GuiJiBlue}}>
                                        <Grid item container justifyContent={'right'}>
                                            <Typography variant="caption" fontFamily={"Cascadia Code"}>
                                                {cr.recordMessage}
                                            </Typography>
                                        </Grid>
                                        <Grid item container justifyContent={'right'}>
                                            <Typography fontSize={1} fontFamily={"Cascadia Code"}>
                                                {formatJsonTime(cr.createTime!)}
                                            </Typography>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item container xs={2} justifyContent='center'>
                                    <Avatar variant="rounded" src={signinUserAvatarUrl} sx={{width:50,height:50}}></Avatar>
                                </Grid>
                            </Grid>
                        ):(
                            <Grid key={i} container p={1} spacing={1} justifyContent='center'>
                                <Grid item container xs={2} justifyContent='center'>
                                    <Avatar variant="rounded" src={confidantAvatarUrl} sx={{width:50,height:50}}></Avatar>
                                </Grid>
                                <Grid item xs>
                                    <Paper sx={{p:1,minHeight:50,width:'fit-content',maxWidth:250,bgcolor:SunSetOrigin}}>
                                        <Typography variant="caption" fontFamily={"Cascadia Code"}>
                                            {cr.recordMessage}
                                        </Typography>
                                        <Grid item>
                                            <Typography fontSize={1} fontFamily={"Cascadia Code"}>
                                                {formatJsonTime(cr.createTime!)}
                                            </Typography>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        )
                    })}
                </List>
                <Container sx={{mt:1,backgroundColor:"#161616",borderRadius:2,border:3,borderColor:sendingBarColor}}>
                    <InputBase
                        autoFocus
                        key='LifeRecordEditorText'
                        placeholder={sendingBarPlaceholder}
                        rows={2}
                        fullWidth
                        multiline
                        inputProps={{ maxLength:3000,'aria-label': 'life record title' }}
                        value={sendingMessage}
                        sx={{
                            fontSize:16,
                            paddingTop:1,
                            paddingBottom:1,
                            color:'#ABABAB',
                            fontFamily:['Cascadia Code'],
                        }}
                        onChange={handleSendingMessageChange}
                        onKeyDown={handleEnterKeyDown}
                    />
                    <Button fullWidth onClick={handleSendButtonClick}>发送</Button>
                </Container>
            </DialogContent>
        )
    }

    return(
        <Dialog 
            maxWidth='sm'
            fullWidth 
            open={props.open}
            PaperProps={{
                elevation:0,
                sx:{
                    borderRadius:2,
                }
            }}
            BackdropProps={{
                sx:{
                    backdropFilter: "blur(2px)",
                }
            }}
            onClose={props.handleClose}
        >
            <ConfidantChattingContextHeader 
                userNickName={props.confidant?.confidantUserNickName} 
                userName={props.confidant?.confidantUserName} 
                handleClose={props.handleClose}
                confidantStatue={props.confidant?.confidantStatue}
            />
            <Divider variant="middle" sx={{marginTop:2,marginBottom:1}}/>
            <ConfidantChattingContextContent confidant={props.confidant} signInUser={props.signInUser}/>
        </Dialog>
    )
}