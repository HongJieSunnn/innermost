import { Box, Container, IconButton, Menu, MenuItem, Typography,Link } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";
import { InnermostLogo } from "../InnermostLogo";
import { pages,pageUrls } from "./HomeAppBar";

export function XSAppBar(props:any){
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
      };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    return(
        
        <><Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="pagemenu-appbar"
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'flex', md: 'none' },
                }}
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
            >
                <Container>
                <MenuItem disabled onClick={handleCloseNavMenu} sx={{width:100,borderRadius:3,justifyContent:'center'}}>
                    <Typography textAlign="center">??????</Typography>
                </MenuItem>
                {pages.map((page,i) => (
                    <Link key={i} href={pageUrls[i]} underline="none">
                        <MenuItem key={page} onClick={handleCloseNavMenu} sx={{borderRadius:3,justifyContent:'center'}}>
                            <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                    </Link>
                ))}
                </Container>
                
            </Menu>
        </Box>
        <InnermostLogo flexGrow={1} xs='flex' md='none' /></>
    );
}