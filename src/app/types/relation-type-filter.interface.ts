export interface RelationType {
  // type:any,
  name?: string;
  fields?: object;
  where?: {
    $a?: {
      neq?: object;
    };
  };
  relations?: RelationType[];
}
