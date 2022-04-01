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
                    backgroundImage: 'url(' + require('../images/backgrounds/HomePageBg.png') + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor:
                      "#121212",
                    backgroundSize: 'cover',
                    height:'92vh',
                    display:{xs:'none',md:'none',lg:'block',xl:'flex'}
            }}>
                <Grid item md justifyContent='center' >
                    <Grid container item justifyContent='center'>
                        <Typography variant="h2" sx={{marginTop:18}}>
                            🎉Welcome to🎉
                        </Typography>
                    </Grid>

                    <Grid container item justifyContent='center'>
                        <Typography variant="h1" sx={{fontFamily:['Cascadia Code']}}>
                            Innermost
                        </Typography>
                    </Grid>

                    <Grid container item justifyContent='center'>
                        <Typography variant="h6" color='#525252' sx={{marginTop:4}}>
                            人的情绪万千，总有想偷偷藏在心里的，总有值得慢慢回味的，总有..<br/>
                            我们希望，在 Innermost ，我们都能触碰到自己的内心深处<br/>
                            我们都可以，没有顾忌的
                        </Typography>
                    </Grid>

                    <Grid container item justifyContent='center'>
                        <Typography sx={{marginTop:5,fontWeight:'bold',fontSize:25,fontFamily:['Cascadia Code']}}>
                            Be yourself&nbsp;
                        </Typography>

                        <Typography sx={{marginTop:2,fontWeight:'bold',fontSize:33,fontFamily:['Cascadia Code']}}>
                            做真正的自己&nbsp;
                        </Typography>

                        <Typography sx={{marginTop:6,fontSize:20,fontFamily:['Cascadia Code']}}>
                            Sei du selbst
                        </Typography>
                    </Grid>

                    <Grid container item justifyContent='center'>
                        <Typography sx={{marginTop:1,fontSize:26,fontFamily:['Cascadia Code']}}>
                            本当の自分になる
                        </Typography>
                    </Grid>

                    <Grid container item justifyContent='center'>
                        <Typography sx={{marginTop:1,fontWeight:'bold',fontSize:25,fontFamily:['Cascadia Code']}}>
                            真己者自为&nbsp;
                        </Typography>

                        <Typography sx={{marginTop:3,fontWeight:'bold',fontSize:25,fontFamily:['Cascadia Code']}}>
                         быть настоящим собой&nbsp;
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
            backgroundImage: 'url(' + require('../images/backgrounds/HomePageTextBackground.png') + ')',
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
                    🎉Welcome to🎉
                </Typography>
            </Grid>

            <Grid container item justifyContent='center'>
                <Typography variant="h1" sx={{fontFamily:['Cascadia Code']}}>
                    Innermost
                </Typography>
            </Grid>

            <Grid container item justifyContent='center'>
                <Typography variant="body1" color='#525252' sx={{marginTop:4}}>
                    人的情绪万千，总有想偷偷藏在心里的，总有值得慢慢回味的，总有..<br/>
                    我们希望，在 Innermost ，我们都能触碰到自己的内心深处<br/>
                    我们都可以，没有顾忌的
                </Typography>
            </Grid>

            <Grid container item justifyContent='center'>
                <Typography sx={{marginTop:5,fontWeight:'bold',fontSize:25,fontFamily:['Cascadia Code']}}>
                    Be yourself&nbsp;
                </Typography>

                <Typography sx={{marginTop:2,fontWeight:'bold',fontSize:33,fontFamily:['Cascadia Code']}}>
                    做真正的自己&nbsp;
                </Typography>

                <Typography sx={{marginTop:6,fontSize:20,fontFamily:['Cascadia Code']}}>
                    Sei du selbst
                </Typography>
            </Grid>

            <Grid container item justifyContent='center'>
                <Typography sx={{marginTop:1,fontSize:26,fontFamily:['Cascadia Code']}}>
                    本当の自分になる
                </Typography>
            </Grid>

            <Grid container item justifyContent='center'>
                <Typography sx={{marginTop:1,fontWeight:'bold',fontSize:25,fontFamily:['Cascadia Code']}}>
                    真己者自为&nbsp;
                </Typography>

                <Typography sx={{marginTop:3,fontWeight:'bold',fontSize:25,fontFamily:['Cascadia Code']}}>
                 быть настоящим собой&nbsp;
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