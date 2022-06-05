import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Link, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getDailyPicture, getDailySentence } from "../../services/apiServices/daily";
import { SubTitleColor } from "../../themes/InnermostColor";
import LifeRecordList from "./LifeRecordList";
import { DailyPicture } from "./LifeRecordTypes";


export default function LogLifeContent(props:any){
    return(
        <Grid container pt={2} pl={4} pr={4} columnSpacing={1}>
            <Grid item xs={0} lg={2}>
                
            </Grid>

            <Grid item xs={12} lg={8} borderLeft={1} borderRight={1} borderColor="#2B2B2B" pr={1}> {/*spacing 1 will pl 1 */}
                <LifeRecordList/>
            </Grid>

            <Grid container item xs={0} lg={2} height='fit-content' rowSpacing={1}>
                <Grid container item xs={12}>
                    <DailySentenceCard/>
                </Grid>
                <Grid container item xs={12}>
                    <DailyPictureCard/>
                </Grid>
            </Grid>
        </Grid>
    )
}

function DailySentenceCard(props:any){
    const [dailySentence, setDailySentence] = useState("暂时没有");

    useEffect(() => {
        getDailySentence().then((dailySentence)=>{
            setDailySentence(dailySentence);
        })
    }, [])
    

    return(
        <Card sx={{width:'100%',height:'fit-content',borderRadius:2}}>
            <CardContent sx={{width:'100%'}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                每日一言
                </Typography>
                
                <Typography variant="body2" textAlign='center' sx={{mt:1}}>
                    {dailySentence}
                </Typography>

            </CardContent>
            <Typography variant="caption" color={SubTitleColor} sx={{p:1}}>
                来源:金山词霸
            </Typography>
        </Card>
    )
}

function DailyPictureCard(props:any){
    const [dailyPicture, setDailyPicture] = useState<DailyPicture>();

    useEffect(() => {
        getDailyPicture().then((res)=>{
            setDailyPicture(res);
        })
    }, [])
    

    return dailyPicture===undefined?(
        <div></div>
    ):(
        <Card sx={{width:'100%',height:'fit-content',borderRadius:2}}>
            <CardContent sx={{width:'100%'}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    每日一图
                </Typography>

                <Typography variant="subtitle1" fontFamily={'Cascadia Code'}>
                    {dailyPicture.title}
                </Typography>
            </CardContent>
            
            <Tooltip title="点击可查看" placement="top">
                <CardMedia
                    component="img"
                    image={dailyPicture.pictureUrl}
                    alt="Paella dish"
                    onClick={()=>{
                        window.open(dailyPicture.pictureUrl)
                    }}
                />
            </Tooltip>

            <Grid container>
                <Grid container item pt={1} pl={1} alignItems='flex-end' xs>
                    <Typography variant="caption" color={SubTitleColor}>
                        来源:Bing
                    </Typography>
                </Grid>
                <Grid item container justifyContent='right' pt={1} pr={1} xs>
                    <Typography variant="caption" noWrap>
                        <Link href={dailyPicture.copyrightLink} target='_blank'>copyright</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    )
}