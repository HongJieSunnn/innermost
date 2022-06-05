import axios from "axios"
import { ChattingRecord } from "../../../components/innermost.meet/MeetTypes"


const domain="https://localhost:7182"

export async function getChattingRecordsAsync(chattingContextId:string|undefined, page = 1, limit = 50):Promise<ChattingRecord[]>{
    if(chattingContextId===undefined){
        return [];
    }
    try {
        let res=await axios.get(`${domain}/api/chattingcontext/chatting-records?chattingContextId=${chattingContextId}&page=${page}&limit=${limit}`)
        if(res.status===200){
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
    return [];
}