export interface MetaData {
    currentPage : number ;
    totalPages : number ;
    pageSizes : number ;
    totalCount : number ;
}

export class PaginatedResponse<T> {
    items : T ;
    metaData : MetaData;
    

    constructor(items : T, metaData : MetaData) {
        this.items = items;
        this.metaData = metaData;
    }
}