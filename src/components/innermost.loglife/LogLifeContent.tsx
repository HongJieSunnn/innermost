import { Grid } from "@mui/material";
import LifeRecordList from "./LifeRecordList";


export default function LogLifeContent(props:any){
    return(
        <Grid container pt={2} pl={4} pr={4} columnSpacing={1}>
            <Grid item xs={0} lg={2}>
                aaa
            </Grid>

            <Grid item xs={12} lg={8} borderLeft={1} borderRight={1} borderColor="#2B2B2B" pr={1}> {/*spacing 1 will pl 1 */}
                <LifeRecordList/>
            </Grid>

            <Grid item xs={0} lg={2}>
                aaa
            </Grid>
        </Grid>
    )
}