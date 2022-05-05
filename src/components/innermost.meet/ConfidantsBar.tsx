import { Add, ArrowBackIosNew, Search } from "@mui/icons-material";
import { Avatar, Badge, Button, CardActionArea, Container, Dialog, DialogContent, Divider, Grid, IconButton, InputBase, List, Menu, Paper, Typography } from "@mui/material";
import { PageHeader } from "antd";
import { createRef, useEffect, useRef, useState } from "react";
import { statueEmojiDictionary,statueChineseDictionary } from "../../services/statueServices";
import {getFormatedLocationTime} from "../../services/timeServices";
import { ErrorColor, GuiJiBlue, SubTitleColor, SunSetOrigin, WindowsBlue } from "../../themes/InnermostColor";



export default function ConfidantsBar(props:any){
    const [confidants, setConfidants] = useState(null);


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
            <ConfidantsBarConfidantRequestButton/>
            <Divider sx={{mt:1}} />
            <ConfidantsBarConfidantsList/>
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

interface ConfidantRequest{
    requestId:string;
    requestUserId:string;
    requestUserName:string;
    requestUserNickName:string;
    requestUserAvatarUrl:string;
    requestMessage:string;
    confidantRequestStatue:string;
    requestTime:string;
}

function ConfidantsBarConfidantRequestButton(props:any){
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [confidantRequestAnchorEl,setConfidantRequestAnchorEl]= useState<null | HTMLElement>(null);
    const handleOpenMenuByAnchorEl = (el:null | HTMLElement) => {
        setAnchorEl(el);
    };
    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        if(confidantRequestAnchorEl===null){
            setConfidantRequestAnchorEl(event.currentTarget);
        }
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const [confidantReqeusts, setConfidantReqeusts] = useState<Array<ConfidantRequest>>([
        {
            requestId:"abc",
            requestUserId:"abbbbb",
            requestUserName:"HongJieSun",
            requestUserNickName:"HongJieSunnn",
            requestUserAvatarUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.doubanio.com%2Fview%2Fgroup_topic%2Fl%2Fpublic%2Fp481381138.jpg&refer=http%3A%2F%2Fimg1.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654138013&t=c7872fe0f04a6a3194c6fe5c6d9508ab",
            requestMessage:"我很喜欢你的这句话：天空仍灿烂，它爱着大海，情歌被打败，爱已不存在！！！！！！！！！！！！",
            confidantRequestStatue:"ToBeReviewed",
            requestTime:"2022-05-03T11:00:00"
        },
        {
            requestId:"abc",
            requestUserId:"abbbbb",
            requestUserName:"HongJieSun",
            requestUserNickName:"HongJieSunnn",
            requestUserAvatarUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.doubanio.com%2Fview%2Fgroup_topic%2Fl%2Fpublic%2Fp481381138.jpg&refer=http%3A%2F%2Fimg1.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654138013&t=c7872fe0f04a6a3194c6fe5c6d9508ab",
            requestMessage:"我很喜欢你的这句话：天空仍灿烂，它爱着大海，情歌被打败，爱已不存在！！！！！！！！！！！！",
            confidantRequestStatue:"ToBeReviewed",
            requestTime:"2022-05-03T11:00:00"
        }
    ]);

    const [accepted, setAccepted] = useState(confidantReqeusts.map((r,i)=>false));
    const [refused, setRefused] = useState(confidantReqeusts.map((r,i)=>false));


    function ConfidantsBarConfidantRequestMenu(props:any){
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
                                        <Button disabled={accepted[i]||refused[i]} fullWidth onClick={()=>{
                                            let copyAccepted=[...accepted];
                                            copyAccepted[i]=true;
                                            setAccepted(copyAccepted);
                                            
                                        }}>{accepted[i]?'已同意':'同意'}</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button disabled={accepted[i]||refused[i]} fullWidth color="error" onClick={()=>{
                                            let copyRefused=[...refused];
                                            copyRefused[i]=true;
                                            setRefused(copyRefused);
                                        }}>{refused[i]?'已拒绝':'拒绝'}</Button>
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

            <ConfidantsBarConfidantRequestMenu/>
        </Grid>
    )
}

interface Confidant{
    confidantUserId:string;
    confidantUserName:string;
    confidantUserNickName:string;
    confidantAvatarUrl:string;
    confidantOnline:boolean;
    confidantStatue:string;
    chattingContextId:string;
}

function ConfidantsBarConfidantsList(props:any){
    const [confidants, setConfidants] = useState<Array<Confidant>>([
        {
            confidantUserId:"abc",
            confidantUserName:"HongJieSun",
            confidantUserNickName:"HongJieSunnnnnnnnnnnnnnn",
            confidantAvatarUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fci.xiaohongshu.com%2F1af51b3d-1bf3-f838-1c77-5fe5e31fc4e9%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fci.xiaohongshu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654142333&t=44f0e658bc5697ba7e7cdbb59e1b4c66",
            confidantOnline:true,
            confidantStatue:'NORMAL',
            chattingContextId:'abcd'
        },
        {
            confidantUserId:"abc",
            confidantUserName:"HongJieSun",
            confidantUserNickName:"HongJieSunnnnnnnnnnnnnnn",
            confidantAvatarUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fci.xiaohongshu.com%2F1af51b3d-1bf3-f838-1c77-5fe5e31fc4e9%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fci.xiaohongshu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654142333&t=44f0e658bc5697ba7e7cdbb59e1b4c66",
            confidantOnline:true,
            confidantStatue:'DEPRESSION',
            chattingContextId:'abcd'
        },
        {
            confidantUserId:"abc",
            confidantUserName:"HongJieSun",
            confidantUserNickName:"HongJieSunnn",
            confidantAvatarUrl:"https://img2.baidu.com/it/u=4290186543,3036482172&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=498",
            confidantOnline:false,
            confidantStatue:'ANGRY',
            chattingContextId:'abcd'
        },
        {
            confidantUserId:"abc",
            confidantUserName:"HongJieSun",
            confidantUserNickName:"HongJieSunnnnnnnnnnnnnnn",
            confidantAvatarUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fci.xiaohongshu.com%2F1af51b3d-1bf3-f838-1c77-5fe5e31fc4e9%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fci.xiaohongshu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654142333&t=44f0e658bc5697ba7e7cdbb59e1b4c66",
            confidantOnline:true,
            confidantStatue:'NORMAL',
            chattingContextId:'abcd'
        },
        {
            confidantUserId:"abc",
            confidantUserName:"HongJieSun",
            confidantUserNickName:"HongJieSunnnnnnnnnnnnnnn",
            confidantAvatarUrl:"https://img2.baidu.com/it/u=3738084969,8623396&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
            confidantOnline:true,
            confidantStatue:'DEPRESSION',
            chattingContextId:'abcd'
        },
        {
            confidantUserId:"abc",
            confidantUserName:"HongJieSun",
            confidantUserNickName:"HongJieSunnn",
            confidantAvatarUrl:"https://img2.baidu.com/it/u=4290186543,3036482172&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=498",
            confidantOnline:false,
            confidantStatue:'ANGRY',
            chattingContextId:'abcd'
        },
        {
            confidantUserId:"abc",
            confidantUserName:"HongJieSun",
            confidantUserNickName:"HongJieSunnnnnnnnnnnnnnn",
            confidantAvatarUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fci.xiaohongshu.com%2F1af51b3d-1bf3-f838-1c77-5fe5e31fc4e9%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fci.xiaohongshu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654142333&t=44f0e658bc5697ba7e7cdbb59e1b4c66",
            confidantOnline:true,
            confidantStatue:'NORMAL',
            chattingContextId:'abcd'
        },
        {
            confidantUserId:"abc",
            confidantUserName:"HongJieSun",
            confidantUserNickName:"HongJieSunnnnnnnnnnnnnnn",
            confidantAvatarUrl:"https://img2.baidu.com/it/u=3738084969,8623396&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
            confidantOnline:true,
            confidantStatue:'DEPRESSION',
            chattingContextId:'abcd'
        },
        {
            confidantUserId:"abc",
            confidantUserName:"HongJieSun",
            confidantUserNickName:"HongJieSunnn",
            confidantAvatarUrl:"https://img2.baidu.com/it/u=4290186543,3036482172&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=498",
            confidantOnline:false,
            confidantStatue:'ANGRY',
            chattingContextId:'abcd'
        },
        {
            confidantUserId:"abc",
            confidantUserName:"HongJieSun",
            confidantUserNickName:"HongJieSunnnnnnnnnnnnnnn",
            confidantAvatarUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fci.xiaohongshu.com%2F1af51b3d-1bf3-f838-1c77-5fe5e31fc4e9%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fci.xiaohongshu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654142333&t=44f0e658bc5697ba7e7cdbb59e1b4c66",
            confidantOnline:true,
            confidantStatue:'NORMAL',
            chattingContextId:'abcd'
        },
        {
            confidantUserId:"abc",
            confidantUserName:"HongJieSun",
            confidantUserNickName:"HongJieSunnnnnnnnnnnnnnn",
            confidantAvatarUrl:"https://img2.baidu.com/it/u=3738084969,8623396&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
            confidantOnline:true,
            confidantStatue:'DEPRESSION',
            chattingContextId:'abcd'
        },
        {
            confidantUserId:"abc",
            confidantUserName:"HongJieSun",
            confidantUserNickName:"HongJieSunnn",
            confidantAvatarUrl:"https://img2.baidu.com/it/u=4290186543,3036482172&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=498",
            confidantOnline:false,
            confidantStatue:'ANGRY',
            chattingContextId:'abcd'
        },
    ]);

    const [openChattingContent, setOpenChattingContent] = useState(false);
    const [openChattingContextId, setOpenChattingContextId] = useState("");
    const [openChattingContextConfidantAvatarUrl, setOpenChattingContextConfidantAvatarUrl] = useState("");
    const handleChattingContentOpen=(chattingContextId:string,openChattingContextConfidantAvatarUrl:string)=>{
        setOpenChattingContextId(chattingContextId);
        setOpenChattingContextConfidantAvatarUrl(openChattingContextConfidantAvatarUrl);
        setOpenChattingContent(true);
    }
    const handleChattingContentClose=()=>{
        setOpenChattingContent(false);
    }
    return confidants.length===0?(
        <Grid mt={5} container justifyContent='center'>
            <Typography>
                抱歉，您还没有好友
            </Typography>

            <Typography variant="caption" color={SubTitleColor}>
                🙂请找寻那位与您内心相匹配的知己
            </Typography>
        </Grid>
    ):(
        <List id={'confidantslist'} dense component="div" role="list" sx={{height: '75%',overflow: 'auto'}}>
            {confidants.map((c,i)=>(
                <CardActionArea 
                    key={i} 
                    sx={{mt:1,border:2,borderRadius:2,borderColor:c.confidantOnline?'#FF6233':'#666666'}} 
                    onClick={()=>handleChattingContentOpen(c.chattingContextId,c.confidantAvatarUrl)}
                >
                    <Grid container>
                        <Grid item xs={3}>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                statueEmojiDictionary[c.confidantStatue]
                            }
                        >
                            <Avatar variant="rounded" src={c.confidantAvatarUrl} sx={{width:50,height:50}}></Avatar>
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
            <ConfidantChattingContext open={openChattingContent} handleClose={handleChattingContentClose} chattingContextId={openChattingContextId} confidantAvatarUrl={openChattingContextConfidantAvatarUrl}/>
        </List>
    )
}

interface ChattingRecord{
    chattingRecordId?:string;
    sendUserId:string;
    recordMessage:string;
    tagSummaries?:{tagId:string,tagName:string}[];
    createTime?:string;
}

function ConfidantChattingContext(props:any){
    function ConfidantChattingContextHeader(props:any){
        return(
            <PageHeader
                title={<Typography variant="h5" fontFamily={'"Cascadia Code","YouYuan"'}>{props.userNickName}</Typography>}
                subTitle={'@ '+props.userName}
                onBack={()=>{props.handleClose()}}
                backIcon={<ArrowBackIosNew/>}
                tags={[
                    
                ]}
                extra={[
                    
                ]}
                
            >
    
            </PageHeader>
        )
    }

    function ConfidantChattingContextContent(props:any){
        const signinUserId="b";
        const signinUserAvatarUrl="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fci.xiaohongshu.com%2F1af51b3d-1bf3-f838-1c77-5fe5e31fc4e9%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fci.xiaohongshu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654142333&t=44f0e658bc5697ba7e7cdbb59e1b4c66";
        const confidantAvatarUrl=props.confidantAvatarUrl;
    
        const chattingListContentRef = createRef<HTMLDivElement>();
        const [chattingRecords, setChattingRecords] = useState<Array<ChattingRecord>>([
            {
                chattingRecordId:"abc",
                sendUserId:"a",
                recordMessage:"多少春秋风雨该多少崎岖不变爱多少唏嘘的你在人海",
                createTime:"2022-05-23 14:55:00"
            },
            {
                chattingRecordId:"abc",
                sendUserId:"b",
                recordMessage:"二手摩托尾气臭黑痞老板的电脑老婆凯伦用量子技术弄出了分子超黑超略吧热狗破解RSA加密算法，使瑜典二手摩托启动量子纠缠特性，导致我放在家里的麻辣火锅底料量子衰变成为番茄火锅底料，随后被我煮掉吃了并被量子衰变给影响，从而导致我代码写不出来去扫厕所，偶然发现马桶蓝月亮的蓝色很漂亮，于是骑车来到海边导致腿好酸，吃了碗拌面清汤忘记放醋，结果猪油太油，使拌面表面产生超滑平面，使空气里的一个中子一不小心滑倒了而引起了链式反应时空扭曲，使我自行车被吞没最终找不到女朋友",
                createTime:"2022-05-23 14:55:01"
            },
        ]);
        const [sendingMessage, setSendingMessage] = useState("");
        const [sendingBarPlaceholder, setSendingBarPlaceholder] = useState("请输入...");
        const [sendingBarColor, setSendingBarColor] = useState(WindowsBlue);

        const handleEnterKeyDown=(e:React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
            if(e.key==='Enter'){
                e.preventDefault();
                handleSendButtonClick();
            }
        }

        const handleSendButtonClick=()=>{
            if(sendingMessage===undefined||sendingMessage===""||sendingMessage===null){
                setSendingBarColor(ErrorColor);
                setSendingBarPlaceholder("您还没输入呢");
                setTimeout(() => {
                    setSendingBarColor(WindowsBlue);
                    setSendingBarPlaceholder("请输入...");
                }, 1000);
                return;
            }
            
            setChattingRecords(chattingRecords.concat({
                sendUserId:signinUserId,
                recordMessage:sendingMessage,
                createTime:getFormatedLocationTime()
            }));
            setSendingMessage("");
        }

        const handleSendingMessageChange=(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
            setSendingMessage(e.target.value);
        }

        useEffect(() => {
            const domNode = chattingListContentRef.current;
            if (domNode) {
                domNode.scrollTop = domNode.scrollHeight;
            }
        }, [chattingRecords])
    
        return(
            <DialogContent>
                <List ref={chattingListContentRef} id={'chattingrecordcontent'} dense component="div" role="list" sx={{overflow: 'auto',height:450,backgroundColor:"#161616",borderRadius:2,border:3,borderColor:WindowsBlue}}>
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
                                                {cr.createTime}
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
                                                {cr.createTime}
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
                }
            }}
            BackdropProps={{
                sx:{
                    backdropFilter: "blur(2px)",
                }
            }}
            onClose={props.handleClose}
        >
            <ConfidantChattingContextHeader userNickName='HongJieSunnn' userName='HongJieSun' handleClose={props.handleClose} />
            <Divider variant="middle" sx={{marginTop:2,marginBottom:1}}/>
            <ConfidantChattingContextContent confidantAvatarUrl={props.confidantAvatarUrl} />
        </Dialog>
    )
}
