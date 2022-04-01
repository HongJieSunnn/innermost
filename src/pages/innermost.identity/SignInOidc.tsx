import { Box, CircularProgress, Container, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { signinRedirectCallback } from '../../services/authServices'

function SigninOidc() {
  const history = useHistory()
  useEffect(() => {
    async function signinAsync() {      
      await signinRedirectCallback()
      history.push('/')
    }
    signinAsync()
  }, [history])

  return (
    <Grid container width='100%' height='100vh' justifyContent='center' alignItems='center'>
      <CircularProgress />
      登陆成功，跳转中
    </Grid>

  )
}

export default SigninOidc
