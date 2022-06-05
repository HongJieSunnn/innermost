export interface LifeRecord{
    recordId:number;
    title?:string;
    text:string;
    isShared:boolean;
    Location?:Location;
    MusicRecord?:MusicRecord;
    imagePaths?: string[];
    createTime:string;
    tagSummaries:TagSummary[];
}

export interface Location{
    locationUId:string;
    locationName:string;
    province:string;
    city:string;
    district:string;
    address:string;
    longitude:number;
    latitude:number;
}

export interface MusicRecord{
    musicId:string;
    musicName:string;
    singer:string;
    album:string;
}

export interface TagSummary{
    tagId:string;
    tagName:string;
    tagColor?:string;
}

export interface LifeRecordCommand{
    title?:string;
    text:string;
    isShared:boolean;
    locationUId?:string;
    locationName?:string;
    province?:string;
    city?:string;
    district?:string;
    address?:string;
    longitude?:number;
    latitude?:number;
    musicId?:string;
    musicName?:string;
    singer?:string;
    album?:string;
    imagePaths?:string[];
    createTime?:string;
    tagSummaries?:{[index:string]:string};
}

export interface RecommendedMusicRecord{
    mid:string,
    musicName:string,
    musicAlbum:string,
    musicSinger:string,
    musicCoverUrl:string,
}

export interface DailyPicture{
    title:string,
    pictureUrl:string,
    copyright:string,
    copyrightLink:string,
}