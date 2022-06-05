import { Button, Grid, Menu, PopoverOrigin, TextField, Typography } from "@mui/material";
import { message } from "antd";
import { useRef, useState } from "react";
import { addSynonymsToTag } from "../../services/apiServices/tag/reviewedtag";


interface TagSAddSynonymMenuProps{
    anchorEl:HTMLElement|null,
    handleCloseMenu:()=>void,
    transformOrigin?:PopoverOrigin,
    anchorOrigin?:PopoverOrigin,
    tagId:string,
}

export default function TagSAddSynonymMenu(props:TagSAddSynonymMenuProps){
    
    const [synonyms, setSynonyms] = useState(new Array<string>());
    const synonymsRef = useRef<HTMLInputElement>();

    const handleSynonymsChange=(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        setSynonyms(e.currentTarget.value.split("&"));
    }

    const handleClose=()=>{
        props.handleCloseMenu();
        clearTextFields();
    }

    const clearTextFields=()=>{
        synonymsRef.current!.value="";
        setSynonyms([]);
    }

    const handleAddSynonymsButtonClick=()=>{
        if(synonyms.length===0){
            message.warning("您还未指定想添加的同义词");
            clearTextFields();
            return;
        }
        addSynonymsToTag({
            tagId:props.tagId,
            synonyms:synonyms
        })
        clearTextFields();
        handleClose();
    }

    return(
        <Menu
            id="menu-appbar"
            anchorEl={props.anchorEl}
            open={Boolean(props.anchorEl)}
            onClose={handleClose}
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
                  bgcolor:'#161616'
                },
            }}
            transformOrigin={props.transformOrigin??{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={props.anchorOrigin??{ horizontal: 'right', vertical: 'bottom' }}
        >
            <Grid m={1} width={300}>
                <Grid item>
                    <Typography paragraph variant="subtitle1">
                        添加同义词
                    </Typography>
                    <Typography paragraph variant="caption" color='#666666'>
                        一般每个标签都有个优选术语作为其名称，我们可以为其添加一些非最优选的同义词。
                    </Typography>
                </Grid>

                <Grid container item p={1} spacing={1}>
                    <Grid item xs={12}>
                        <TextField 
                            inputRef={synonymsRef}
                            multiline 
                            focused
                            fullWidth
                            maxRows={3} 
                            color='info' 
                            id="synonyms" 
                            label="添加同义词" 
                            size="small" 
                            helperText='多个同义词请用&隔开'
                            onChange={handleSynonymsChange}
                        />
                    </Grid>
                </Grid>

                <Grid item m={1}>
                    <Button fullWidth color='info' variant="contained" sx={{fontWeight:'bold'}} onClick={handleAddSynonymsButtonClick}>添加同义词</Button>
                </Grid>
            </Grid>
        </Menu>
    )
}