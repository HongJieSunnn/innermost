import { message } from "antd";
import axios from "axios";
import { Confidant, ConfidantRequest } from "../../../components/innermost.meet/MeetTypes";
import { guid } from "../../guidServices";

const domain="https://localhost:7032"

export async function getConfidantsAsync():Promise<Confidant[]>{
    try {
        return (await axios.get(`${domain}/api/socialcontact/confidants`)).data;
    } catch (error) {
        
    }
    return[];
}

export async function getConfidantRequestsAsync():Promise<ConfidantRequest[]>{
    try {
        return (await axios.get(`${domain}/api/socialcontact/confidant-requests-to-be-reviewed`)).data;
    } catch (error) {
        
    }
    return[];
}

interface AddConfidantRequestCommand{
    toUserId:string,
    requestMessage:string,
}

export async function addConfidantRequest(command:AddConfidantRequestCommand):Promise<string>{
    try {
        let res=await axios.post(`${domain}/api/socialcontact/add-confidant-request`,command,{
            headers:{"x-requestid":guid()}
        });

        if(res.status===200){
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
    return "发送添加好友请求失败";
}

interface SetConfidantRequestStatueCommand{
    confidantRequestId:string,
    requestUserId:string,
    confidantRequestStatue:{
        id:number,
        name:string,
    }
}

export async function setConfidantRequestStatue(command:SetConfidantRequestStatueCommand){
    try {
        let res=await axios.post(`${domain}/api/socialcontact/set-confidant-request-statue`,command,{
            headers:{"x-requestid":guid()}
        });

        if(res.status===200){
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
    return false;
}