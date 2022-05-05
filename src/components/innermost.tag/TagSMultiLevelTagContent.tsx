import { Breadcrumbs, Button,Card, CardActionArea, CardActions, CardContent, Container, Grid, IconButton, Link, Paper, styled, Tooltip, Typography } from "@mui/material";
import { extraInfomationColor, randomGradient, randomTagColor, WindowsBlue } from "../../themes/InnermostColor";
import InitialTagContentBg from '../../images/backgrounds/InitialTagContentBg.png'
import { useState } from "react";
import { Tag } from "antd";
import { InnermostTag, TagSPageLocationState } from "../../pages/innermost.tag/TagSPage";
import { Copyright } from "../CopyRight";
import TagSAddSynonymMenu from "./TagSAddSynonymMenu";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function TagSMultiLevelTagContent(props:{
    locationState:TagSPageLocationState
}){
    let testTag:InnermostTag={
        id:"624174934c4f03a39f79b924",
        preferredTagName:"心情",
        tagDetail:"心情是指无特定、普遍及能够广泛影响认知和行为的一种情感状态。一般而言，心情会受到外在环境和因素以及实物和药品的影响。",
        previousTagId:null,
        createTime:"2022-03-28 08:40:51",
        updateTime:null,
        deleteTime:null,
        ancestors:null,
        synonyms:[
            "😆",
            "😗",
            "😶",
            "😫",
            "😆",
        ],
        relatedTagIds:new Array<string>(),
    }

    return(
        <Grid>
            {props.locationState?.links===undefined?(
                <InitialTagSMultiLevelTagContent/>
            ):(
                <Grid>
                    <Grid container>
                        <TagSMultiLevelTagContentBreadcrumbBackButton/>
                        <Breadcrumbs sx={{mt:1,mb:2}}>
                            {props.locationState.links.map((l:any,i:number)=>(
                                <TagSMultiLevelTagContentBreadcrumbs key={i} name={l.name} url={l.url} />
                            ))}
                        </Breadcrumbs>
                    </Grid>
                    
                    <Grid container spacing={1}>
                        <Grid container item xs={12} lg={9} borderRight={1} pr={1} mb={2} borderColor="#2B2B2B" rowSpacing={2}>
                            <TagSMultiLevelTagContentSelectedTagHeader 
                                tag={testTag} 
                            />
                            <TagSMultiLevelTagContentSelectedTagNextTags 
                                locationState={props.locationState}
                            />
                        </Grid>

                        <Grid item xs={12} lg={3}>
                            标签下的记录
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Grid>
    )
}

function TagSMultiLevelTagContentBreadcrumbBackButton(props:any){
    const history=useHistory();

    const handleBack=()=>{
        history.goBack();
    }

    return(
        <Tooltip title='返回父标签' placement='top'>
            <IconButton 
                sx={{
                    p:1,
                    mt:1,
                    mb:2,
                    mr:1,
                    border:2,
                    borderRadius:2,
                    borderColor:WindowsBlue,
                }}
                onClick={handleBack}
            >
                <ArrowBackIcon/>
            </IconButton>
        </Tooltip>
    )
}

function TagSMultiLevelTagContentBreadcrumbs(props:any){
    return (
        <Typography
            sx={{
                p:1,
                border:2,
                borderRadius:2,
                borderColor:WindowsBlue,
            }}
        >
            {(props.name as string).split(":").pop()}
        </Typography>
    )
}

function InitialTagSMultiLevelTagContent(props:any){
    return(
        <Grid container justifyContent='center'>
            <Container maxWidth='sm' sx={{mt:10,mb:10}}>
                <Grid item container xs={12} justifyContent='center'>
                    <img src={InitialTagContentBg}/>
                </Grid>
                <Grid item container xs={12} justifyContent='center'>
                    <Typography variant='h5' textAlign='center'>这里有很多很多标签<br/>但，还不够<br/>我们也在等待您创建一个个合适的标签</Typography>
                </Grid>
            </Container>
        </Grid>

    )
}

function TagSMultiLevelTagContentSelectedTagHeader(props:any){
    let gradient=randomGradient();

    return(
        <Grid item xs={12}>
            <Paper sx={{ display: 'flex',borderRadius:2 ,background:gradient,height:'100%'}}>{/*to fit height of CardActionArea */}
                <Grid container pb={1} spacing={1}>{/*flex-end makes create time in same position of one line items */}
                    <Grid item xs={12}>
                        <Grid item xs={10}>
                            <Typography variant="h5" noWrap fontFamily={'YouYuan'} pt={1} pl={1}>
                                标签名：{props.tag?.preferredTagName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" fontFamily={'YouYuan'} pt={0.5} pl={1}>
                                {props.tag?.tagDetail}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TagSMultiLevelTagContentSelectedTagHeaderSynonyms 
                                title='同义词' 
                                tags={props.tag?.synonyms}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant='caption' color={extraInfomationColor} fontFamily={'Cascadia Code'} pt={0.5} pl={1}>
                                📆 {props.tag?.createTime}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

function TagSMultiLevelTagContentSelectedTagNextTags(props:{
    locationState:TagSPageLocationState
}){
    //useEffect get next tags
    let testNextTags=[
        {
            id:"624174934c4f03a39f79b930",
            name:'心情:羞愧',
            synonyms:[

            ],
            ancestors:[
                "624174934c4f03a39f79b924"
            ]
        },{
            id:"624174934c4f03a39f79b931",
            name:'心情:满意',
            synonyms:[

            ],
            ancestors:[
                "624174934c4f03a39f79b924"
            ]
        },{
            id:"624174934c4f03a39f79b936",
            name:'心情:生气',
            synonyms:[

            ],
            ancestors:[
                "624174934c4f03a39f79b924"
            ]
        },{
            id:"624174934c4f03a39f79b932",
            name:'心情:厌恶',
            synonyms:[
                "操操操",
                "操操操",
                "操操操",
                "操操操",
                "操操操",
                "操操操",
            ],
            ancestors:[
                "624174934c4f03a39f79b924"
            ]
        },{
            id:"624174934c4f03a39f79b933",
            name:'心情:羞愧',
            synonyms:[

            ],
            ancestors:[
                "624174934c4f03a39f79b924"
            ]
        },{
            id:"624174934c4f03a39f79b934",
            name:'心情:满意',
            synonyms:[

            ],
            ancestors:[
                "624174934c4f03a39f79b924"
            ]
        },{
            id:"624174934c4f03a39f79b935",
            name:'心情:生气',
            synonyms:[

            ],
            ancestors:[
                "624174934c4f03a39f79b924"
            ]
        },
    ]
    const history=useHistory<TagSPageLocationState>();

    const [anchorElAddSynonym, setAnchorElAddSynonym] = useState<null | HTMLElement>(null);
    const handleOpenAddSynonymMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElAddSynonym(event.currentTarget);
    };
    const handleCloseAddSynonymMenu = () => {
        setAnchorElAddSynonym(null);
    };

    const handleNextTagDetailButtonClick=(tag:any/*InnermostTag*/)=>{     
        let pathname=  '/tag/'+tag.ancestors?.join('/')+"/"+tag.id;
        props.locationState?.links.push({
            name:tag.name,
            url:pathname
        });
        history.push({
            pathname:pathname,
            state:{
                links:props.locationState?.links,
                tag:tag,
                selectedIndex:props.locationState?.selectedIndex,
                scrollPosition:props.locationState.scrollPosition
            },
        });
    }
    return(
        <Grid container item spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h6">
                    子标签：
                </Typography>
            </Grid>
            <Grid item container xs={12} spacing={1}>
                {testNextTags.map((tag,i)=>(
                    <Grid key={i} item xs={6} md={4} xl={3} >
                        <Card sx={{border:2, borderColor:WindowsBlue, borderRadius:2}}>
                        <CardContent>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                {tag.name}
                            </Typography>
                            <Typography variant="subtitle1" fontWeight='bold'>
                                同义词：
                            </Typography>
                            <Typography 
                                variant='body2' 
                                sx={{
                                    pl:'5px',
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 1,
                                }} 
                            >
                                {(tag.synonyms===undefined||tag.synonyms.length===0)?"暂无":tag.synonyms.join('、')}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button fullWidth size="small" sx={{fontWeight:'bold'}} onClick={()=>{
                                handleNextTagDetailButtonClick(testNextTags[i]);
                            }}>详情</Button>
                            <Button fullWidth size="small" sx={{fontWeight:'bold'}} onClick={handleOpenAddSynonymMenu}>添加同义词</Button>
                        </CardActions>
                        </Card>
                        
                    </Grid>
                ))}
            </Grid>
            <TagSAddSynonymMenu 
                anchorEl={anchorElAddSynonym} 
                handleCloseMenu={handleCloseAddSynonymMenu}
                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            />
        </Grid>
    )
}

function TagSMultiLevelTagContentSelectedTagHeaderSynonyms(props:any){
    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));
    const [tags, setTags] = useState();
    return(
        <Paper
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0,
                backgroundColor:'transparent',
            }}
            elevation={0}
            component="ul"
        >
            <Typography variant="subtitle2" noWrap fontFamily={'YouYuan'} pt={0.5} pl={1}>
                {props.title}：
            </Typography>
            {(props.tags===undefined||props.tags?.length===0)?(
                <ListItem key={'nonetag'}>
                    <Tag color={randomTagColor()}>😊抱歉，还没有{props.title}</Tag>
                </ListItem>
            ):(
                props.tags.map((tag:string,i:number)=>(
                    <ListItem key={i}>
                        <Tag color={randomTagColor()}>{tag}</Tag>
                    </ListItem>
                    
                ))
            )}
            
        </Paper>
    )
}