import { Box, CircularProgress, Container, Grid } from '@mui/material'
import { message } from 'antd'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { signoutRedirectCallback } from '../../services/authServices'

function SignoutOidc() {
  //while redict to here.The token is in the params of url.
  //call callback method to get tokens by response and set into user.
  const history = useHistory()
  useEffect(() => {
    async function signinAsync() {      
      try {
        await signoutRedirectCallback()
      } catch (error) {
        console.log(error);
      }
      history.push('/')
      message.info("您已退出登录");
    }
    signinAsync()
  }, [history])

  return (
    <Grid container width='100%' height='100vh' justifyContent='center' alignItems='center'>
      <CircularProgress />
        登出成功，即将回到主页
    </Grid>

  )
}

export default SignoutOidc