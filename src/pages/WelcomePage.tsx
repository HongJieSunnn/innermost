import { Box, Button, createTheme, CssBaseline, Grid, ThemeProvider, Typography } from "@mui/material";
import { HomeAppBar } from "../components/innermost.appbar/HomeAppBar";

const theme=createTheme({
    palette:{
        mode:'dark'
    },
})

const lightTheme=createTheme({
    palette:{
        mode:'light'
    }
})
export function WelcomePage(props:any){

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <HomeAppBar/>
            <XSHomePage/>
            <Grid container sx={{
                    backgroundImage: 'url(' + require('../images/backgrounds/HomePageBgOnlyEmoji.png') + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor:
                      "#121212",
                    backgroundSize: 'cover',
                    height:'92vh',
                    display:{xs:'none',md:'none',lg:'flex',xl:'flex'}
            }}>
                <Grid item md justifyContent='center' >
                    <Grid container item justifyContent='center'>
                        <Typography variant="h2" sx={{marginTop:18}}>
                            ðWelcome toð
                        </Typography>
                    </Grid>

                    <Grid container item justifyContent='center'>
                        <Typography variant="h1" sx={{fontFamily:['Cascadia Code']}}>
                            Innermost
                        </Typography>
                    </Grid>

                    <Grid container item justifyContent='center'>
                        <Typography variant="h6" color='#525252' sx={{marginTop:4}}>
                            äººçæç»ªä¸åï¼æ»ææ³å·å·èå¨å¿éçï¼æ»æå¼å¾æ¢æ¢åå³çï¼æ»æ..<br/>
                            æä»¬å¸æï¼å¨ Innermost ï¼æä»¬é½è½è§¦ç¢°å°èªå·±çåå¿æ·±å¤<br/>
                            æä»¬é½å¯ä»¥ï¼æ²¡æé¡¾å¿ç
                        </Typography>
                    </Grid>

                    <Grid container item justifyContent='center'>
                        <Typography sx={{marginTop:5,fontWeight:'bold',fontSize:25,fontFamily:['Cascadia Code']}}>
                            Be yourself&nbsp;
                        </Typography>

                        <Typography sx={{marginTop:2,fontWeight:'bold',fontSize:33,fontFamily:['Cascadia Code']}}>
                            åçæ­£çèªå·±&nbsp;
                        </Typography>

                        <Typography sx={{marginTop:6,fontSize:20,fontFamily:['Cascadia Code']}}>
                            Sei du selbst
                        </Typography>
                    </Grid>

                    <Grid container item justifyContent='center'>
                        <Typography sx={{marginTop:1,fontSize:26,fontFamily:['Cascadia Code']}}>
                            æ¬å½ã®èªåã«ãªã
                        </Typography>
                    </Grid>

                    <Grid container item justifyContent='center'>
                        <Typography sx={{marginTop:1,fontWeight:'bold',fontSize:25,fontFamily:['Cascadia Code']}}>
                            çå·±èèªä¸º&nbsp;
                        </Typography>

                        <Typography sx={{marginTop:3,fontWeight:'bold',fontSize:25,fontFamily:['Cascadia Code']}}>
                        Â Ð±ÑÑÑ Ð½Ð°ÑÑÐ¾ÑÑÐ¸Ð¼ ÑÐ¾Ð±Ð¾Ð¹&nbsp;
                        </Typography>
                    </Grid>

                    <Grid container item justifyContent='center' sx={{marginTop:2}}>
                        <Button color='info' variant="outlined" sx={{fontSize:30,fontWeight:'bold',borderRadius:5,textTransform:'none'}}>
                            Into Innermost
                        </Button>
                    </Grid>
                </Grid>

                <Grid item container xs md>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

function XSHomePage(props:any){
    return(
        <Grid container sx={{
            //backgroundImage: 'url(' + require('../images/backgrounds/HomePageTextBackground.png') + ')',
            backgroundRepeat: 'no-repeat',
            backgroundColor:
              "#121212",
            backgroundPositionX:'center',
            backgroundPositionY:'center',
            display:{xs:'block',md:'flex',lg:'none'}
    }}>
        <Grid item md justifyContent='center' >
            <Grid container item justifyContent='center'>
                <Typography variant="h2" sx={{marginTop:18}}>
                    ðWelcome toð
                </Typography>
            </Grid>

            <Grid container item justifyContent='center'>
                <Typography variant="h1" sx={{fontFamily:['Cascadia Code']}}>
                    Innermost
                </Typography>
            </Grid>

            <Grid container item justifyContent='center'>
                <Typography variant="body1" color='#525252' sx={{marginTop:4}}>
                    äººçæç»ªä¸åï¼æ»ææ³å·å·èå¨å¿éçï¼æ»æå¼å¾æ¢æ¢åå³çï¼æ»æ..<br/>
                    æä»¬å¸æï¼å¨ Innermost ï¼æä»¬é½è½è§¦ç¢°å°èªå·±çåå¿æ·±å¤<br/>
                    æä»¬é½å¯ä»¥ï¼æ²¡æé¡¾å¿ç
                </Typography>
            </Grid>

            <Grid container item justifyContent='center'>
                <Typography sx={{marginTop:5,fontWeight:'bold',fontSize:25,fontFamily:['Cascadia Code']}}>
                    Be yourself&nbsp;
                </Typography>

                <Typography sx={{marginTop:2,fontWeight:'bold',fontSize:33,fontFamily:['Cascadia Code']}}>
                    åçæ­£çèªå·±&nbsp;
                </Typography>

                <Typography sx={{marginTop:6,fontSize:20,fontFamily:['Cascadia Code']}}>
                    Sei du selbst
                </Typography>
            </Grid>

            <Grid container item justifyContent='center'>
                <Typography sx={{marginTop:1,fontSize:26,fontFamily:['Cascadia Code']}}>
                    æ¬å½ã®èªåã«ãªã
                </Typography>
            </Grid>

            <Grid container item justifyContent='center'>
                <Typography sx={{marginTop:1,fontWeight:'bold',fontSize:25,fontFamily:['Cascadia Code']}}>
                    çå·±èèªä¸º&nbsp;
                </Typography>

                <Typography sx={{marginTop:3,fontWeight:'bold',fontSize:25,fontFamily:['Cascadia Code']}}>
                Â Ð±ÑÑÑ Ð½Ð°ÑÑÐ¾ÑÑÐ¸Ð¼ ÑÐ¾Ð±Ð¾Ð¹&nbsp;
                </Typography>
            </Grid>

            <Grid container item justifyContent='center'>
                <Button color='info' variant="outlined" sx={{marginTop:7,fontSize:30,fontWeight:'bold',borderRadius:5,textTransform:'none'}}>
                    Into Innermost
                </Button>
            </Grid>
        </Grid>

    </Grid>
    );
}