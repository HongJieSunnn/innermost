import { ArrowBackIosNew, Autorenew, CreateOutlined } from "@mui/icons-material";
import { Button, CardActionArea, Dialog, DialogContent, DialogTitle, Divider, Grid, Paper, styled, Tooltip, Typography } from "@mui/material";
import { Checkbox, PageHeader, Tag } from "antd";
import { useState } from "react";
import { randomGradient, randomTagColor, WindowsBlue } from "../../themes/InnermostColor";
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import { LifeRecord } from "./LifeRecordTypes";
import { formatJsonTime } from "../../services/timeServices";
import { setRecordShared } from "../../services/apiServices/loglife/liferecord";

const extraInfomationColor='#D7D7D7';

export default function LifeRecordDetail(props:{
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    bgColor:string;
    lifeRecord:LifeRecord;
}){
    const handleDialogClose=()=>{
        props.setOpen(false);
    }

    const handleShareButtonClick=()=>{
        setRecordShared(props.lifeRecord);
        props.setOpen(false);//setRecordShared just set lifeRecord.isShared=true but it's useful.I guess close dialog will re-render and set props.lifeRecord.isShared to true.Maybe.
    }

    function LifeRecordDetailHeader(props:{
        lifeRecord:LifeRecord;
    }){
        return(
            <PageHeader
                title={<Typography variant="subtitle1" fontFamily={'YouYuan'}>记录详情</Typography>}
                subTitle=''
                onBack={handleDialogClose}
                backIcon={<ArrowBackIosNew/>}
                tags={[
                    
                ]}
                extra={[
                    <Button 
                        variant="contained" 
                        disabled={props.lifeRecord.isShared} 
                        startIcon={<CreateOutlined/>} 
                        sx={{textTransform:'none'}}
                        onClick={handleShareButtonClick}
                    >
                        {props.lifeRecord.isShared?"已分享":"分享"} 
                    </Button>, 
                    // <Button variant="outlined" startIcon={<SaveOutlined/>} color='info' sx={{textTransform:'none'}}>保存</Button>,
                    <Button variant="contained" startIcon={<Autorenew/>} color='error' sx={{textTransform:'none'}}>删除</Button>,
                ]}
                footer={
                    <Grid container>
                        <Grid item>
                            <Typography variant="h5" fontFamily={'YouYuan'}>
                                {props.lifeRecord.title==undefined?"✨无标题":props.lifeRecord.title}
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} >
                            <Typography variant='overline' color={extraInfomationColor} fontFamily={'Cascadia Code'}>
                                📆 {formatJsonTime(props.lifeRecord.createTime)}
                            </Typography>
                        </Grid>
                        
                    </Grid>
                }
            />
            
        )
    }
    
    function LifeRecordDetailExtraInfomations(props:{
        lifeRecord:LifeRecord;
    }){
        
        
        return(
            <Grid container spacing={2}>
                <Grid  item>
                <Typography variant='overline' color={extraInfomationColor}>
                    {props.lifeRecord.Location==undefined?"":"📌 "+props.lifeRecord.Location?.locationName}
                </Typography>
                </Grid>
                <Grid  item >
                    <Tooltip title='点击跳转到音乐详情页'>
                        <CardActionArea sx={{borderRadius:2}}>
                            <Typography variant='overline' color={extraInfomationColor}>
                                {props.lifeRecord.MusicRecord==undefined?"":"🎧 "+props.lifeRecord.MusicRecord?.musicName+"-"+props.lifeRecord.MusicRecord?.singer}
                            </Typography>
                        </CardActionArea>
                    </Tooltip>
                </Grid>
            </Grid>
        )
    }
    
    function LifeRecordDetailEmotionTag(props:{
        lifeRecord:LifeRecord;
    }){
        return(
            <Paper
                sx={{
                    width:'100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0.5,
                    m: 0,
                }}
                elevation={0}
            >
                <Typography variant='overline' color={extraInfomationColor}>
                    ✨心情：
                    {props.lifeRecord.tagSummaries.filter((t)=>t.tagName.startsWith("心情:")).map((t,i)=>(
                        <Tag key={i} color={t.tagColor}>{t.tagName}</Tag>
                    ))}
                </Typography>
                
            </Paper>
        )
    }
    
    function LifeRecordDetailTags(props:{
        lifeRecord:LifeRecord;
    }){
        let tags=props.lifeRecord.tagSummaries.filter((t)=>!t.tagName.startsWith("心情:"));
        return(
            <Paper
                sx={{
                    width:'100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0.5,
                    m: 0,
                }}
                elevation={0}
                component="ul"
            >
                <Typography variant='overline' color={extraInfomationColor}>
                    🏷️标签：
                    {tags.length>0?tags.map((t,i)=>(
                        <Tag key={i} color={t.tagColor}>{t.tagName}</Tag>
                    )):(
                        <Tag>无其他标签</Tag>
                    )}
                </Typography>
            </Paper>
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
                    background:props.bgColor
                }
            }}
            BackdropProps={{
                sx:{
                    backdropFilter: "blur(2px)",
                }
            }}
            onClose={handleDialogClose}
        >
            <LifeRecordDetailHeader lifeRecord={props.lifeRecord}/>
            <Divider variant="middle" sx={{borderBottomWidth: 2}} />
            <DialogContent>
                <Grid container rowGap={2}>
                    <Grid item container xs={12}>
                        <Typography
                            variant="body1" 
                            paragraph
                            color='#DCDCDC'
                            fontFamily={'Cascadia Code'}
                            whiteSpace="pre-line"
                        >
                            {props.lifeRecord.text}
                        </Typography>
                    </Grid>
                    <LifeRecordDetailEmotionTag lifeRecord={props.lifeRecord}/>
                    <LifeRecordDetailTags lifeRecord={props.lifeRecord}/>
                    <LifeRecordDetailExtraInfomations lifeRecord={props.lifeRecord}/>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}