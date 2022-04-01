import { useState } from "react";
import { Avatar, Box, Button, Container, Divider, FormControl, Grid, InputLabel, ListItemIcon, Menu, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import MenuBackground from 'D:\\壁纸\\动漫壁纸\\其他\\wallhaven-o37kw9.jpg'
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import FaceIcon from '@mui/icons-material/Face';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';

const menuPage1=[
    ["资料",<FaceIcon/>],
    ["收藏",<FavoriteIcon/>],
];

const menuPage2=[
    ["设置",<SettingsIcon/>],
    ["登出",<LogoutIcon/>],
];

const menuWidth=320;
const menuBackgroundHeight=180;//1080÷(1920÷320)
const avatarSideLength=64;

export function UserMenu(props:any){
    const [emotionStatue, setEmotionStatue] = useState('状态');
    const [anchorElStatue, setAnchorElStatue] = useState<null | HTMLElement>(null);

    const handleOpenStatueMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElStatue(event.currentTarget);
    };
    const handleCloseStatueMenu=()=>{
        setAnchorElStatue(null);
    }
    const onStatueClick=(v:string)=>{
        setEmotionStatue(v);
    }
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
                <img src={MenuBackground} width={menuWidth} height={menuBackgroundHeight}/>
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
                    <Avatar variant="rounded" sx={{width:avatarSideLength,height:avatarSideLength}}/>
                </Grid>
                <Grid item xs={8}>
                    <Typography id="NickName" variant="h6" color='#B8B8B8' fontFamily={['Cascadia Code']} sx={{fontWeight:'bold'}}>
                        HongJieSun
                    </Typography>

                    <Typography id="UserName" sx={{color:'#5A5A5A',fontSize:4}}>
                        @HongJieSun
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
                    handleCloseStatueMenu={()=>handleCloseStatueMenu()}/>
            </Grid>

            <Divider sx={{marginTop:1,marginBottom:1}}/>

            {menuPage1.map((v,i)=>(
                <MenuItem sx={{borderRadius:3}} key={i}>
                    <ListItemIcon>
                        {v[1]}
                    </ListItemIcon>
                    {v[0]}
                </MenuItem>
            ))}

            <Divider sx={{marginTop:1,marginBottom:1}}/>

            {menuPage2.map((v,i)=>(
                <MenuItem sx={{borderRadius:3}} key={i}>
                    <ListItemIcon>
                        {v[1]}
                    </ListItemIcon>
                    {v[0]}
                </MenuItem>
            ))}
        </Menu>
    );
}

function StatueMenu(props:any){
    const statueCountEachRow=4;

    function StatueContainer(){
        const emotions=['a','b','c','d','e','f']
        const status:string[][]=[];
        (emotions as string[]).forEach((item, index) => {
            const page = Math.floor(index / statueCountEachRow);
            if (!status[page]) {
                status[page] = [];
            }
            status[page].push(item);
        });
    
        return (<Grid>{status.map((v,i)=>(
            <Container key={i} className={String(i)}>
                {v.map((bv,bi)=>(
                    <Button key={i*statueCountEachRow+bi} onClick={()=>{props.onStatueClick(bv);props.handleCloseStatueMenu();}}>{bv}<br/>{"😆"}</Button>
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