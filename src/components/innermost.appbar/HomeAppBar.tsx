import { AppBar, Avatar, Badge, Box, Button, Container, createTheme, Divider, Grid, Icon, IconButton, Link, Menu, MenuItem, ThemeProvider, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { XSAppBar } from "./XSAppBar";
import { InnermostLogo } from "../InnermostLogo";
import { RootStateOrAny, useSelector } from "react-redux";
import { signinRedirect } from "../../services/authServices";
import { UserMenu } from "./UserMenu";
import {Notifications} from '@mui/icons-material';
import { User } from "oidc-client";
import { statueEmojiDictionary } from "../../services/statueServices";
import { message, notification } from "antd";
import { LoadingButton } from "@mui/lab";
import { pushHubConnection, startHubConnection } from "../../services/signalRServices";
import { HubConnection } from "@microsoft/signalr";
import { guid } from "../../services/guidServices";


const darkTheme=createTheme({
    palette:{
        mode:'dark'
    }
})

export const pages = ["Record",'Meet','Music', 'Tag'];
export const pageUrls = [`/loglife`,`/meet`,`/musichub`, `/tag`];

const pushedMessageType=["ConfidantRequest"];
const pushedMessageTitle=["添加好友请求"];

export function HomeAppBar(props:any){
  const user = useSelector((state:RootStateOrAny|null) => state.auth.user);
  
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [pushedMessage, setPushedMessage] = useState<Array<{title:string,message:string}>>([]);
  const [pushHub, setPushHub] = useState<HubConnection>(pushHubConnection);
  useEffect(() => {
      if(user!==null){
        startHubConnection(pushHub);
      }
  }, [user])

  pushedMessageType.forEach((type,i) => {
    pushHub.on(`Push${type}Message`,(message:string)=>{
      const key=guid();
      const btn = (
        <Button size="small" onClick={()=>{
          setPushedMessage(pushedMessage.slice(0,pushedMessage.length-2));//remove last one which we just concated.
          notification.close(key);
        }}>
          确认
        </Button>
      );

      setPushedMessage(pushedMessage.concat({
        title:pushedMessageTitle[i],
        message:message
      }));

      notification.open({
        key:key,
        message: pushedMessageTitle[i],
        description:message,
        duration:3,
        btn:btn
      })
      
    })
  });

  return (
      <ThemeProvider theme={darkTheme}>
        <AppBar position='static' color="transparent" sx={{
          backdropFilter:'blur(3px)',
          height:'fit-content'
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
                      <BadgeNotification pushedMessage={pushedMessage} setPushedMessage={setPushedMessage}/>
                    </Grid>
                    <Grid item xs>
                      <UserAvatar handleOpenUserMenu={handleOpenUserMenu}/>
                    </Grid>
                  </Grid>
                  
                :
                  <UserButtons/>}

                <UserMenu 
                  anchorElUser={anchorElUser}
                  handleCloseUserMenu={handleCloseUserMenu}
                  user={user}
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
        setLoading(true);
        try {
          await signinRedirect();
        } catch (error) {
          message.error("登陆超时");
          setLoading(false);
        }
    }

    const [loading, setLoading] = useState(false);
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
                <LoadingButton
                  //type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  loading={loading}
                  sx={{backgroundColor:'#0288d1',color:'white',borderRadius:3}}
                  onClick={()=>toLoginPage()}
                >
                  登陆
                </LoadingButton>
              </Grid>
            </Grid>
    );
}

function BadgeNotification(props:{
  pushedMessage:{title:string,message:string}[],
  setPushedMessage: React.Dispatch<React.SetStateAction<{title:string,message:string}[]>>,
}){
  const handleBadgeNotificationIconButtonCLick=()=>{
    if(props.pushedMessage.length===0){
      notification.open({
        message: "提醒",
        description:"没有未读消息",
        duration:2,
      })
      return;
    }

    let duration=2.5;
    props.pushedMessage.forEach((m,i)=>{
      ++duration;
      notification.open({
        message: m.title,
        description:m.message,
        duration:duration,
      })
    })

    props.setPushedMessage([]);
  }

  return(
    <IconButton size='small' onClick={handleBadgeNotificationIconButtonCLick}>
      <Badge invisible={props.pushedMessage.length===0} color='error' variant='dot' overlap="circular" anchorOrigin={{ vertical: 'top', horizontal: 'right'}}>
        <Notifications sx={{color:'#858585'}}/>
      </Badge>
    </IconButton>
  )
}