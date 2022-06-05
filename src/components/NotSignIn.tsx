import { Container, Grid, Typography } from "@mui/material";
import { WindowsBlue } from "../themes/InnermostColor";


export default function NotSignIn(props:any){
    return(
        <Grid container>
            <Container maxWidth='xs' sx={{border:2,borderColor:WindowsBlue,borderRadius:2,mt:20}}>
                <Grid item container xs={12} justifyContent='center'>
                    <Typography variant='h1'>🙂</Typography>
                </Grid>
                <Grid item container xs={12} justifyContent='center'>
                    <Typography variant='h2' textAlign='center'>您还未登录哦</Typography>
                </Grid>
                <Grid item container xs={12} justifyContent='center'>
                    <Typography variant='h6' textAlign='center'>请进行注册或者登录</Typography>
                </Grid>
            </Container>
        </Grid>
    )
}