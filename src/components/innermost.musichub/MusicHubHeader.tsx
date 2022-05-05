import { Add, MoreVert } from "@mui/icons-material";
import { Button, Card, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import { PageHeader, Tabs, Tag } from "antd";
import { IconColor, SubTitleColor } from "../../themes/InnermostColor";

const { TabPane } = Tabs;

export default function MusicHubHeader(props:any){
    return(
        <PageHeader
            title={<Typography variant="h4" fontFamily={'YouYuan'}>音乐中心🎧</Typography>}
            subTitle=''
            tags={[
                
            ]}
            extra={[
                
            ]}
            footer={
                <Grid>
                    <Grid item>
                        <Typography variant="caption" color={SubTitleColor} fontWeight='bold' >
                            音乐是人类最美的语言，也许某首音乐里也藏着你内心深处的东西
                        </Typography>
                    </Grid>
                    
                </Grid>
            }
        >
            {/*Header Content */}
        </PageHeader>
    )
}