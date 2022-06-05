import { message } from "antd";
import axios from "axios";
import { AddSynonymsToTagCommand, CreateReviewedTagCommand } from "../../../components/innermost.tag/TagSTypes";
import { guid } from "../../guidServices";

const domain:string="https://localhost:7075";

export function createReviewedTag(createReviewedTagCommand:CreateReviewedTagCommand){
    axios.post(`${domain}/api/reviewedtag/create`,createReviewedTagCommand,{
        headers:{"x-requestid":guid()}
    })
    .then((res)=>{
        if(res.status===200){
            message.success("创建成功，请等待管理员审核");
            return;
        }else if(res.status===400){
            message.success(`标签名 ${createReviewedTagCommand.preferredTagName} 已存在`);
            return;
        }
    })
    .catch((err)=>{
        console.log(err);
        message.error("抱歉，创建出错了");
    })
}

export function addSynonymsToTag(addSynonymsToTagCommand:AddSynonymsToTagCommand){
    message.error("☹️抱歉，该功能目前还未真正提供");
    // axios.post(`${domain}/api/reviewedtag/add-synonyms`,{
    //     command:addSynonymsToTagCommand,
    // },{
    //     headers:{"x-requestid":guid()}
    // })
    // .then((res)=>{
    //     if(res.status===200){
    //         message.success("创建成功，请等待管理员审核");
    //         return;
    //     }else if(res.status===400){
            
    //     }
    // })
    // .catch((err)=>{
    //     console.log(err);
    //     message.error("抱歉，创建出错了");
    // })
}