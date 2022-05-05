import { AppBar, Avatar, Badge, Box, Button, Container, createTheme, Divider, Grid, Icon, IconButton, Link, Menu, MenuItem, ThemeProvider, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import { XSAppBar } from "./XSAppBar";
import { InnermostLogo } from "../InnermostLogo";
import { RootStateOrAny, useSelector } from "react-redux";
import { signinRedirect } from "../../services/authServices";
import { UserMenu } from "./UserMenu";
import {Notifications} from '@mui/icons-material';
import { User } from "oidc-client";
import { statueEmojiDictionary } from "../../services/statueServices";


const lightTheme=createTheme({
    palette:{
        mode:'light'
    }
})
const darkTheme=createTheme({
    palette:{
        mode:'dark'
    }
})

export const pages = ["Home","Record",'Meet','Music', 'Tag'];
export const pageUrls = [`/home`,`/loglife`,`/meet`,`/musichub`, `/tag`];

export function HomeAppBar(props:any){
  const user = useSelector((state:RootStateOrAny|null) => state.auth.user);
  
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
      <ThemeProvider theme={darkTheme}>
        <AppBar position='sticky' color="transparent" sx={{
          backdropFilter:'blur(3px)'
        }}>
          {/* <Container > */}
          <Toolbar disableGutters  sx={{marginLeft:3,marginRight:3}}>
            <InnermostLogo xs='none' md='flex'/>

            <XSAppBar/>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Grid container spacing={5} >
                    {pages.map((page,i) => (
                        <Grid item key={page}>
                          <Link href={pageUrls[i]} underline="none"> 
                            <Button
                            key={page}
            
                            sx={{ my: 2, color: '#bfbfbf', display: 'block',textTransform:'none',fontWeight:'bold',fontFamily:['Cascade Code Mono'] }}
                            >
                                {page}
                            </Button>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                {user?
                  <Grid container alignItems='center' spacing={2}>
                    <Grid item xs>
                      <BadgeNotification/>
                    </Grid>
                    <Grid item xs>
                      <UserAvatar handleOpenUserMenu={handleOpenUserMenu}/>
                    </Grid>
                  </Grid>
                  
                :
                  <UserButtons/>}

                <UserMenu 
                  anchorElUser={anchorElUser}
                  handleCloseUserMenu={()=>handleCloseUserMenu()}
                />
            </Box>
          </Toolbar>
          {/* </Container> */}
        </AppBar>
    </ThemeProvider>
  )
}

function UserAvatar(props:any){
  const user:User = useSelector((state:RootStateOrAny|null) => state.auth.user);

  return(
    <IconButton onClick={props.handleOpenUserMenu}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          badgeContent={
            statueEmojiDictionary[user.profile.user_statue]
          }>
          <Avatar variant="rounded" alt="Remy Sharp" src={user.profile.avatarimg} />
        </Badge>
    </IconButton>
  );
}

function UserButtons(){
    async function toLoginPage(){
        try {
          await signinRedirect();
        } catch (error) {
          console.log("登陆超时");
          
        }
    }
    return(
        <Grid container spacing={2}>
              <Grid item xs>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  href="../auth/register"
                  sx={{fontWeight:'bold',borderRadius:3}}
                >
                    注册
                </Button>
              </Grid>

              <Grid item>
                <Divider orientation="vertical"/>
              </Grid>
              
              <Grid item xs>
                <Button
                  //type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{backgroundColor:'#0288d1',color:'white',borderRadius:3}}
                  onClick={()=>toLoginPage()}
                >
                  登陆
                </Button>
              </Grid>
            </Grid>
    );
}

function BadgeNotification(props:any){
  return(
    <IconButton size='small'>
      <Badge color='error' variant='dot' overlap="circular" anchorOrigin={{ vertical: 'top', horizontal: 'right'}}>
        <Notifications sx={{color:'#858585'}}/>
      </Badge>
    </IconButton>
  )
}