import { Button, Container, Grid, Menu, PopoverOrigin, TextField,Typography } from "@mui/material";
import { Drawer, message } from "antd";
import { useRef, useState } from "react";
import { createReviewedTag } from "../../services/apiServices/tag/reviewedtag";
import { CreateReviewedTagCommand } from "./TagSTypes";

interface TagSCreateTagFormMenuProps{
    title?:string,
    anchorEl:HTMLElement|null,
    handleCloseMenu:()=>void,
    transformOrigin?:PopoverOrigin,
    anchorOrigin?:PopoverOrigin,
    preTagName:string|null,
    previousTagId:string|null,
    ancestors:string[]|null,
}

export default function TagSCreateTagFormMenu(props:TagSCreateTagFormMenuProps){
    const initialReviewedTagModel:CreateReviewedTagCommand={
        preferredTagName:'',
        tagDetail:'',
        previousTagId:props.previousTagId,
        ancestors:props.ancestors,
        synonyms:null,
    }

    const [reviewedTag, setReviewedTag] = useState<CreateReviewedTagCommand>(initialReviewedTagModel);

    const preferredNameRef = useRef<HTMLInputElement>();
    const tagDetailRef = useRef<HTMLInputElement>();
    const synonymsRef = useRef<HTMLInputElement>();

    function clearTextFields(){
        preferredNameRef.current!.value="";
        tagDetailRef.current!.value="";
        synonymsRef.current!.value="";
        setReviewedTag(initialReviewedTagModel);
    }

    function handleClose(){
        props.handleCloseMenu();
        clearTextFields();
    }

    function handlePreferredTagNameChange(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>){
        reviewedTag.preferredTagName=e.currentTarget.value;
        setReviewedTag(reviewedTag);
    }

    function handleTagDetailChange(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>){
        reviewedTag.tagDetail=e.currentTarget.value;
        setReviewedTag(reviewedTag);
    }

    function handleSynonymsChange(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>){
        reviewedTag.synonyms=e.currentTarget.value.split('&');
        setReviewedTag(reviewedTag);
    }

    function handleCreateReviewedTagButtonClick(){
        if(reviewedTag.preferredTagName===''){
            message.warning("???????????????????????????????????????");
            return;
        }else if(reviewedTag.tagDetail===''){
            message.warning("??????????????????????????????????????????");
            return;
        }
        reviewedTag.preferredTagName=props.preTagName===null?reviewedTag.preferredTagName:props.preTagName!.concat(`:${reviewedTag.preferredTagName}`);
        createReviewedTag(reviewedTag);
        handleClose();
    }
    //We can't set text field value by states in menu or drawer which will avoid states change.
    //Menu and drawer will change the state while close or open.I guess if not so the re-rendering action will chagne the open state of them.
    //But text field will not clear the text after close.So we should not clear data.
    //But if we want to clear the data.We should use useRef which will not re-render component.
    return(
        <Menu
            id="menu-createtag"
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
                        {props.title??"??????????????????"}
                    </Typography>
                    <Typography paragraph variant="caption" color='#666666'>
                        ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                    </Typography>
                </Grid>

                <Grid container item p={1} spacing={1}>
                    <Grid item xs={12}>
                        <TextField 
                            inputRef={preferredNameRef}
                            required 
                            fullWidth 
                            focused
                            id="preferred-tagname" 
                            label="??????????????????" 
                            size="small" 
                            helperText='??????????????????????????????'
                            onChange={handlePreferredTagNameChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            inputRef={tagDetailRef}
                            required 
                            multiline 
                            focused
                            maxRows={3} 
                            fullWidth 
                            id="tag-detail" 
                            label="??????????????????" 
                            size="small" 
                            helperText='?????????????????????????????????' 
                            onChange={handleTagDetailChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            inputRef={synonymsRef}
                            multiline 
                            focused
                            maxRows={3} 
                            fullWidth 
                            id="synonyms" 
                            label="???????????????" 
                            size="small" 
                            helperText='?????????????????????&??????'
                            onChange={handleSynonymsChange}
                        />
                    </Grid>
                </Grid>

                <Grid item m={1}>
                    <Button fullWidth variant="contained" sx={{fontWeight:'bold'}} onClick={handleCreateReviewedTagButtonClick}>????????????</Button>
                </Grid>
            </Grid>
        </Menu>
    )
}