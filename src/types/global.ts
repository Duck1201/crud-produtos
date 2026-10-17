export interface HttpRequest {
    statusCode: number;
    body: any;
}

export enum PaginationDefault {
    limit = 40,
    page = 1,
}
