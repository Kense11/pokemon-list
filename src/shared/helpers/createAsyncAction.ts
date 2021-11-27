import { createAction } from "@reduxjs/toolkit";

export const createAsyncAction = <Request, Response, Failure>(
    requestType: string,
    successType: string,
    failureType: string,
) => ({
    request: createAction<Request>(requestType),
    success: createAction<Response>(successType),
    failure: createAction<Failure>(failureType),
});
