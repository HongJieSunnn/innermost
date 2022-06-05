import { message } from "antd";
import axios from "axios";
import { DailyPicture } from "../../components/innermost.loglife/LifeRecordTypes";

const reactAggregatorDomain="https://localhost:7139";

export async function getDailySentence():Promise<string>{
    try {
        return (await axios.get(`${reactAggregatorDomain}/api/daily/sentence`)).data;
    } catch (error) {
        console.log(error);
        message.error("获取每日一言失败")
    }
    return "暂时没有";
}

export async function getDailyPicture():Promise<DailyPicture|undefined>{
    try {
        let ans = await axios.get(`${reactAggregatorDomain}/api/daily/picture`);
        if(ans.status===200){
            if(ans.data!=="无"){
                return ans.data;
            }
        }
    } catch (error) {
        console.log(error);
        message.error("获取每日一图失败")
    }
}