import { message } from "antd";
import axios from "axios";
import { SharedLifeRecord } from "../../../components/innermost.meet/SharedLifeRecordCard";

const domain:string="https://localhost:7032";

export async function getSharedLifeRecordsByMusicRecord(mid:string,page=1,limit=20,sortBy="LikesCount"):Promise<SharedLifeRecord[]>{
    let res=await axios.get(`${domain}/api/sharedliferecord/record/music-record?mid=${mid}&page=${page}&limit=${limit}&sortBy=${sortBy}`);
    
    if(res.status===200){
        return res.data;
    }
    return [];
}