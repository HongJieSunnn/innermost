import { Search } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, CardMedia, DialogContent, DialogTitle, Divider, Grid, IconButton, InputBase, Menu, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { searchTagsByNameAsync } from "../../services/apiServices/tag/tag";
import { WindowsBlue } from "../../themes/InnermostColor";
import { InnermostTag } from "../innermost.tag/TagSTypes";

const tagsPredicted=new Set<string>(["心情:积极","心情:中性","心情:消极","心情:Mixed"]);

export default function TagSearch(props:any){
    const [tagName, setTagName] = useState("");
    const [searchButtonDisabled, setSearchButtonDisabled] = useState(true);
    const [tags, setTags] = useState<Array<InnermostTag>>();

    const handleSearchInputChange=(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        let disabled=e.target.value==="";
        if(disabled!=searchButtonDisabled){
            setSearchButtonDisabled(disabled);
        }
        setTagName(e.target.value);
    }

    const handleSearchButtonClick=()=>{
        searchTagsByNameAsync(tagName).then((tags)=>{
            setTags(tags.filter(t=>!tagsPredicted.has(t.preferredTagName)));//tags in tagsPredicted just can be added by intelligence prediction.
        })
    }

    return(
        <Menu 
            id="menu-tag"
            anchorEl={props.anchorElTagButton}
            open={Boolean(props.anchorElTagButton)}
            onClose={props.handleCloseTagMenu}
            PaperProps={{
                elevation: 0,
                sx: {
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    borderRadius:3,
                    border:1,
                    borderColor:'#29b6f6',
                    bgcolor:'#161616',
                    width:700,
                    backgroundColor:'transparent',
                    backdropFilter:'blur(15px)'
                },
            }}
            transformOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
            <DialogTitle>
            <Paper
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            >                
                <InputBase
                    autoFocus
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={"🏷️搜索标签"}
                    onChange={handleSearchInputChange}
                />
                <IconButton sx={{ p: '10px' }} aria-label="search" onClick={handleSearchButtonClick}>
                    <Search/>
                </IconButton>
            </Paper>
            </DialogTitle>
            <Divider/>
            <DialogContent sx={{height:400}}>
            <Grid container spacing={1}>
                {tags?.length===0?(
                    <Grid container justifyContent='center'>
                        暂无，您可以前往 Tag 来创建哦
                    </Grid>
                ):tags?.map((t,i)=>(
                    <Grid key={i} item xs={4}>
                        <CardActionArea onClick={()=>props.handleTagSelected(t)}>
                            <Card sx={{border:2, borderColor:WindowsBlue, borderRadius:2}}>
                            <CardContent>
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    {t.preferredTagName}
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
                                    {(t.synonyms===undefined||t.synonyms.length===0)?"暂无":t.synonyms.join('、')}
                                </Typography>
                            </CardContent>
                            </Card>
                        </CardActionArea>
                    </Grid>
                ))}
                
            </Grid>
            </DialogContent>
        </Menu>
    )
}