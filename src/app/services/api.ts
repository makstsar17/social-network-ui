import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import Cookies from 'js-cookie';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).user.token;

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers;
    },
    credentials: "include"
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    const state = api.getState() as RootState;

    if (result.error && result.error.status === 401) {
        if (!Cookies.get("jwt-refresh") && !state.user.token) {
            return result;
        }

        const refreshResult = await baseQuery({
            url: "auth/refresh-token",
            method: "POST"
        }, api, extraOptions);

        if (refreshResult.data) {
            api.dispatch({
                type: "user/changeToken",
                payload: (refreshResult.data as any).token
            });
        
            result = await baseQuery(args, api, extraOptions);
        }
        else {
            api.dispatch({ type: "user/logout" });
        }
    }

    return result;
}

const baseQuerywithRetry = retry(baseQueryWithReauth, { maxRetries: 1 });

export const api = createApi({
    baseQuery: baseQuerywithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
    tagTypes: ["Post", "Comment"]
})