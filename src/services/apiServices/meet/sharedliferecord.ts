import axios from "axios";
import { SharedLifeRecord } from "../../../components/innermost.meet/SharedLifeRecordCard";
import { initShredLifeRecord } from "../../../components/innermost.meet/SharedLifeRecordContent";
import { guid } from "../../guidServices";

const domain="https://localhost:7032"

export async function getRandomSharedLifeRecordsAsync(limit=20):Promise<SharedLifeRecord[]>{
    try {
        let res=await axios.get(`${domain}/api/sharedliferecord/record/random?limit=${limit}`);
        if(res.status===200){
            return res.data.length!==0?res.data:[initShredLifeRecord]
        }
    } catch (error) {
        
    }
    return [];
}

interface LikeSharedLifeRecordCommand{
    sharedLifeRecordObjectId:string,
}

export async function likeSharedLifeRecord(command:LikeSharedLifeRecordCommand):Promise<boolean>{
    try {
        let res=await axios.post(`${domain}/api/sharedliferecord/like`,command,{
            headers:{"x-requestid":guid()}
        })
        if(res.status===200){
            return true;
        }
    } catch (error) {
        console.log(error);
    }
    return false;
}