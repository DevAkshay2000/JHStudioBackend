export interface RelationType {
    // type:any,
    name?: string;
    fields?: object;
    where?: object;
    relations?: RelationType[];
}