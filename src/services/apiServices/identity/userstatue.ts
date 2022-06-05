import { message } from "antd";
import axios from "axios";
import { statueChineseDictionary } from "../../statueServices";


const reactAggregatorDomain="https://localhost:7139";

export async function changeUserStatue(userStatue:string){
    try {
        let res=await axios.put(`${reactAggregatorDomain}/api/statue/change-userstatue?userStatue=${userStatue}`);
        if(res.status===200){
            message.success(`状态已切换至${statueChineseDictionary[userStatue]}`);
        }
    } catch (error) {
        console.log(error);
        message.error(`状态切换失败`);
    }
}