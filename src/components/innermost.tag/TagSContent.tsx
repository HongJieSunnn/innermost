import { Grid } from "@mui/material";
import { User } from "oidc-client";
import { RootStateOrAny, useSelector } from "react-redux";
import { TagSPageLocationState } from "../../pages/innermost.tag/TagSPage";
import NotSignIn from "../NotSignIn";
import {TagSFirstLevelTagContent, TagSFirstLevelTagListAccordion } from "./TagSFirstLevelTagContent";
import TagSMultiLevelTagContent from "./TagSMultiLevelTagContent";

export default function TagSContent(props:{
    locationState:TagSPageLocationState
}){
    let user:User=useSelector((state:RootStateOrAny|null)=>state.auth.user);

    return user===null?(
        <NotSignIn/>
    ):(
        <Grid container pt={2} pl={3} pr={3} columnSpacing={1}>
            <Grid item xs={12} sm={3} md={2.5} lg={1.8} borderRight={1} borderColor="#2B2B2B">
                <TagSFirstLevelTagContent locationState={props.locationState}/>
                <TagSFirstLevelTagListAccordion locationState={props.locationState}/>
            </Grid>

            <Grid item xs={12} sm={9} md={9.5} lg={10.2} pr={1} height=''> {/*spacing 1 will pl 1 */}
                <TagSMultiLevelTagContent locationState={props.locationState}/>
            </Grid>
        </Grid>
    )
}