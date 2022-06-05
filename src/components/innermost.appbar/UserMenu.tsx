import { useEffect, useState } from "react";
import { Avatar, Box, Button, Container, Divider, FormControl, Grid, InputLabel, ListItemIcon, Menu, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import MenuBackground from 'D:\\壁纸\\动漫壁纸\\其他\\wallhaven-o37kw9.jpg'
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import FaceIcon from '@mui/icons-material/Face';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { User } from "oidc-client";
import { statueChineseDictionary, statueEmojiDictionary } from "../../services/statueServices";
import userManager, { signoutRedirect } from "../../services/authServices";
import { message } from "antd";
import { changeUserStatue } from "../../services/apiServices/identity/userstatue";

const menuWidth=320;
const menuBackgroundHeight=180;//1080÷(1920÷320)
const avatarSideLength=64;

export function UserMenu(props:{
    anchorElUser:HTMLElement | null,
    handleCloseUserMenu:()=>void,
    user:User
}){
    const logout=async()=>{
        try {
            await signoutRedirect(props.user.id_token);
        } catch (error) {
            message.error("登出失败");
        }
    }

    const [emotionStatue, setEmotionStatue] = useState(`状态`);
    const [anchorElStatue, setAnchorElStatue] = useState<null | HTMLElement>(null);

    const handleOpenStatueMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElStatue(event.currentTarget);
    };
    const handleCloseStatueMenu=()=>{
        setAnchorElStatue(null);
    }
    const onStatueClick=async(statueKey:string)=>{
        await changeUserStatue(statueKey);
        setEmotionStatue(`${statueEmojiDictionary[statueKey]} ${statueChineseDictionary[statueKey]}`);
        props.user!.profile.user_statue=statueKey;
        userManager.storeUser(props.user);
    }

    useEffect(() => {
      setEmotionStatue(`${statueEmojiDictionary[props.user?.profile.user_statue]} ${statueChineseDictionary[props.user?.profile.user_statue]}`)

    }, [props.user])
    
    return(
        <Menu
            id="menu-appbar"
            anchorEl={props.anchorElUser}
            open={Boolean(props.anchorElUser)}
            onClose={props.handleCloseUserMenu}
            PaperProps={{
                elevation: 0,
                sx: {
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  '& .MuiList-root': {
                    paddingTop:0
                  },
                  '&:before': {
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                  borderRadius:3,
                  bgcolor:'#161616'
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            {/* Background in UserMenu.Grid's height is 50 but img's height is 90.So There will be 40 overlapping with other components. */}
            <Grid sx={{
                width:menuWidth,
                height:142,
            }}>
                <img src={props.user?.profile.backgroundimg} width={menuWidth} height={menuBackgroundHeight}/>
            </Grid>

            <Grid 
                container 
                sx={{
                    width:menuWidth,
                    paddingLeft:2,
                    paddingRight:2,
                    paddingTop:1,
                    paddingBottom:2,
            }}>
                
                <Grid item xs>
                    <Avatar src={props.user?.profile.avatarimg} variant="rounded" sx={{width:avatarSideLength,height:avatarSideLength}}/>
                </Grid>
                <Grid item xs={8}>
                    <Typography id="NickName" variant="h6" color='#B8B8B8' fontFamily={['Cascadia Code']} sx={{fontWeight:'bold'}}>
                        {props.user?.profile.nickname}
                    </Typography>

                    <Typography id="UserName" sx={{color:'#5A5A5A',fontSize:4}}>
                        @ {props.user?.profile.name}
                    </Typography>
                </Grid>

                <Button
                    id="StatueButton"
                    variant="outlined"
                    fullWidth
                    sx={{marginTop:1}}
                    onClick={handleOpenStatueMenu}
                >
                    {emotionStatue}
                </Button>

                <StatueMenu 
                    value={emotionStatue} 
                    onStatueClick={onStatueClick} 
                    anchorElStatue={anchorElStatue}
                    handleCloseStatueMenu={()=>handleCloseStatueMenu()}
                />
            </Grid>

            <Divider sx={{marginTop:1,marginBottom:1}}/>

            <MenuItem sx={{borderRadius:3}} onClick={()=>{
                logout();
            }}>
                <LogoutIcon sx={{mr:2}}/>
                登出
            </MenuItem>
        </Menu>
    );
}

function StatueMenu(props:any){
    const statueCountEachRow=4;

    function StatueContainer(){
        //we use that to make container with statueCountEachRow statues in one row.
        const status:string[][]=[];
        const statueKeys:string[][]=[];//to store statueKeys to get emoji and send to service.
        (Object.values(statueChineseDictionary) as string[]).forEach((item, index) => {
            const page = Math.floor(index / statueCountEachRow);
            if (!status[page]) {
                status[page] = [];
            }
            status[page].push(item);
        });
        (Object.keys(statueChineseDictionary) as string[]).forEach((item, index) => {
            const page = Math.floor(index / statueCountEachRow);
            if (!statueKeys[page]) {
                statueKeys[page] = [];
            }
            statueKeys[page].push(item);
        });

        return (<Grid>{status.map((v,i)=>(
            <Container key={i} className={String(i)}>
                {v.map((bv,bi)=>(
                    <Button 
                        key={i*statueCountEachRow+bi} 
                        onClick={()=>{
                            props.onStatueClick(statueKeys[i][bi]);
                            props.handleCloseStatueMenu();
                        }}
                    >
                        {bv}
                        <br/>
                        {statueEmojiDictionary[statueKeys[i][bi]]}
                    </Button>
                ))}
            </Container>
        ))}</Grid>)
    }

    return(
        <Menu
        id="menu-statue"
        anchorEl={props.anchorElStatue}
        open={Boolean(props.anchorElStatue)}
        onClose={props.handleCloseStatueMenu}
        PaperProps={{
            elevation: 1,
            sx: {
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                '&:before': {
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                },
                borderRadius:3
            },
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
            <StatueContainer/>
        </Menu>
    );
}