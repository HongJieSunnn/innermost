import { LoadingButton } from "@mui/lab";
import { Box, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import { createTheme } from "@mui/system";
import { message } from "antd";
import axios from "axios";
import { useState } from "react";
import { RootStateOrAny,useSelector } from "react-redux";
import { Redirect } from "react-router";
import { signinRedirect, signinRedirectCallback } from "../../services/authServices";
import { getLoginReturnUrl } from "../../services/urlServices";
import { Copyright } from "../CopyRight";

export function SignIn(props:any){
    if(!window.location.search)
        signinRedirect();
    const [userName, setUserName] = useState("457406475@qq.com");
    const [password, setPassword] = useState("hong456..");
    const [loading, setLoading] = useState(false);

    function login(){
        setLoading(true);
        axios.defaults.withCredentials=true;
        axios.defaults.headers.common['Access-Control-Allow-Origin']='http://localhost:5106'
        axios.post("https://localhost:5106/Account/Login",{
            account:userName,
            password:password,
            accountType:'Email',
            rememberMe:true,
            returnUrl:getLoginReturnUrl()
        })
        .catch(err=>{
            if(err.toString()==="Error: Network Error"){
                signinRedirect();
                return;
            }
            
            message.error('登陆失败，请检查账号密码是否正确');
            setLoading(false);
        })
    }
    
    return (
        <Paper elevation={1} sx={{
            marginTop:16,
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            borderRadius:5
        }}>

            <Box sx={{
                width:'100%',
                pl:5,
                pr:5
            }}>

                <Typography component="h1" variant="h4" sx={{
                    marginTop:4,
                    marginBottom:2
                }}> 
                    Sign In to Innermost✨
                </Typography>

                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="username"
                    label="UserName"
                    name="username"
                    autoComplete="innermost.username"
                    value={userName}
                    onChange={(e)=>setUserName(e.target.value)}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <Grid container>
                    <Grid item xs>
                        <Link href="../auth/register" >注册</Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" >忘记密码</Link>
                    </Grid>
                </Grid>
                <FormControlLabel
                    id="rememberMe"
                    control={<Checkbox value="remember" color="primary" />}
                    label="记住我"
                />

                <LoadingButton
                    fullWidth 
                    variant="outlined" 
                    loading={loading}
                    onClick={login}
                    sx={{
                    fontWeight:'bold'
                }}>
                    登录
                </LoadingButton>
            </Box>

            <Box mt={3} mb={3}>
                <Copyright />
            </Box>
        </Paper>
    );
}