import { Add, MoreVert, Search,Create } from "@mui/icons-material";
import { Button, Grid, IconButton, InputBase, Paper, Typography } from "@mui/material";
import { PageHeader, Tag } from "antd";
import { useState } from "react";
import { IconColor, SubTitleColor } from "../../themes/InnermostColor";
import TagSAddSynonymMenu from "./TagSAddSynonymMenu";
import TagSCreateTagFormDrawer from "./TagSCreateTagFormMenu";




export default function TagSHeader(props:any){
    const [anchorElCreateTag, setAnchorElCreateTag] = useState<null | HTMLElement>(null);
    const [anchorElAddSynonym, setAnchorElAddSynonym] = useState<null | HTMLElement>(null);

    const handleOpenCreateTagMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElCreateTag(event.currentTarget);
    };
    const handleCloseCreateTagMenu = () => {
        setAnchorElCreateTag(null);
    };

    const handleOpenAddSynonymMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElAddSynonym(event.currentTarget);
    };
    const handleCloseAddSynonymMenu = () => {
        setAnchorElAddSynonym(null);
    };

    return(
        <PageHeader
            title={<Typography variant="h4" fontFamily={'YouYuan'}>标签中心🏷️</Typography>}
            subTitle=''
            tags={[
                
            ]}
            extra={[
                <Button disabled={props.createButtonDisabled} variant="outlined" startIcon={<Create/>} sx={{textTransform:'none'}} onClick={handleOpenCreateTagMenu}>
                    创建子标签
                </Button>,
                <Button disabled={props.createButtonDisabled} variant="outlined" color='info' startIcon={<Add/>} sx={{textTransform:'none'}} onClick={handleOpenAddSynonymMenu}>
                    添加同义词
                </Button>,
            ]}
            footer={
                <Grid container alignItems='center'>
                    <Grid item xs>
                        <Typography variant="caption" color={SubTitleColor} fontWeight='bold' >
                            多样的思绪，多样的标签
                        </Typography>
                    </Grid>
                    <Grid item container justifyContent='right' xs>
                        <TagSHeaderTagSearchBar/>
                    </Grid>
                </Grid>
            }
        >
            <TagSCreateTagFormDrawer anchorEl={anchorElCreateTag} handleCloseMenu={handleCloseCreateTagMenu} />
            <TagSAddSynonymMenu anchorEl={anchorElAddSynonym} handleCloseMenu={handleCloseAddSynonymMenu}/>
        </PageHeader>
    )
}

function TagSHeaderTagSearchBar(props:any){
    return(
        <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
        >                
            <InputBase
                autoFocus
                sx={{ ml: 1, flex: 1 }}
                placeholder={"搜索标签"}
                inputRef={props.focusRef}
            />
            <IconButton sx={{ p: '10px' }} aria-label="search">
                <Search/>
            </IconButton>
        </Paper>
    )
}