

export interface Confidant{
    confidantUserId:string;
    confidantUserName:string;
    confidantUserNickName:string;
    confidantAvatarUrl:string;
    confidantOnline:boolean;
    confidantStatue:string;
    chattingContextId:string;
}

export interface ChattingRecord{
    chattingRecordId?:string;
    sendUserId:string;
    recordMessage:string;
    tagSummaries?:{tagId:string,tagName:string}[];
    createTime?:string;
}

export interface ConfidantRequest{
    requestId:string;
    requestUserId:string;
    requestUserName:string;
    requestUserNickName:string;
    requestUserAvatarUrl:string;
    requestMessage:string;
    confidantRequestStatue:string;
    requestTime:string;
}