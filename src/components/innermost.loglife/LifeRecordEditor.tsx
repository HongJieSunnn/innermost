import { Button, Dialog,Typography, DialogTitle, IconButton, Divider, ToggleButtonGroup, ToggleButton, DialogContent, Grid, InputBase, Paper, OutlinedInput, TextField, Container, Tooltip, Card, CardHeader, CardContent, CardMedia, ListItem, styled } from "@mui/material";
import { Checkbox, message, PageHeader, Tag } from "antd";
import {ArrowBackIosNew,Autorenew,SaveOutlined,CreateOutlined,Title,AddLocation,MusicNote,LocalOfferOutlined,EditLocationOutlined,HeadphonesOutlined,TagOutlined} from '@mui/icons-material';
import { createRef, useEffect, useRef, useState } from "react";
import { SubTitleColor, WindowsBlue } from "../../themes/InnermostColor";
import { UserMenu } from "../innermost.appbar/UserMenu";
import LocationSearch from "../innermost.search/LocationSearch";
import { LocationModel } from "../../services/apiServices/baiduMapService";
import MusicSearch from "../innermost.search/MusicSearch";
import TagSearch from "../innermost.search/TagSearch";
import { LifeRecordCommand } from "./LifeRecordTypes";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { createRecord } from "../../services/apiServices/loglife/liferecord";

const editorBorderColor='#1F1F1F'
const editorBorderOverColor='#42a5f5';
const editorBackgroundColor='#161616'

const initialLifeRecordToCreate:LifeRecordCommand={
    text:"",
    isShared:false,
    tagSummaries:{
        "6273cbcb6b2ff87e4e870b18":"心情:中性",
    }
}

export default function LifeRecordEditor(props:{
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
}){
    const [lifeRecordToCreate, setLifeRecordToCreate] = useState<LifeRecordCommand>(initialLifeRecordToCreate)
    const [showTitle, setShowTitle] = useState('none');
    const titleRef = useRef<HTMLInputElement>();
    const textRef = useRef<HTMLInputElement>();

    const handleCreteButtonClick=()=>{
        if(lifeRecordToCreate.text===""){
            props.setOpen(false);
            message.error("必须输入记录文本");
            clearEditorInput();
            return;
        }
        props.setOpen(false);
        message.info("创建中");
        createRecord(lifeRecordToCreate);
        clearLifeRecordToCrete();
        clearEditorInput();
    }
    
    const clearLifeRecordToCrete=()=>{
        setLifeRecordToCreate(initialLifeRecordToCreate)
    }

    const clearEditorInput=()=>{
        if(titleRef.current!==undefined){
            textRef.current!.value="";
            lifeRecordToCreate.title=undefined;
        }
        textRef.current!.value="";
        lifeRecordToCreate.text="";
    }

    const handleClose=()=>{
        props.setOpen(false);
        clearEditorInput();
    }
    

    function LifeRecordEditorHeader(props:any){
        const handleCheckBoxChange=(e: CheckboxChangeEvent)=>{
            lifeRecordToCreate.isShared=e.target.checked;
            setLifeRecordToCreate(lifeRecordToCreate);
        }
        return(
            <PageHeader
                title={<Typography variant="subtitle1" fontFamily={'YouYuan'}>添加新记录</Typography>}
                subTitle='Add new record'
                onBack={handleClose}
                backIcon={<ArrowBackIosNew/>}
                tags={[
                    
                ]}
                extra={[
                    <Button key={1} variant="outlined" startIcon={<CreateOutlined/>} sx={{textTransform:'none'}} onClick={handleCreteButtonClick}>创建</Button>, 
                    // <Button variant="outlined" startIcon={<SaveOutlined/>} color='info' sx={{textTransform:'none'}}>保存</Button>,
                    <Button key={2} variant="outlined" startIcon={<Autorenew/>} color='error' sx={{textTransform:'none'}} onClick={()=>{
                        clearLifeRecordToCrete();
                        clearEditorInput();
                    }}>放弃</Button>,
                ]}
                footer={
                    <Grid container justifyContent='right'>
                        <Checkbox onChange={handleCheckBoxChange}>分享这条记录</Checkbox>
                    </Grid>
                }
            />
        )
    }
    
    function LifeRecordEditorToggleButtonGroup(props:any){
        const optionsOfLifeRecord=[
            {value:'title',tip:'标题',Icon:<Title/>},
            // {value:'location',tip:'位置',Icon:<AddLocation/>},
            // {value:'musicRecord',tip:'音乐',Icon:<MusicNote/>},
            // {value:'tags',tip:'标签',Icon:<LocalOfferOutlined/>},
        ];
        const [formats, setFormats] = useState(showTitle==='none'?new Array<string>():["title"]);

        const handleShowTitleChange=()=>{
            showTitle==='none'?setShowTitle('flex'):setShowTitle('none');
        }
    
        const handleFormat = (
            event: React.MouseEvent<HTMLElement>,
            newFormats: string[],
        ) => {
            setFormats(newFormats);
        };
        return(
            <ToggleButtonGroup
                value={formats}
                onChange={handleFormat}
                color='secondary'
                size='small'
                sx={{
                    border:1,
                    borderColor:'#181818',
                }}
                >
                <ToggleButton value="options-text" aria-label="options-text" disabled>
                    可选项
                </ToggleButton>
                {optionsOfLifeRecord.map((v,i)=>(
                    <ToggleButton key={"toggleButton"+v.value} aria-label={v.value} value={v.value} onClick={handleShowTitleChange}>
                        <Tooltip disableInteractive key={"tooltip"+v.value} title={v.tip}  placement='top'>
                            {v.Icon}
                        </Tooltip>
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        )
    }
    
    function LifeRecordEditorTitleEditor(props:any){
        const [focused, setFocused] = useState(false);
        const [borderColor, setBorderColor] = useState(editorBorderColor);
        const handleFoucus=()=>{
            setBorderColor(WindowsBlue);
            setFocused(true);
        }
        const handleMouseOver=()=>{
            if(focused)
                return;
            setBorderColor(editorBorderOverColor);
        }
        const handleBlur=()=>{
            setBorderColor(editorBorderColor);
            setFocused(false);
        }
        const handleMouseLeave=()=>{
            if(focused)
                return;
            setBorderColor(editorBorderColor);
        }

        const handleInputChange=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
            setLifeRecordToCreate(l=>{l.title=e.target.value;return l;});
        }
        return(
            <Container sx={{backgroundColor:editorBackgroundColor,borderRadius:2,border:2,borderColor:borderColor,display:{xs:props.show}}}> 
                <InputBase
                    key='abc'
                    fullWidth
                    placeholder="请输入标题"
                    inputRef={titleRef}
                    inputProps={{ maxLength:50, 'aria-label': 'life record title' ,style:{textAlign:'center'}}}
                    defaultValue={lifeRecordToCreate.title}
                    sx={{
                        fontSize:22,
                        paddingTop:1,
                        paddingBottom:1,
                        color:'#ABABAB',
                        fontWeight:'bold'
                    }}
                    onFocus={handleFoucus}
                    onBlur={handleBlur}
                    onMouseOver={handleMouseOver}
                    onMouseLeave={handleMouseLeave}
                    onChange={handleInputChange}
                />
            </Container>
        )
    }
    
    function LifeRecordEditorTextEditor(props:any){
        const [focused, setFocused] = useState(false);
        const [borderColor, setBorderColor] = useState(editorBorderColor);
        const handleFoucus=()=>{
            setBorderColor(WindowsBlue);
            setFocused(true);
        }
        const handleMouseOver=()=>{
            if(focused)
                return;
            setBorderColor(editorBorderOverColor);
        }
        const handleBlur=()=>{
            setBorderColor(editorBorderColor);
            setFocused(false);
        }
        const handleMouseLeave=()=>{
            if(focused)
                return;
            setBorderColor(editorBorderColor);
        }

        const handleInputChange=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
            setLifeRecordToCreate(l=>{l.text=e.target.value;return l;});
        }
        return(
            <Container sx={{backgroundColor:editorBackgroundColor,borderRadius:2,border:3,borderColor:borderColor,display:{xs:props.show}}}>
                <InputBase
                    autoFocus
                    key='LifeRecordEditorText'
                    placeholder="写下任何你想写的"
                    rows={10}
                    fullWidth
                    multiline
                    inputProps={{ maxLength:3000,'aria-label': 'life record title' }}
                    inputRef={textRef}
                    defaultValue={lifeRecordToCreate.text}
                    sx={{
                        fontSize:16,
                        paddingTop:1,
                        paddingBottom:1,
                        color:'#ABABAB',
                        fontFamily:['Cascadia Code'],
                    }}
                    onChange={handleInputChange}
                    onFocus={handleFoucus}
                    onBlur={handleBlur}
                    onMouseOver={handleMouseOver}
                    onMouseLeave={handleMouseLeave}
                />
            </Container>
        )
    }
    
    function LifeRecordEditorExtraButtons(props:any){
        
        
        return(
            <Grid item container spacing={3}>
                <LifeRecordEditorExtraButtonsLocationButton/>
                <LifeRecordEditorExtraButtonsMusicButton/>
                <LifeRecordEditorExtraButtonsTagButton/>
            </Grid>
        )
    }
    
    function LifeRecordEditorExtraButtonsLocationButton(props:any){
        const [locationName, setLocationName] = useState('添加位置');
        const [anchorElLocationButton, setAnchorElLocationButton] = useState<null | HTMLElement>(null);
        const [locationSuggessions, setLocationSuggessions] = useState<LocationModel[]>(new Array<LocationModel>());
        
      
        const handleOpenLocationMenu = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorElLocationButton(event.currentTarget);
        };
    
        const handleCloseLocationMenu = () => {
            setAnchorElLocationButton(null);
            setLocationSuggessions(new Array<LocationModel>());
        };
        const handleSelectLocationIndex=(locationIndex:number)=>{
            let location=locationSuggessions[locationIndex];
            handleSetLocationToLifeRecord(location);
            setLocationName(location.locationName);
            handleCloseLocationMenu();
        }
        const handleSelectLocation=(location:LocationModel)=>{
            handleSetLocationToLifeRecord(location);
            setLocationName(location.locationName);
            handleCloseLocationMenu();
        }
        const handleSetLocationToLifeRecord=(location:LocationModel)=>{
            lifeRecordToCreate.locationUId=location.locationUId;
            lifeRecordToCreate.locationName=location.locationName;
            lifeRecordToCreate.province=location.province;
            lifeRecordToCreate.city=location.city;
            lifeRecordToCreate.district=location.district;
            lifeRecordToCreate.address=location.address;
            lifeRecordToCreate.longitude=location.longitude;
            lifeRecordToCreate.latitude=location.latitude;
            setLifeRecordToCreate(lifeRecordToCreate);
            console.log(lifeRecordToCreate);
            
        }
        
        return(
            <Grid item>
                <Tooltip title="添加位置信息可以更好地帮助我们整理您的记录">
                    <Button variant="outlined" size='small' color='warning' onClick={handleOpenLocationMenu} startIcon={<EditLocationOutlined/>} >{locationName}</Button>
                </Tooltip>
                <LocationSearch 
                    anchorElLocationButton={anchorElLocationButton} 
                    handleCloseLocationMenu={handleCloseLocationMenu}
                    locationSuggessions={locationSuggessions}
                    setLocationSuggessions={setLocationSuggessions}
                    handleSelectLocation={handleSelectLocation}
                    handleSelectLocationIndex={handleSelectLocationIndex}
                />
            </Grid>
        )
    }
    
    function LifeRecordEditorExtraButtonsMusicButton(props:any){
        const [musicName, setmusicName] = useState('添加音乐');
        const [anchorElMusicButton, setAnchorElMusicButton] = useState<null | HTMLElement>(null);
        
      
        const handleOpenMusicMenu = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorElMusicButton(event.currentTarget);
        };
    
        const handleCloseMusicMenu = () => {
            setAnchorElMusicButton(null);
        };
        return(
            <Grid item>
                <Tooltip title="添加音乐信息可以帮助我们更好地帮您分析情绪">
                    <Button variant="outlined" size='small' color='success' onClick={handleOpenMusicMenu} startIcon={<HeadphonesOutlined/>} >{musicName}</Button>
                </Tooltip>
                <MusicSearch 
                    anchorElMusicButton={anchorElMusicButton} 
                    handleCloseMusicMenu={handleCloseMusicMenu}
                />
            </Grid>
        )
    }
    
    function LifeRecordEditorExtraButtonsTagButton(props:any){
        const [anchorElMusicButton, setAnchorElTagButton] = useState<null | HTMLElement>(null);
        
      
        const handleOpenTagMenu = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorElTagButton(event.currentTarget);
        };
    
        const handleCloseTagMenu = () => {
            setAnchorElTagButton(null);
        };
        return(
            <Grid item>
                <Tooltip title="添加标签信息可以帮助我们更好地帮您整理情绪">
                    <Button variant="outlined" size='small' color='info' onClick={handleOpenTagMenu} startIcon={<TagOutlined/>}>添加标签</Button>
                </Tooltip>
                <TagSearch 
                    anchorElTagButton={anchorElMusicButton} 
                    handleCloseTagMenu={handleCloseTagMenu}
                />
            </Grid>
        )
    }
    
    function LifeRecordEditorTags(props:any){
        const ListItem = styled('li')(({ theme }) => ({
            margin: theme.spacing(0.5),
        }));
        const [tags, setTags] = useState([
            {tagId:"1",tagName:"😆"},
            {tagId:"2",tagName:"😗"},
            {tagId:"3",tagName:"😶"},
            {tagId:"4",tagName:"😫"},
            {tagId:"5",tagName:"😆"},
            {tagId:"6",tagName:"😗"},
            {tagId:"7",tagName:"😶"},
            {tagId:"8",tagName:"😫"},
            {tagId:"9",tagName:"😆"},
            {tagId:"10",tagName:"😗🎉"},
            {tagId:"11",tagName:"😶"},
        ]);
        return(
            <Paper
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0.5,
                    m: 0,
                }}
                elevation={0}
                component="ul"
            >
                {tags.map((tag)=>(
                    <ListItem key={tag.tagId}>
                        <Tag closable>{tag.tagName}</Tag>
                    </ListItem>
                    
                ))}
                
            </Paper>
        )
    }

    return(
        <Dialog 
            maxWidth='md' 
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
            onClose={handleClose}
        >
            <LifeRecordEditorHeader/>
            <Divider variant="middle" sx={{marginTop:2,marginBottom:1}}/>
            <DialogContent>
                <Grid container rowGap={2}>
                    <Grid item container xs={12} justifyContent='right'>
                        <LifeRecordEditorToggleButtonGroup/>
                    </Grid>
                    <LifeRecordEditorTitleEditor show={showTitle}/>
                    <LifeRecordEditorTextEditor/>
                    <LifeRecordEditorTags/>
                    <LifeRecordEditorExtraButtons/>
                </Grid>
                
            </DialogContent>
        </Dialog>
    )
}

function LifeRecordEditorCard(props:any){
    return(
        <Card sx={{ display: 'flex',borderRadius:3 ,backgroundColor:props.bgColor,height:'100%'}}>
            <CardMedia>
                <Typography variant="h3" pt={2} pb={2} pl={1}>
                   {props.cardEmoji}
                </Typography>
            </CardMedia>
            <CardContent sx={{p:0}}>
                <Typography sx={{fontSize:5}}>
                   福建省 福州市 连江县
                </Typography>
                <Typography sx={{fontSize:4}}>
                    平流尾地质公园
                </Typography>
                <Typography sx={{fontSize:3}}>
                    福州市-连江县-茭南村X135
                </Typography>
            </CardContent>
        </Card>
    )
}