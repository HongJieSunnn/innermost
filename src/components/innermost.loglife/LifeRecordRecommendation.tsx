import { Button, Card, CardActionArea, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle,Divider, Grid, Tooltip, Typography } from "@mui/material";
import { WindowsBlue } from "../../themes/InnermostColor";
import { RecommendedMusicRecord } from "./LifeRecordTypes";


export default function LifeRecordRecommendation(props:{
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    title:string,
    content:string,
    recommendedMusicRecord:RecommendedMusicRecord|undefined,
}){
    const handleClose=()=>{
        props.setOpen(false);
    }

    return(
        <Dialog 
            maxWidth='xs' 
            fullWidth 
            open={props.open}
            PaperProps={{
                elevation:0,
                sx:{
                    borderRadius:2
                }
            }}
            BackdropProps={{
                sx:{
                    backdropFilter: "blur(0px)",
                }
            }}
            onClose={handleClose}
        >
            <DialogTitle sx={{textAlign:'center',whiteSpace:'pre-line'}}>
                {props.title}
            </DialogTitle>
            <Divider/>
            <DialogContent>
                <Grid container border={2} borderRadius={2} borderColor={WindowsBlue} height={200} justifyContent='center' alignItems='center'>
                    {props.recommendedMusicRecord===undefined?(
                        <Typography fontFamily={'Cascadia Code'}>
                            {props.content}
                        </Typography>
                    ):(
                        <Tooltip title='点击前往播放页' placement="top">
                            <CardActionArea onClick={()=>{window.open(`https://y.qq.com/n/ryqq/songDetail/${props.recommendedMusicRecord?.mid}`)}}>
                                <Card sx={{ display: 'flex',borderRadius:2 ,backgroundColor:'transparent',backdropFilter:'blur(3px)',width:'100%'}}>
                                    <CardMedia sx={{pt:3,pb:3,pl:3,pr:1}}>
                                        <img src={props.recommendedMusicRecord.musicCoverUrl} width={100}></img>
                                    </CardMedia>
                                    <CardContent>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <Typography variant="h5">
                                                    {props.recommendedMusicRecord.musicName}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="body1">
                                                    歌手：{props.recommendedMusicRecord.musicSinger}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="subtitle2">
                                                    专辑：{props.recommendedMusicRecord.musicAlbum}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </Tooltip>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions sx={{pl:3,pr:3}}>
                <Button variant="outlined" onClick={handleClose} fullWidth>确认</Button>
            </DialogActions>
        </Dialog>
    )
}