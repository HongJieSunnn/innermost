import { Add, Autorenew, MoreVert } from "@mui/icons-material"
import { Button, Divider, Grid, IconButton, Typography } from "@mui/material"
import { PageHeader, Tag } from "antd"
import { IconColor, SubTitleColor, WindowsBlue } from "../../themes/InnermostColor"
import {SharedLifeRecordContentRecordCard} from "./SharedLifeRecordCard"

export default function SharedLifeRecordContent(props:any){


    return(
        <Grid>
            <SharedLifeRecordContentHeader/>
            <Divider variant="middle" sx={{ marginTop:2,borderBottomWidth: 2 }}/>
            <SharedLifeRecordContentRecordList/>
        </Grid>
    )
}

function SharedLifeRecordContentHeader(props:any){
    return(
        <PageHeader
            title={<Typography variant="h4" fontFamily={'YouYuan'}>记录分享🧩</Typography>}
            subTitle=''
            tags={[
                <Tag key='1' color="blue">😆</Tag>,
                <Tag color="orange">😉</Tag>,
                <Tag color="#123456">😗</Tag>,
                <Tag color="#556677">🙁</Tag>,
                <Tag color="#FFA5BA">🏄‍♀️</Tag>,
            ]}
            extra={[
                <Button variant="outlined" startIcon={<Autorenew/>}>随机获取</Button>
            ]}
            footer={
                <Typography variant="caption" color={SubTitleColor} fontWeight='bold' >
                    在这里，你可以发现他人对生活的感悟，我们相信总会在机缘巧合下出现一条和你 Innermost 相契合的记录
                </Typography>
            }
        />
        
    )
}

function SharedLifeRecordContentRecordList(props:any){
    return(
        <Grid item container mt={1} xs={12} spacing={1} >
            <SharedLifeRecordContentRecordCard/>
            <SharedLifeRecordContentRecordCard sharedLifeRecord={{
                sharedLifeRecordObjectId:"abc",
                userId:"abbbb",
                userName:"HongJieSun",
                userNickName:"HongJieSunnn",
                userAvatarUrl:"https://innermost-user-img-1300228246.cos.ap-nanjing.myqcloud.com/avatars/13ED0CD35270F8C5850930EB2975B12F.jpg",
                title:"无语",
                text:"二手摩托尾气臭黑痞老板的电脑老婆凯伦用量子技术弄出了分子超黑超略吧热狗破解RSA加密算法",
                locationUId:"abc",
                locationName:"南京工业大学",
                province:"江苏省",
                city:"南京市",
                district:"浦口区",
                address:"浦珠南路23号",
                longitude:32.222,
                latitude:101.22,
                musicMId:"aaaa",
                musicName:"借口",
                singer:"周杰伦",
                album:"七里香",
                imagePaths:new Array<string>(),
                likesCount:10,
                likes:[
                    {
                        likerUserId:"b",
                        likerUserName:"Yuri",
                        likerUserNickName:"Yuriii",
                        likerUserAvatarUrl:"https://img1.baidu.com/it/u=3551121392,119175192&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                        likeTime:"2021-05-03 22:22:22"
                    }
                ],
                tagSummaries:[
                    {
                        tagId:"abccc",
                        tagName:"心情:积极",
                    },
                ],
                createTime:"2021-05-03 22:22:22",
            }}/>
            <SharedLifeRecordContentRecordCard/>
            <SharedLifeRecordContentRecordCard/>
        </Grid>
    )
}