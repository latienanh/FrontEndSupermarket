export interface ResponseBase {
    type: string;
    title: string;
    status: number;
    message: string;
    errors: Errors;
    traceId: string;
}
export interface Errors {}
