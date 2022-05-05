import { Button, Dialog, Grid,IconButton,Typography } from "@mui/material";
import { PageHeader, Tag } from "antd";
import {Add,Autorenew,MoreVert} from "@mui/icons-material"
import { useState } from "react";
import LifeRecordEditor from "./LifeRecordEditor";
import { IconColor, SubTitleColor } from "../../themes/InnermostColor";
import LocationSearch from "../innermost.search/LocationSearch";

export default function LogLifeHeader(props:any){
    const [editorOpen, setEditorOpen] = useState(false);

    const handleOpenEditor=()=>{
        setEditorOpen(true);
    }

    function LogLifePageHeader(props:any){
        return(
            <PageHeader
                title={<Typography variant="h4" fontFamily={'YouYuan'}>记录生活✏️</Typography>}
                subTitle=''
                tags={[
                    <Tag key='1' color="blue">😆</Tag>,
                    <Tag key='2' color="orange">😉</Tag>,
                    <Tag key='3' color="#123456">😗</Tag>,
                    <Tag key='4' color="#556677">🙁</Tag>,
                    <Tag key='5' color="#FFA5BA">🏄‍♀️</Tag>,
                ]}
                extra={[
                    <Button  key='1' variant="outlined" startIcon={<Add/>} sx={{textTransform:'none'}} onClick={handleOpenEditor}>
                        New
                    </Button>,
                    <IconButton  key='2'>
                        <MoreVert sx={{color:IconColor}}/>
                    </IconButton>
                ]}
                footer={
                    <Typography variant="caption" color={SubTitleColor} fontWeight='bold' >
                        在这里，你可以说任何你想说的东西，你可以将它们留给自己，或者分享给他人，一切的一切，都来自于你的 Innermost
                    </Typography>
                }
            />
        )
    }

    return(
        <Grid container>
            <Grid item xs={12}>
                <LogLifePageHeader handleOpenEditor={handleOpenEditor}/>
                <LifeRecordEditor open={editorOpen} setOpen={setEditorOpen} />
                <LocationSearch/>
            </Grid>
        </Grid>
    )
}