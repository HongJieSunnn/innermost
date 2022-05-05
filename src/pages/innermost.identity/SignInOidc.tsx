import { Box, CircularProgress, Container, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { signinRedirectCallback } from '../../services/authServices'

function SigninOidc() {
  //while redict to here.The token is in the params of url.
  //call callback method to get tokens by response and set into user.
  const history = useHistory()
  useEffect(() => {
    async function signinAsync() {      
      try {
        await signinRedirectCallback()
      } catch (error) {
        console.log(error);
      }
      history.push('/')
    }
    signinAsync()
  }, [history])

  return (
    <Grid container width='100%' height='100vh' justifyContent='center' alignItems='center'>
      <CircularProgress />
      登陆成功，即将回到主页
    </Grid>

  )
}

export default SigninOidc
