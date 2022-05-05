import { Container, Grid, Link, Typography } from "@mui/material";
import { WindowsBlue } from "../themes/InnermostColor";

export default function NotFoundPage(props:any){
    return(
        <Grid container>
            <Container maxWidth='xs' sx={{border:2,borderColor:WindowsBlue,borderRadius:2,mt:20}}>
                <Grid item container xs={12} justifyContent='center'>
                    <Typography variant='h1'>🙁</Typography>
                </Grid>
                <Grid item container xs={12} justifyContent='center'>
                    <Typography variant='h2' textAlign='center'>404 Not Found</Typography>
                </Grid>
                <Grid item container xs={12} justifyContent='center'>
                    <Typography variant='h6' textAlign='center'>抱歉，该页面不存在或目前还未被提供</Typography>
                </Grid>
                <Grid item container xs={12} justifyContent='center'>
                    <Link href="../">返回主页</Link>
                </Grid>
            </Container>
        </Grid>
    )
}