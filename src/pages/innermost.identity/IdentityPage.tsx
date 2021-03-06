import { createTheme,Container, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import { HomeAppBar } from "../../components/innermost.appbar/HomeAppBar";
import ConfirmFailed from "../../components/innermost.identity/ConfirmFailed";
import ConfirmSucceed from "../../components/innermost.identity/ConfirmSucceed";
import Register from "../../components/innermost.identity/Register";
import { SignIn } from "../../components/innermost.identity/SignIn";

const domain="http://localhost:3000";

const identityDarkTheme =createTheme({
    palette:{
        mode:"dark",
    }
});

export function IdentityPage(): JSX.Element{
    if(window.location.href==domain+'/auth')
        window.location.href = "/auth/login";
    return(
        <ThemeProvider theme={identityDarkTheme}>
            <Grid container sx={{
                backgroundImage: 'url(https://innermost-img-resources-1300228246.cos.ap-nanjing.myqcloud.com/innermost.identity/star-bg.svg)',//https://source.unsplash.com/random
                backgroundRepeat: 'no-repeat',
                backgroundColor:
                  "#121212",
                backgroundSize: 'cover',
                height:'92vh'
            }}>
                <CssBaseline/>
                <Container maxWidth='sm'>
                    
                    <Route path="/auth/login" component={SignIn}/>
                    <Route path="/auth/register" component={Register} />
                    <Route path="/auth/confirm-succeed" component={ConfirmSucceed} />
                    <Route path="/auth/confirm-failed" component={ConfirmFailed} />
                </Container>
            </Grid>
        </ThemeProvider>
        
    );
}