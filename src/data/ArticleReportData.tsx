export interface ArticleReportData {
    id: number,
    reporter: string,
    process: number,//0 封禁 1 修改
    description:string,
    status: number,//0 未处理， 1 处理
    reason: number,
    ctime: string,
    article: number,
    utime: string,
}