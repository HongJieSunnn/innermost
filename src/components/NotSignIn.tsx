import { Container, Grid, Typography } from "@mui/material";
import { WindowsBlue } from "../themes/InnermostColor";


export default function NotSignIn(props:any){
    return(
        <Grid container>
            <Container maxWidth='xs' sx={{border:2,borderColor:WindowsBlue,borderRadius:2,mt:20}}>
                <Grid item container xs={12} justifyContent='center'>
                    <Typography variant='h1'>π</Typography>
                </Grid>
                <Grid item container xs={12} justifyContent='center'>
                    <Typography variant='h2' textAlign='center'>ζ¨θΏζͺη»ε½ε¦</Typography>
                </Grid>
                <Grid item container xs={12} justifyContent='center'>
                    <Typography variant='h6' textAlign='center'>θ―·θΏθ‘ζ³¨εζθη»ε½</Typography>
                </Grid>
            </Container>
        </Grid>
    )
}