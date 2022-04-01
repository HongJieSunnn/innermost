import { Link } from "@mui/material";
import InnermostLogoSVG from "../images/logos/Innermost (500 × 200 px)-Shrikhand.svg"

export function InnermostLogo(props:any){
    return(
        <Link href="../" sx={{flexGrow: props.flexGrow??0,mr: 2, display: { xs: props.xs, md: props.md }}}>
            <img src={InnermostLogoSVG} width={140}/>
        </Link>
    );
}