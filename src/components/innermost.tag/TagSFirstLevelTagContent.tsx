import { Add, ExpandMore, Search } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Drawer, Grid, IconButton, InputBase, List, ListItemButton, Paper, SxProps, Theme, Toolbar, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { TagSPageLocationState } from "../../pages/innermost.tag/TagSPage";
import { WindowsBlue } from "../../themes/InnermostColor";
import TagSCreateTagFormDrawer from "./TagSCreateTagFormMenu";

const testFirstLevelTags:{[index:string]:string}={
    "心情":"624174934c4f03a39f79b924",
    "音乐":"624174934c4f03a39f79b925",
    "生活":"624174934c4f03a39f79b926",
    "娱乐":"624174934c4f03a39f79b927",
    "自然":"624174934c4f03a39f79b928",
    "心情1":"624174934c4f03a39f79b924",
    "音乐2":"624174934c4f03a39f79b925",
    "生活3":"624174934c4f03a39f79b926",
    "娱乐4":"624174934c4f03a39f79b927",
    "自然5":"624174934c4f03a39f79b928",
    "心情5":"624174934c4f03a39f79b924",
    "音乐6":"624174934c4f03a39f79b925",
    "生活1":"624174934c4f03a39f79b926",
    "娱乐2":"624174934c4f03a39f79b927",
    "自然3":"624174934c4f03a39f79b928",
}//TODO should get by back-end.

interface TagSFirstLevelTagListProps{
    selectedIndex:number,
    scrollPosition:number,
}

interface TagSFirstLevelTagAccordionListProps{
    selectedIndex:number,
    scrollPosition:number,
    handleAccordionUnExpanded:() => void,
}

const TagSFirstLevelTagListItemSx:SxProps<Theme>={
    justifyContent:'center',
    borderRadius:2,
    border:2,
    borderColor:'#666666',
    fontSize:15,
    m:2,
    color:'#666666',
    '&:hover': {//specify hover colors
        //backgroundColor: '#4395D4',
        color: WindowsBlue,
        border:2,
        borderColor:WindowsBlue,
    },
    "&.Mui-selected, &.Mui-selected:hover": {
        color: WindowsBlue,
        border:2,
        borderColor:WindowsBlue,
    }
};

export function TagSFirstLevelTagListAccordion(props:{
    locationState:TagSPageLocationState
}){
    const [expanded, setExpanded] = useState(false);

    const handleAccordionExpanded=()=>{
        setExpanded(true);
    }

    const handleAccordionUnExpanded=()=>{
        setExpanded(false);
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return(
        <Accordion 
            sx={{
                display:{xs:'block',sm:'none'},
                mb:2,
                backgroundColor:'black',
                border:1,
                borderColor:'#2F2F2F',
                borderRadius:2,
            }}
            expanded={expanded}
        >
            <Tooltip title="点击打开一级标签列表" placement="top-start">
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    onClick={()=>{
                        setExpanded(!expanded);
                    }}
                >
                    <Typography>一级标签</Typography>
                </AccordionSummary>
            </Tooltip>
            <AccordionDetails>
                <TagSFirstLevelTagListSearchBar/>
                <TagSFirstLevelTagListAddButton handleOpenCreateTagMenu={handleOpenMenu}/>
                <TagSCreateTagFormDrawer 
                    title='创建一级标签表单' 
                    anchorEl={anchorEl} 
                    handleCloseMenu={handleCloseMenu}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    transformOrigin={{horizontal: 'center', vertical: 'top'}}
                />
                <Divider sx={{ mt:2,mb:2}}/>
                <TagSFirstLevelTagAccordionList 
                    selectedIndex={props.locationState?.selectedIndex??-1} 
                    scrollPosition={props.locationState?.scrollPosition??0} 
                    handleAccordionUnExpanded={handleAccordionUnExpanded}
                />
            </AccordionDetails>
        </Accordion>
    )
}

export function TagSFirstLevelTagContent(props:{
    locationState:TagSPageLocationState
}){
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    return(
        <Grid mr={1} display={{xs:'none',sm:'block'}}>
            <TagSFirstLevelTagListSearchBar/>
            <TagSFirstLevelTagListAddButton handleOpenCreateTagMenu={handleOpenMenu}/>
            <TagSCreateTagFormDrawer 
                title='创建一级标签表单' 
                anchorEl={anchorEl} 
                handleCloseMenu={handleCloseMenu}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                transformOrigin={{horizontal: 'center', vertical: 'top'}}
            />
            <Divider sx={{ marginTop:2}}/>
            <TagSFirstLevelTagList selectedIndex={props.locationState?.selectedIndex??-1} scrollPosition={props.locationState?.scrollPosition??0} />
        </Grid>
    )
}

function TagSFirstLevelTagListAddButton(props:{
    handleOpenCreateTagMenu:(event: React.MouseEvent<HTMLElement>)=>void
}){
    return(
        <Button variant='outlined' startIcon={<Add/>} fullWidth sx={{mt:1}} onClick={props.handleOpenCreateTagMenu}>添加一级标签</Button>
    )
}

function TagSFirstLevelTagListSearchBar(props:any){
    return(
        <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
        >                
            <InputBase
                sx={{ ml: 1, flex: 1,fontSize:12 }}
                placeholder={"搜索一级标签"}
                inputRef={props.focusRef}
            />
            <IconButton size='small' sx={{ p: '10px' }} aria-label="search">
                <Search sx={{fontSize:15,fontWeight:'bold'}} />
            </IconButton>
        </Paper>
    )
}

function TagSFirstLevelTagList(props:TagSFirstLevelTagListProps){
    const history = useHistory<TagSPageLocationState>();

    useEffect(() => {
        document.getElementById('tagslist')?.scrollTo({top:props.scrollPosition,left:0});{/*move to scroll Y */}
    }, [])
    
    const [selectedFirstLevelButtonIndex, setSelectedFirstLevelButtonIndex] = useState(props.selectedIndex);

    const handleFirstLevelTagButtonClick=(tag:any,index:number)=>{
        history.push({
            pathname:'/tag/'+testFirstLevelTags[tag],//ObjectId of tag
            state:{
                links:[
                    {
                        name:'标签中心',
                        url:'/tag'
                    },
                    {
                        name:tag,
                        url:'/tag/'+testFirstLevelTags[tag]
                    },
                ],
                tag:tag,
                selectedIndex:index,
                scrollPosition:document.getElementById('tagslist')?.scrollTop,//get scroll Y of List instead of window
            }
        });

        setSelectedFirstLevelButtonIndex(index);
    }

    return(
        <List id={'tagslist'} dense component="div" role="list" sx={{height: '60vh',overflow: 'auto'}}>
            {Object.keys(testFirstLevelTags).map((t,i)=>(
                <ListItemButton
                    key={i}
                    role="listitem"
                    selected={selectedFirstLevelButtonIndex===i}
                    sx={TagSFirstLevelTagListItemSx}
                    onClick={(e)=>{
                        handleFirstLevelTagButtonClick(t,i);
                    }}
                >
                    {t}
                </ListItemButton>
            ))}
        </List>
    )
}

function TagSFirstLevelTagAccordionList(props:TagSFirstLevelTagAccordionListProps){
    const history = useHistory();

    useEffect(() => {
        document.getElementById('tagslist')?.scrollTo({top:props.scrollPosition,left:0});{/*move to scroll Y */}
    }, [])
    
    const [selectedFirstLevelButtonIndex, setSelectedFirstLevelButtonIndex] = useState(props.selectedIndex);

    const handleFirstLevelTagButtonClick=(e:React.MouseEvent<HTMLDivElement, MouseEvent>,tagName:string,index:number)=>{       
        history.push({
            pathname:'/tag/'+testFirstLevelTags[tagName],//ObjectId of tag
            state:{
                links:[
                    {
                        name:'标签中心',
                        url:'/tag'
                    },
                    {
                        name:tagName,
                        url:'/tag/'+testFirstLevelTags[tagName]
                    },
                ],
                selectedIndex:index,
                scrollPosition:document.getElementById('tagsaccordionlist')?.scrollTop,//get scroll Y of List instead of window
            }
        });

        setSelectedFirstLevelButtonIndex(index);
    }

    return(
        <Grid id='tagsaccordionlist' container role="list" sx={{height:'22vh',overflow: 'auto'}}>
            {Object.keys(testFirstLevelTags).map((t,i)=>(
                <Grid key={i} item xs={3}>
                    <ListItemButton
                        key={i}
                        role="listitem"
                        selected={selectedFirstLevelButtonIndex===i}
                        sx={TagSFirstLevelTagListItemSx}
                        onClick={(e)=>{
                            handleFirstLevelTagButtonClick(e,t,i);
                            props.handleAccordionUnExpanded();
                        }}
                    >
                        {t}
                    </ListItemButton>
                </Grid>
            ))}
        </Grid>
    )
}