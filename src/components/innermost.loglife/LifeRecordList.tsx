import { Card, CardActionArea, CardContent, CardMedia, Container, Divider, Grid, IconButton, List, Paper, Skeleton, styled, Tab, Tabs, Tooltip, Typography } from "@mui/material"
import { WindowsBlue,randomGradient, extraInfomationColor, randomInternalTagColor } from "../../themes/InnermostColor";
import { Select, Tag,DatePicker, Pagination, message } from "antd";
import { useEffect, useState } from "react";
import zhCN from 'antd/lib/date-picker/locale/zh_CN';
import LifeRecordDetail from "./LifeRecordDetail";
import { LifeRecord, TagSummary } from "./LifeRecordTypes";
import { getAllRecords } from "../../services/apiServices/loglife/liferecord";
import { RootStateOrAny, useSelector } from "react-redux";
import { User } from "oidc-client";
import { formatJsonTime } from "../../services/timeServices";
import { Autorenew } from "@mui/icons-material";

export default function LifeRecordList(props:any){
    const user:User = useSelector((state:RootStateOrAny|null) => state.auth.user);
    
    const [detailOpen, setDetailOpen] = useState(false);
    const [detailBgColor, setDetailBgColor] = useState("");
    const [detailRecord, setDetailRecord] = useState<LifeRecord>({
        recordId:-1,
        text:"当你看到这句话，那么肯定是程序出现了一些问题了，请联系管理员",
        isShared:false,
        createTime:"2202-13-32 25:61:61",
        tagSummaries:[{tagId:"err",tagName:"错误:加载了错误的 LifeRecord "}],
    })

    //所有记录
    const [lifeRecords, setLifeRecords] = useState<{lifeRecords:LifeRecord[],bgColors:string[]}>({
        lifeRecords:[{
            recordId:-1,
            text:"当你看到这句话，那么肯定是程序出现了一些问题了，请联系管理员",
            isShared:false,
            createTime:"2202-13-32 25:61:61",
            tagSummaries:[{tagId:"err",tagName:"错误:加载了错误的 LifeRecord "}],
        }],
        bgColors:new Array<string>()
    });

    //分页相关
    const [currentPageSize, setCurrentPageSize] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLifeRecord,setCurrentLifeRecords] = useState<{lifeRecords:LifeRecord[],bgColors:string[]}>({
        lifeRecords:[{
            recordId:-1,
            text:"当你看到这句话，那么肯定是程序出现了一些问题了，请联系管理员",
            isShared:false,
            createTime:"2202-13-32 25:61:61",
            tagSummaries:[{tagId:"err",tagName:"错误:加载了错误的 LifeRecord "}],
        }],
        bgColors:new Array<string>()
    });

    //页切换
    const handleCurrentLifeRecordChange=(lifeRecords:{lifeRecords: LifeRecord[];bgColors: string[];},currentPage:number,currentPageSize:number)=>{
        let currentLifeRecordStartIndex=(currentPage-1)*currentPageSize;
        let currentLifeRecordEndIndex=currentLifeRecordStartIndex+currentPageSize;
        setCurrentLifeRecords({
            lifeRecords:lifeRecords.lifeRecords.slice(currentLifeRecordStartIndex,currentLifeRecordEndIndex),
            bgColors:lifeRecords.bgColors.slice(currentLifeRecordStartIndex,currentLifeRecordEndIndex),
        });
    }
    const handlePaginationChange=(page: number, pageSize: number) => {
        if(page===currentPage&&pageSize===currentPageSize){
            return;
        }else if(page!==currentPage&&pageSize===currentPageSize){
            handleCurrentLifeRecordChange(lifeRecords,page,pageSize);
            setCurrentPage(page);
        }else if(page===currentPage&&pageSize!==currentPageSize){
            handleCurrentLifeRecordChange(lifeRecords,page,pageSize);
            setCurrentPageSize(pageSize);
        }else if(page!==currentPage&&pageSize!==currentPageSize){
            handleCurrentLifeRecordChange(lifeRecords,page,pageSize);
            setCurrentPageSize(pageSize);
            setCurrentPage(page);
        }
    }

    const handleRefreshButtonClick=()=>{
        getAllRecords().then((data)=>{
            let set1 = new Set(data.map((d)=>d.recordId));
            let set2 = new Set(lifeRecords.lifeRecords.map((d)=>d.recordId));
            let newCreatedRecordIds= Array.from(new Set([...set1].filter(x => !set2.has(x))));
            if(newCreatedRecordIds.length>0){
                message.info(`有${newCreatedRecordIds.length}条新建记录`)
            }else{
                message.info(`没有新建记录，但祝您好心情哦😀`)
            }
            let bgColors:string[]=[];
            data.map((d,i)=>{bgColors.push(randomGradient())});
            data.forEach((d)=>d.tagSummaries.forEach((t)=>t.tagColor=randomInternalTagColor()))
            let scopedlifeRecords:{lifeRecords:LifeRecord[],bgColors:string[]}={
                lifeRecords:data,
                bgColors:bgColors,
            };
            setLifeRecords(scopedlifeRecords);
            handleCurrentLifeRecordChange(scopedlifeRecords,1,currentPageSize);
        });
    }

    useEffect(() => {
        getAllRecords().then((data)=>{
            let bgColors:string[]=[];
            data.map((d,i)=>{bgColors.push(randomGradient())});
            data.forEach((d)=>d.tagSummaries.forEach((t)=>t.tagColor=randomInternalTagColor()))
            let lifeRecords:{lifeRecords:LifeRecord[],bgColors:string[]}={
                lifeRecords:data,
                bgColors:bgColors,
            };
            setLifeRecords(lifeRecords);
            handleCurrentLifeRecordChange(lifeRecords,1,currentPageSize);
        });
    }, [user])
    

    function LifeRecordListTitle(props:any){
        return(
            <Grid item container xs={12} borderBottom={1} borderColor='#2B2B2B'>
                <Grid container item xs={2}>
                    <Tabs value={0}>
                        <Tab label="记录" sx={{textTransform:'none',fontWeight:'bold'}}/>
                    </Tabs>
                </Grid>
                
                <LifeRecordListDateTimePicker/>
                
            </Grid>
        )
    }
    
    function LifeRecordListDateTimePicker(props:any){
        const { Option } = Select;
        const { RangePicker } = DatePicker;
        const [type, setType] = useState('date');
    
        function PickerWithType({ type, onChange }:{type:any,onChange:any}) {
            if (type === 'date') return <DatePicker locale={zhCN} onChange={onChange} />;
            if (type === 'range') return <RangePicker locale={zhCN} onChange={onChange} />;
            return <DatePicker locale={zhCN} picker={type} onChange={onChange} />;
        }
        
        return (
            <Grid container item xs={10} justifyContent='right' alignItems='center'>
                <Select value={type} onChange={setType}>
                    <Option value="date">Date</Option>
                    <Option value="month">Month</Option>
                    <Option value="year">Year</Option>
                    <Option value="range">Range</Option>
                </Select>
                <PickerWithType type={type} onChange={(v:any)=>console.log(v)} />
                <Tooltip title="刷新，不仅能获得最新的记录，还能换种心情哦" placement="top" onClick={handleRefreshButtonClick}>
                    <IconButton color="primary" >
                        <Autorenew/>
                    </IconButton>
                </Tooltip>
            </Grid>
        );
    }

    function LifeRecordListContent(props:any){
        if(lifeRecords.lifeRecords[0].recordId===-1){
            let arrLengthNight:number[]=[1,2,3,4,5,6,7,8,9];
            
            return (
                <Grid container spacing={1}>
                    {arrLengthNight.map((a,i)=>(
                        <Grid key={i} item xs={4}>
                            <Skeleton variant="text" />
                            <Skeleton variant="rectangular" height={200}/>
                        </Grid>
                    ))}
                </Grid>
            )
        }

        return lifeRecords.lifeRecords.length===0?(
            <Grid container>
                <Container maxWidth='md' sx={{border:2,borderColor:WindowsBlue,borderRadius:2,mt:20,mb:5}}>
                    <Grid item container xs={12} justifyContent='center'>
                        <Typography variant='h1'>🪄</Typography>
                    </Grid>
                    <Grid item container xs={12} justifyContent='center'>
                        <Typography variant='h2' textAlign='center'>您还有任何记录哦<br/>是刚来到这里吗</Typography>
                    </Grid>
                    <Grid item container xs={12} justifyContent='center'>
                        <Typography variant='h6' textAlign='center'>点击 New 创建第一条属于您内心的记录吧</Typography>
                    </Grid>
                </Container>
            </Grid>
        ):(
            <Grid container mt={1} p={1} border={2} borderColor={WindowsBlue} borderRadius={2} rowSpacing={2}>
                {currentLifeRecord?.lifeRecords.map((lr,i)=>(
                    <Grid key={i} item xs={6} md={4} pl={1} pr={1}>
                        <LifeRecordListItem lifeRecord={lr} bgColor={lifeRecords.bgColors[i]} />
                    </Grid>
                ))}
            </Grid>
        )
    }

    function LifeRecordListItem(props:{
        lifeRecord:LifeRecord,
        bgColor:string
    }){
        const handleDetailOpen=()=>{
            setDetailRecord(props.lifeRecord);
            setDetailBgColor(props.bgColor);
            setDetailOpen(true);
        }
        
        return(
            <CardActionArea sx={{borderRadius:2,height:'100%'}} onClick={handleDetailOpen}>{/*to fit max height of grids same line*/}
            <Paper sx={{ display: 'flex',borderRadius:2 ,background:props.bgColor,height:'100%'}}>{/*to fit height of CardActionArea */}
                <Grid container pb={1} spacing={1}>{/*flex-end makes create time in same position of one line items */}
                    <Grid item xs={12}>
                        <Grid item xs={10}>
                        <Typography variant="h6" noWrap fontFamily={'YouYuan'} pt={1} pl={1}>
                            {props.lifeRecord.title==undefined?"✨无标题":props.lifeRecord.title}
                        </Typography>
                        </Grid>
                        <Container sx={{mt:1}}>
                            <Grid item xs={12}>
                                <Typography 
                                    variant="body1" 
                                    paragraph
                                    color='#DCDCDC'
                                    fontWeight='bold'
                                    fontFamily={'Cascadia Code'}
                                    sx={{
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 4,
                                    }}
                                    whiteSpace="pre-line"
                                >{/*sx identify max lines */}
                                    {props.lifeRecord.text}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <LifeRecordListItemTags tags={props.lifeRecord.tagSummaries} />
                            </Grid>
                        </Container>
                    </Grid>
                    <Grid container alignItems='flex-end'>
                    <Container sx={{mt:1}}>
                        
                        <Grid container item xs={12}>
                            
                            <Grid container item xs={12} justifyContent='right'>
                                <Typography variant='caption' color={extraInfomationColor}>
                                    {props.lifeRecord.Location==undefined?"":"📌 "+props.lifeRecord.Location?.locationName}
                                </Typography>
                            </Grid>
    
                            <Grid container item xs={12} justifyContent='right'>
                                <Typography variant='caption' color={extraInfomationColor}>
                                    {props.lifeRecord.MusicRecord==undefined?"":"🎧 "+props.lifeRecord.MusicRecord?.musicName+"-"+props.lifeRecord.MusicRecord?.singer}
                                </Typography>
                            </Grid>
    
                            <Grid item xs={3}>
                                <Typography variant='caption' color={extraInfomationColor}>
                                    {props.lifeRecord.isShared?"已分享":"私有"}
                                </Typography>
                            </Grid>
                            <Grid container item xs={9} justifyContent='right' alignItems='end'>
                                <Typography variant='caption' color={extraInfomationColor} fontFamily={'Cascadia Code'}>
                                    📆 {formatJsonTime(props.lifeRecord.createTime)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                    </Grid>
                    
                </Grid>
            </Paper>
            </CardActionArea>
        )
    }
    
    function LifeRecordListItemTags(props:{
        tags:TagSummary[]
    }){
        const ListItem = styled('li')(({ theme }) => ({
            margin: theme.spacing(0.5),
        }));
        
        return(
            <Paper
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0.5,
                    m: 0,
                    backgroundColor:'transparent'
                }}
                elevation={0}
                component="ul"
            >
                {props.tags.map((tag)=>{
    
                    return(
                        <ListItem key={tag.tagId}>
                            <Tag color={tag.tagColor}>{tag.tagName}</Tag>
                        </ListItem>
                    )
                })}
                
            </Paper>
        )
    }

    return(
        <Grid container rowSpacing={1}>
            <LifeRecordListTitle/>
            <LifeRecordListContent/>
            <Grid item container justifyContent='right'>
                <Pagination 
                    showQuickJumper 
                    showSizeChanger
                    defaultCurrent={1}
                    current={currentPage}
                    defaultPageSize={9}
                    pageSize={currentPageSize}
                    showTotal={total => `共有 ${total} 条记录`} 
                    total={lifeRecords?.lifeRecords.length} 
                    pageSizeOptions={[9,12,15,18,21,24,27]}
                    style={{marginTop:5,marginBottom:10}}
                    onChange={handlePaginationChange}
                />
            </Grid>
            <LifeRecordDetail open={detailOpen} setOpen={setDetailOpen} bgColor={detailBgColor} lifeRecord={detailRecord} />
        </Grid>
        
    )
}