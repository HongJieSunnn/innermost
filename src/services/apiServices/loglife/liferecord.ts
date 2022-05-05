import { message } from "antd";
import axios from "axios";
import { LifeRecord, LifeRecordCommand } from "../../../components/innermost.loglife/LifeRecordTypes";
import { guid } from "../../guidServices";

const domain:string="https://localhost:7002";

export async function getAllRecords():Promise<LifeRecord[]>{
    return await (await axios.get(`${domain}/api/loglife/records`)).data;
}

export function createRecord(lifeRecord:LifeRecordCommand){
    axios
        .post(`${domain}/api/loglife/create`,lifeRecord,{
            headers:{"x-requestid":guid()}
        })
        .then((res)=>{
            message.success("创建成功");
        })
        .catch((err)=>{
            console.log(err);
            message.error("抱歉，创建失败");
        })
}

export function setRecordShared(lifeRecord:LifeRecord){
    axios
        .put(`${domain}/api/loglife/set-shared`,{
            recordId:lifeRecord.recordId,
        },{
            headers:{"x-requestid":guid()}
        })
        .then((res)=>{
            message.success("分享成功");
            lifeRecord.isShared=true;
        })
        .catch((err)=>{
            console.log(err);
            message.error("抱歉，分享失败");
        })
}