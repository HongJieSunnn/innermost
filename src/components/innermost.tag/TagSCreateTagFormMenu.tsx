import { Button, Container, Grid, Menu, PopoverOrigin, TextField,Typography } from "@mui/material";
import { Drawer } from "antd";
import { useRef, useState } from "react";

interface TagSCreateTagFormMenuProps{
    title?:string,
    anchorEl:HTMLElement|null,
    handleCloseMenu:()=>void,
    transformOrigin?:PopoverOrigin,
    anchorOrigin?:PopoverOrigin,
    previousTagId?:string,
    ancestors?:string[],
}

interface ReviewedTagModel{
    preferredTagName:string,
    tagDetail:string,
    previousTagId:string|null|undefined,
    ancestors:string[]|null|undefined,
    synonyms?:string[],
}

export default function TagSCreateTagFormMenu(props:TagSCreateTagFormMenuProps){
    const [reviewedTag, setReviewedTag] = useState<ReviewedTagModel>({
        preferredTagName:'',
        tagDetail:'',
        previousTagId:props.previousTagId,
        ancestors:props.ancestors
    });

    const preferredNameRef = useRef<HTMLInputElement>();
    const tagDetailRef = useRef<HTMLInputElement>();
    const synonymsRef = useRef<HTMLInputElement>();

    function clearTextFields(){
        preferredNameRef.current!.value="";
        tagDetailRef.current!.value="";
        synonymsRef.current!.value="";
        setReviewedTag({
            preferredTagName:'',
            tagDetail:'',
            previousTagId:props.previousTagId,
            ancestors:props.ancestors
        })
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

    //We can't set text field value by states in menu or drawer which will avoid states change.
    //Menu and drawer will change the state while close or open.I guess if not so the re-rendering action will chagne the open state of them.
    //But text field will not clear the text after close.So we should not clear data.
    //But if we want to clear the data.We should use useRef which will not re-render component.
    return(
        <Menu
            id="menu-createtag"
            anchorEl={props.anchorEl}
            open={Boolean(props.anchorEl)}
            onClose={props.handleCloseMenu}
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
                        {props.title??"创建标签表单"}
                    </Typography>
                    <Typography paragraph variant="caption" color='#666666'>
                        我们希望您的每次创建的都是合适的，无重复的，高质量的标签，这可以帮助我们创建一个更好的标签系统，同时也能提供更好服务。
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
                            label="标签优选术语" 
                            size="small" 
                            helperText='请输入最优选的标签名'
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
                            label="标签详情介绍" 
                            size="small" 
                            helperText='请输入对标签的详情描述' 
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
                            label="标签同义词" 
                            size="small" 
                            helperText='多个同义词请用&隔开'
                            onChange={handleSynonymsChange}
                        />
                    </Grid>
                </Grid>

                <Grid item m={1}>
                    <Button fullWidth variant="contained" sx={{fontWeight:'bold'}} onClick={clearTextFields}>创建标签</Button>
                </Grid>
            </Grid>
        </Menu>
    )
}