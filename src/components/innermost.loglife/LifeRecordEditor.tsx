import { Button, Dialog,Typography, DialogTitle, IconButton, Divider, ToggleButtonGroup, ToggleButton, DialogContent, Grid, InputBase, Paper, OutlinedInput, TextField, Container, Tooltip, Card, CardHeader, CardContent, CardMedia, ListItem, styled } from "@mui/material";
import { Checkbox, message, PageHeader, Tag } from "antd";
import {ArrowBackIosNew,Autorenew,SaveOutlined,CreateOutlined,Title,AddLocation,MusicNote,LocalOfferOutlined,EditLocationOutlined,HeadphonesOutlined,TagOutlined} from '@mui/icons-material';
import { createRef, useEffect, useRef, useState } from "react";
import { randomInternalTagColor, SubTitleColor, WindowsBlue } from "../../themes/InnermostColor";
import { UserMenu } from "../innermost.appbar/UserMenu";
import LocationSearch from "../innermost.search/LocationSearch";
import { LocationModel } from "../../services/apiServices/baiduMapService";
import MusicSearch from "../innermost.search/MusicSearch";
import TagSearch from "../innermost.search/TagSearch";
import { LifeRecordCommand, RecommendedMusicRecord } from "./LifeRecordTypes";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { createRecord } from "../../services/apiServices/loglife/liferecord";
import { LoadingButton } from "@mui/lab";
import { MusicRecord } from "../innermost.musichub/MusicHubTypes";
import { InnermostTag } from "../innermost.tag/TagSTypes";

const editorBorderColor='#1F1F1F'
const editorBorderOverColor='#42a5f5';
const editorBackgroundColor='#161616'

const initialLifeRecordToCreate:LifeRecordCommand={
    text:"",
    isShared:false
}

export default function LifeRecordEditor(props:{
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    setRecommendationDialogOpen:React.Dispatch<React.SetStateAction<boolean>>;
    setRecommendationDialogDetail:React.Dispatch<React.SetStateAction<{
        title: string;
        content: string;
        recommendedMusicRecord?: RecommendedMusicRecord | undefined;
    }>>
}){
    const [lifeRecordToCreate, setLifeRecordToCreate] = useState<LifeRecordCommand>(initialLifeRecordToCreate)
    const [showTitle, setShowTitle] = useState('none');
    const titleRef = useRef<HTMLInputElement>();
    const textRef = useRef<HTMLInputElement>();

    const handleCreteButtonClick=async()=>{
        if(lifeRecordToCreate.text===""){
            props.setOpen(false);
            message.error("????????????????????????");
            clearEditorInput();
            return;
        }
        let recommendationPromise = createRecord(lifeRecordToCreate);
        clearEditorInput();
        clearLifeRecordToCrete();//I don't know why if close dialog and then clear,the text will not be cleared.
        props.setOpen(false);
        message.info("?????????");
        let recommendation=await recommendationPromise;
        if(recommendation.type==="Error"){
            message.error("????????????");
        }else{
            message.success("????????????");
        }
        switch (recommendation.type) {
            case "PositiveEmotionRecommendationResult":
                console.log(recommendation.content)
                props.setRecommendationDialogDetail({
                    title:"??????????????????????????????????????????????????????????????????????",
                    content:recommendation.content===""?"??????????????????":recommendation.content,
                })
                props.setRecommendationDialogOpen(true);
                break;
            case "NegativeEmotionMusicRecommendationResult":
                props.setRecommendationDialogDetail({
                    title:"???????????????????????????????????????????\n????????????????????????????????????????????????????????????????????????????????????",
                    content:"",
                    recommendedMusicRecord:recommendation.content,
                })
                props.setRecommendationDialogOpen(true);
                break;
            case "MixedEmotionRecommendationResult":
                props.setRecommendationDialogDetail({
                    title:"????Wow??????????????????????????????????????? Mixed ??????????????????????????????",
                    content:recommendation.content,
                })
                props.setRecommendationDialogOpen(true);
                break;
        }
    }
    
    const clearLifeRecordToCrete=()=>{
        setLifeRecordToCreate({
            text:"",
            isShared:false
        })
    }

    const clearEditorInput=()=>{
        if(titleRef.current!==undefined){
            titleRef.current!.value="";
            lifeRecordToCreate.title=undefined;
        }
        textRef.current!.value="";
        lifeRecordToCreate.text="";
    }

    const handleClose=()=>{
        clearEditorInput();
        clearLifeRecordToCrete();
        
        props.setOpen(false);
    }
    

    function LifeRecordEditorHeader(props:any){
        const handleCheckBoxChange=(e: CheckboxChangeEvent)=>{
            lifeRecordToCreate.isShared=e.target.checked;
            setLifeRecordToCreate(lifeRecordToCreate);
        }
        return(
            <PageHeader
                title={<Typography variant="subtitle1" fontFamily={'YouYuan'}>???????????????</Typography>}
                subTitle='Add new record'
                onBack={handleClose}
                backIcon={<ArrowBackIosNew/>}
                tags={[
                    
                ]}
                extra={[
                    <Button 
                        key={1} 
                        variant="outlined" 
                        startIcon={<CreateOutlined/>} 
                        sx={{textTransform:'none'}} 
                        onClick={handleCreteButtonClick}
                    >
                        ??????
                    </Button>, 
                    // <Button variant="outlined" startIcon={<SaveOutlined/>} color='info' sx={{textTransform:'none'}}>??????</Button>,
                    <Button key={2} variant="outlined" startIcon={<Autorenew/>} color='error' sx={{textTransform:'none'}} onClick={()=>{
                        clearLifeRecordToCrete();
                        clearEditorInput();
                        textRef.current?.focus()
                    }}>??????</Button>,
                ]}
                footer={
                    <Grid container justifyContent='right'>
                        <Checkbox onChange={handleCheckBoxChange}>??????????????????</Checkbox>
                    </Grid>
                }
            />
        )
    }
    
    function LifeRecordEditorToggleButtonGroup(props:any){
        const optionsOfLifeRecord=[
            {value:'title',tip:'??????',Icon:<Title/>},
            // {value:'location',tip:'??????',Icon:<AddLocation/>},
            // {value:'musicRecord',tip:'??????',Icon:<MusicNote/>},
            // {value:'tags',tip:'??????',Icon:<LocalOfferOutlined/>},
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
                    ?????????
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
            <Container sx={{backgroundColor:editorBackgroundColor,borderRadius:2,border:2,borderColor:borderColor}}> 
                <InputBase
                    key='abc'
                    fullWidth
                    placeholder="???????????????"
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
                    placeholder="????????????????????????*"
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
        const [locationName, setLocationName] = useState('????????????');
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
        }
        
        return(
            <Grid item>
                <Tooltip title="???????????????????????????????????????????????????????????????">
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
        const [musicName, setMusicName] = useState('????????????');
        const [anchorElMusicButton, setAnchorElMusicButton] = useState<null | HTMLElement>(null);
        
      
        const handleOpenMusicMenu = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorElMusicButton(event.currentTarget);
        };
    
        const handleCloseMusicMenu = () => {
            setAnchorElMusicButton(null);
        };

        const handleMusicRecordSelect=(musicRecord:MusicRecord)=>{
            handleCloseMusicMenu();
            handleSetMusicRecordToLifeRecord(musicRecord);
        }

        const handleSetMusicRecordToLifeRecord=(musicRecord:MusicRecord)=>{
            lifeRecordToCreate.musicId=musicRecord.mid;
            lifeRecordToCreate.musicName=musicRecord.musicName;
            lifeRecordToCreate.singer=musicRecord.singers.map((s)=>s.singerName).join(",");
            lifeRecordToCreate.album=musicRecord.album.albumName;
            setMusicName(`${lifeRecordToCreate.musicName}-${lifeRecordToCreate.singer}`);
            setLifeRecordToCreate(lifeRecordToCreate);
        }
        return(
            <Grid item>
                <Tooltip title="???????????????????????????????????????????????????????????????">
                    <Button variant="outlined" size='small' color='success' onClick={handleOpenMusicMenu} startIcon={<HeadphonesOutlined/>} >{musicName}</Button>
                </Tooltip>
                <MusicSearch 
                    anchorElMusicButton={anchorElMusicButton} 
                    handleCloseMusicMenu={handleCloseMusicMenu}
                    handleMusicRecordSelect={handleMusicRecordSelect}
                />
            </Grid>
        )
    }
    
    function LifeRecordEditorExtraButtonsTagButton(props:any){
        const [anchorElMusicButton, setAnchorElTagButton] = useState<null | HTMLElement>(null);
        const [tags, setTags] = useState<Array<InnermostTag>>();
        const [tagColors, setTagColors] = useState<Array<string>>([]);
      
        const handleOpenTagMenu = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorElTagButton(event.currentTarget);
        };
    
        const handleCloseTagMenu = () => {
            setAnchorElTagButton(null);
        };

        const handleTagSelected=(tag:InnermostTag,color:string)=>{
            if(tags?.includes(tag)){
                return;
            }
            setTags(tags===undefined?[tag]:tags.concat(tag));
            setTagColors(tagColors.concat(randomInternalTagColor()));
            handleSetTagsToLifeRecord(tag);
        }

        const handleSetTagsToLifeRecord=(tag:InnermostTag)=>{
            if(lifeRecordToCreate.tagSummaries===undefined){
                lifeRecordToCreate.tagSummaries={};
            }
            lifeRecordToCreate.tagSummaries[tag.id]=tag.preferredTagName;
            setLifeRecordToCreate(lifeRecordToCreate);
        }

        const handleTagUnSelected=(tag:InnermostTag)=>{
            let tagId=tag.id;
            let index=tags!.indexOf(tag);

            tags!.splice(index,1);
            tagColors.splice(index,1);

            setTags(tags);
            setTagColors(tagColors);
            handleRemoveTagsToLifeRecord(tagId);
        }

        const handleRemoveTagsToLifeRecord=(tagId:string)=>{
            delete lifeRecordToCreate.tagSummaries![tagId];
            setLifeRecordToCreate(lifeRecordToCreate);
        }

        function LifeRecordEditorTags(props:any){
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
                    <Typography variant='overline' color='#666666'>
                        ????????????????
                        {tags?.map((tag,i)=>(
                            <Tag 
                                key={i} 
                                closable 
                                color={tagColors[i]}
                                onClose={()=>handleTagUnSelected(tag)}
                            >
                                {tag.preferredTagName}
                            </Tag>
                        ))}
                    </Typography>
                    
                </Paper>
            )
        }

        return(
            <Grid item>
                <Tooltip title="???????????????????????????????????????????????????????????????">
                    <Button 
                        variant="outlined" 
                        size='small' 
                        color='info' 
                        onClick={handleOpenTagMenu} 
                        startIcon={<TagOutlined/>}
                        fullWidth
                    >
                        {tags===undefined?"????????????":(<LifeRecordEditorTags/>)}
                    </Button>
                </Tooltip>
                <TagSearch 
                    anchorElTagButton={anchorElMusicButton} 
                    handleCloseTagMenu={handleCloseTagMenu}
                    handleTagSelected={handleTagSelected}
                />
            </Grid>
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
                    <LifeRecordEditorTitleEditor/>
                    <LifeRecordEditorTextEditor/>
                    <LifeRecordEditorExtraButtons/>
                </Grid>
                
            </DialogContent>
        </Dialog>
    )
}