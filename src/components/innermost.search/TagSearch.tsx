import { Search } from "@mui/icons-material";
import { Card, CardContent, CardMedia, DialogContent, DialogTitle, Divider, Grid, IconButton, InputBase, Menu, Paper, Typography } from "@mui/material";

export default function TagSearch(props:any){
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
                    placeholder={"🎧搜索音乐"}
                />
                <IconButton sx={{ p: '10px' }} aria-label="search">
                    <Search/>
                </IconButton>
            </Paper>
            </DialogTitle>
            <Divider/>
            <DialogContent sx={{height:400}}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Card sx={{ display: 'flex',borderRadius:2 ,backgroundColor:'#54A858',width:'100%'}}>
                        <CardMedia sx={{pt:3,pb:3,pl:3,pr:1}}>
                            <img src="https://y.qq.com/music/photo_new/T002R300x300M000003DFRzD192KKD_1.jpg" width={100}></img>
                        </CardMedia>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">
                                        借口
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        歌手：周杰伦
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2">
                                        专辑：七里香
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ display: 'flex',borderRadius:2 ,backgroundColor:'#0057A7',width:'100%'}}>
                        <CardMedia sx={{pt:3,pb:3,pl:3,pr:1}}>
                            <img src="https://y.qq.com/music/photo_new/T002R300x300M000001BGzMs369FzU_1.jpg" width={100}></img>
                        </CardMedia>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">
                                        轨迹
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        歌手：周杰伦
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2">
                                        专辑：寻找周杰伦
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ display: 'flex',borderRadius:2 ,backgroundColor:'#D5B043',width:'100%'}}>
                        <CardMedia sx={{pt:3,pb:3,pl:3,pr:1}}>
                            <img src="https://y.qq.com/music/photo_new/T002R300x300M000002Neh8l0uciQZ_1.jpg?max_age=2592000" width={100}></img>
                        </CardMedia>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">
                                        花海
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        歌手：周杰伦
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2">
                                        专辑：魔杰座
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                
            </Grid>
            </DialogContent>
        </Menu>
    )
}