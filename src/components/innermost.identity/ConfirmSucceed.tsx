import { Grid, Link, Paper, Typography } from "@mui/material";

export default function ConfirmSucceed(props:any){
    return(
        <Grid container justifyContent='center' sx={{mt: 20}}>
            <Paper sx={{width:300,borderRadius:2}}>
                <Grid item container justifyContent='center' alignItems='center'>
                    <Typography variant="h1">
                        🎉
                    </Typography>
                </Grid>
                
                <Grid item container justifyContent='center' alignItems='center'>
                    <Typography sx={{  mb: 10 }}>
                        邮箱验证成功
                    </Typography>
                </Grid>
                
                <Grid item container justifyContent='center' alignItems='center'>
                    <Link href='/'>返回主页</Link>
                </Grid>
            </Paper>
        </Grid>
    )
}