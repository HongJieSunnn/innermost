import { LoadingButton } from "@mui/lab";
import { Box, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import { createTheme } from "@mui/system";
import { message } from "antd";
import axios from "axios";
import React from "react";
import { createRef, useState } from "react";
import { RootStateOrAny,useSelector } from "react-redux";
import { Redirect } from "react-router";
import { signinRedirect, signinRedirectCallback } from "../../services/authServices";
import { getLoginReturnUrl } from "../../services/urlServices";
import { Copyright } from "../CopyRight";

const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

export function SignIn(props:any){
    if(!window.location.search)
        signinRedirect();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    const loginButtonRef = createRef<HTMLButtonElement>();

    function login(){
        if(userName===""||password===""){
            message.error('账号和密码都不允许为空');
            return;
        }
        setLoading(true);
        axios.defaults.withCredentials=true;
        axios.defaults.headers.common['Access-Control-Allow-Origin']='http://localhost:5106'
        axios.post("https://localhost:5106/Account/Login",{
            account:userName,
            password:password,
            accountType:regEmail.test(userName)?"Email":"UserName",
            rememberMe:rememberMe,
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
                    label="邮箱/用户名"
                    name="username"
                    type="username"
                    autoComplete="username"
                    value={userName}
                    onChange={(e)=>setUserName(e.target.value)}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="密码"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    onKeyDown={(e)=>{
                        if(e.key==='Enter'){
                            loginButtonRef.current?.click();
                        }
                    }}
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
                    control={<Checkbox checked={rememberMe} value="remember" color="primary" onChange={(e)=>{setRememberMe(e.target.checked)}}/>}
                    label="记住我"
                />

                <LoadingButton
                    fullWidth 
                    ref={loginButtonRef}
                    variant="outlined" 
                    loading={loading}
                    onClick={login}
                    sx={{
                    fontWeight:'bold'
                    }}
                >
                    登录
                </LoadingButton>
            </Box>

            <Box mt={3} mb={3}>
                <Copyright />
            </Box>
        </Paper>
    );
}