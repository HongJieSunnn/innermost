import { message } from "antd";
import axios from "axios";
import { InnermostTag } from "../../../components/innermost.tag/TagSTypes";

const domain:string="https://localhost:7075";

export async function getFirstLevelTagsAsync():Promise<InnermostTag[]>{
    try {
        let res = await axios.get(`${domain}/api/tag/first`);
        if(res.status===200){
            return res.data;
        }
    } catch (error) {
        message.error("获取一级标签失败");
    }
    return [];
}

export async function getNextTagsAsync(tagId:string):Promise<InnermostTag[]>{
    try {
        let res = await axios.get(`${domain}/api/tag/next?tagId=${tagId}`);
        if(res.status===200){
            return res.data;
        }
    } catch (error) {
        message.error(`获取标签(Id:${tagId})的下级标签失败`);
    }
    return [];
}

export async function searchTagsByNameAsync(name:string):Promise<InnermostTag[]>{
    try {
        let res = await axios.get(`${domain}/api/tag/search/name?name=${name}`);
        if(res.status===200){
            return res.data;
        }
    } catch (error) {
        message.error(`搜索标签失败`);
    }
    return [];
}