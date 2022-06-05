

export interface InnermostTag{
    id:string,
    preferredTagName:string,
    tagDetail:string,
    previousTagId?:string|null,
    ancestors?:string[]|null,
    synonyms:string[],
    relatedTagIds:string[],
    createTime:string,
}

export interface CreateReviewedTagCommand{
    preferredTagName:string,
    tagDetail:string,
    previousTagId:string|null,
    ancestors:string[]|null,
    synonyms:string[]|null,
}

export interface AddSynonymsToTagCommand{
    tagId:string,
    synonyms:string[],
}