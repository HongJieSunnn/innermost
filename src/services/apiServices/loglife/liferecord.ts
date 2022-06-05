import { message } from "antd";
import axios from "axios";
import { LifeRecord, LifeRecordCommand } from "../../../components/innermost.loglife/LifeRecordTypes";
import { guid } from "../../guidServices";

const domain:string="https://localhost:7002";

const reactAggregatorDomain="https://localhost:7139";

export async function getAllRecords():Promise<LifeRecord[]>{
    try {
        return (await axios.get(`${domain}/api/loglife/records`)).data;
    } catch (error) {
        message.error("抱歉，加载失败了");
        return[{
            recordId:-1,
            title:"你好,",
            text:"当你看到这句话，那么肯定是程序出现了一些问题了😵，请联系我@HongJieSun",
            isShared:false,
            createTime:"2202-13-32 25:61:61",
            tagSummaries:[{tagId:"err",tagName:`错误:${error}`}],
        }];
    }
}

export async function getRecordsByDateTime(year:string,findType:string,month?:string,day?:string):Promise<LifeRecord[]>{
    let url:string=`${domain}/api/loglife/records/datetime?year=${year}&findType=${findType}`;
    if(month!==undefined){
        url=`${url}&month=${month}`;
    }
    if(day!==undefined){
        url=`${url}&day=${day}`;
    }
    try {
        return (await axios.get(url)).data;
    } catch (error) {
        message.error("抱歉，加载失败了");
        return[{
            recordId:-1,
            title:"你好,",
            text:"当你看到这句话，那么肯定是程序出现了一些问题了😵，请联系我@HongJieSun",
            isShared:false,
            createTime:"2202-13-32 25:61:61",
            tagSummaries:[{tagId:"err",tagName:`错误:${error}`}],
        }];
    }
}

export async function createRecord(lifeRecord:LifeRecordCommand){
    try {
        let res=await axios.post(`${reactAggregatorDomain}/api/loglife/create`,lifeRecord);
        if(res.status===200){
            if(res.data.type!==undefined){
                return res.data;
            }
        }
    } catch (error) {
        console.log(error);
        return {type:"Error"};
    }
    return {type:"NoRecommendation"};
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