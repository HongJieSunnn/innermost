

export interface MusicRecord{
    mid:string;
    musicId:number;
    musicName:string;
    translatedMusicName:string;
    introduction:string|null;
    genre:string;
    language:string;
    albumCoverUrl:string;
    musicUrl:string;
    wikiUrl:string;
    lyric:string;
    singers:{mid:string;singerName:string;}[]
    album:{
        mid:string;
        albumName:string;
        albumDescriptions:string;
        albumGenre:string;
        albumLanguage:string;
        albumSingerName:string;
        albumSingerMid:string;
        albumSongCount:number;
        publishCompany:string;
        publishTime:string;
    }
    publishTime:string;
    tagSummaries:{
        tagId:string;
        tagName:string;
    }[]
}

export interface Album{
    mid:string;
    albumId:number;
    albumName:string;
    albumDescriptions:string;
    albumGenre:string;
    albumLanguage:string;
    albumSongCount:number;
    albumCoverUrl:string;
    albumSingerName:string;
    albumSingerMid:string;
    publishCompany:string;
    publishTime:string;
    albumMusicRecords:{
        mid:string;
        musicName:string;
        translatedMusicName:string|null;
        genre:string;
        language:string;
        musicUrl:string;
        albumSingers:{
            mid:string;
            singerName:string;
        }[]
    }[]
}

export interface Singer{
    mid:string;
    singerId:number;
    singerName:string;
    singerAlias:string;
    singerNationality:string;
    singerBirthplace:string;
    singerOccupation:string;
    singerBirthday:string;
    singerRepresentativeWorks:string;
    singerRegion:string;
    singerCoverUrl:string;
    singerAlbums:{
        mid:string;
        albumName:string;
        albumDescriptions:string;
        albumGenre:string;
        albumLanguage:string;
        albumCoverUrl:string;
        albumSongCount:number;
        publishCompany:string;
        publishTime:string;
    }[]
}