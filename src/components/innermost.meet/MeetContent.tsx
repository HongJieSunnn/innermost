import { Grid } from "@mui/material";
import ConfidantsBar from "./ConfidantsBar";
import SharedLifeRecordContent from "./SharedLifeRecordContent";



export default function MeetContent(props:any){
    return(
        <Grid container columnSpacing={1}>
            <Grid item xs={0} xl={2} display={{xs:'none',xl:'block'}}>
                <ConfidantsBar/>
            </Grid>

            <Grid item xs={12} xl={8} borderLeft={1} borderRight={1} borderColor="#2B2B2B" pr={1}> {/*spacing 1 will pl 1 */}
                <SharedLifeRecordContent/>
            </Grid>

            <Grid item xs={0} xl={2} display={{xs:'none',xl:'block'}}>
                aaa
            </Grid>
        </Grid>
    )
}