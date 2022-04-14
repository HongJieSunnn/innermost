import { Card, CardActionArea, CardContent, CardMedia, Container, Divider, Grid, IconButton, List, Paper, styled, Tab, Tabs, Typography } from "@mui/material"
import { WindowsBlue,randomGradient } from "../../themes/InnermostColor";
import { Select, Tag,DatePicker } from "antd";
import { useState } from "react";
import zhCN from 'antd/lib/date-picker/locale/zh_CN';
import LifeRecordDetail from "./LifeRecordDetail";

const extraInfomationColor='#D7D7D7';

export default function LifeRecordList(props:any){
    return(
        <Grid container rowSpacing={1}>
            <LifeRecordListTitle/>
            <LifeRecordListContent/>
            <LifeRecordDetail/>
        </Grid>
        
    )
}

function LifeRecordListTitle(props:any){
    return(
        <Grid item container xs={12} borderBottom={1} borderColor='#2B2B2B'>
            <Grid item xs={2}>
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
        </Grid>
    );
}

function LifeRecordListContent(props:any){


    return(
        <Grid container mt={1} p={1} border={2} borderColor={WindowsBlue} borderRadius={2} rowSpacing={2}>
            <Grid item xs={6} md={4} pl={1} pr={1}>
                <LifeRecordListItem/>
            </Grid>
            <Grid item xs={6} md={4} pl={1} pr={1}>
                <LifeRecordListItem/>
            </Grid>
            <Grid item xs={6} md={4} pl={1} pr={1}>
                <LifeRecordListItem/>
            </Grid>
            <Grid item xs={6} md={4} pl={1} pr={1}>
                <LifeRecordListItem/>
            </Grid>
            <Grid item xs={6} md={4} pl={1} pr={1}>
                <LifeRecordListItem/>
            </Grid>
            <Grid item xs={6} md={4} pl={1} pr={1}>
                <LifeRecordListItem/>
            </Grid>
            <Grid item xs={6} md={4} pl={1} pr={1}>
                <LifeRecordListItem/>
            </Grid>
        </Grid>
    )
}

function LifeRecordListItem(props:any){
    let gradient=randomGradient();//gradients should be get by the component call LifeRecordDetail
    return(
        <CardActionArea sx={{borderRadius:2,height:'100%'}}>{/*to fit max height of grids same line*/}
        <Paper sx={{ display: 'flex',borderRadius:2 ,background:gradient,height:'100%'}}>{/*to fit height of CardActionArea */}
            <Grid container pb={1} spacing={1}>{/*flex-end makes create time in same position of one line items */}
                <Grid item xs={12}>
                    <Grid item xs={10}>
                    <Typography variant="subtitle1" noWrap fontFamily={'YouYuan'} pt={1} pl={1}>
                        这是一个标题你们知道吗真的真的真的真的
                    </Typography>
                    </Grid>
                    <Container sx={{mt:1}}>
                        <Grid item xs={12}>
                                <Typography 
                                    variant="body2" 
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
                                >{/*sx identify max lines */}
                                    二手摩托尾气臭黑痞老板的电脑老婆凯伦用量子技术弄出了分子超黑超略吧热狗破解RSA加密算法，使瑜典二手摩托启动量子纠缠特性，导致我放在家里的麻辣火锅底料量子衰变成为番茄火锅底料，随后被我煮掉吃了并被量子衰变给影响，从而导致我代码写不出来去扫厕所，偶然发现马桶蓝月亮的蓝色很漂亮，于是骑车来到海边导致腿好酸，吃了碗拌面清汤忘记放醋，结果猪油太油，使拌面表面产生超滑平面，使空气里的一个中子一不小心滑倒了而引起了链式反应时空扭曲，使我自行车被吞没最终找不到女朋友
                                </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <LifeRecordListItemTags/>
                        </Grid>
                    </Container>
                </Grid>
                <Grid container alignItems='flex-end'>
                <Container sx={{mt:1}}>
                    
                    <Grid container item xs={12}>
                        
                        <Grid container item xs={12} justifyContent='right'>
                            <Typography variant='caption' color={extraInfomationColor}>
                                📌 南京工业大学
                            </Typography>
                        </Grid>

                        <Grid container item xs={12} justifyContent='right'>
                            <Typography variant='caption' color={extraInfomationColor}>
                                🎧 借口-周杰伦
                            </Typography>
                        </Grid>

                        <Grid container item xs={12} justifyContent='right'>
                            <Typography variant='caption' color={extraInfomationColor} fontFamily={'Cascadia Code'}>
                                📆 2022-4-13 13:33:33
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

function LifeRecordListItemTags(props:any){
    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));
    const [tags1, setTags1] = useState([
        {tagId:"1",tagName:"😆"},
        {tagId:"2",tagName:"😗"},
        {tagId:"3",tagName:"😶"},
        {tagId:"4",tagName:"😫"},
        {tagId:"1",tagName:"😆"},
        {tagId:"2",tagName:"😗"},
        {tagId:"3",tagName:"😶"},
        {tagId:"4",tagName:"😫"},
        {tagId:"1",tagName:"😆"},
        {tagId:"2",tagName:"😗🎉"},
        {tagId:"3",tagName:"😶"},
        {tagId:"4",tagName:"😫"},
        {tagId:"1",tagName:"😆"},
        {tagId:"2",tagName:"😗"},
        {tagId:"3",tagName:"😶"},
        {tagId:"4",tagName:"😫"},
        {tagId:"1",tagName:"😆"},
        {tagId:"2",tagName:"😗🎉"},
        {tagId:"3",tagName:"😶"},
        {tagId:"4",tagName:"😫"},
        {tagId:"1",tagName:"😆"},
        {tagId:"2",tagName:"😗"},
        {tagId:"3",tagName:"😶"},
        {tagId:"4",tagName:"😫"},
        {tagId:"1",tagName:"😆"},
        {tagId:"2",tagName:"😗🎉"},
        {tagId:"3",tagName:"😶"},
        {tagId:"4",tagName:"😫"},
        {tagId:"1",tagName:"😆"},
        {tagId:"2",tagName:"😗"},
        {tagId:"3",tagName:"😶"},
        {tagId:"4",tagName:"😫"},
        {tagId:"1",tagName:"😆"},
        {tagId:"2",tagName:"😗🎉"},
        {tagId:"3",tagName:"😶"},
    ]);

    const [tags2, setTags2] = useState([
        {tagId:"1",tagName:"😆"},
        {tagId:"2",tagName:"😗"},
        {tagId:"3",tagName:"😶"},
        {tagId:"4",tagName:"😫"},
        {tagId:"1",tagName:"😆"},
    ]);

    let tags=Math.floor(Math.random()*2)===0?tags1:tags2;
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
            {tags.map((tag)=>{

                return(
                    <ListItem key={tag.tagId}>
                        <Tag>{tag.tagName}</Tag>
                    </ListItem>
                )
            })}
            
        </Paper>
    )
}