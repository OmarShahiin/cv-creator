/* eslint-disable @typescript-eslint/ban-types */
import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout, setCredentials } from '@/features/user/userSlice';
import { toast } from 'react-toastify';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const res = getState() as RootState;
    console.log('res', res)
    const token = (getState() as RootState).user.accessToken;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  let result:any = await baseQuery(args, api, extraOptions);
  if (result.error){

  if (result.error && result.error.status === 401) {
    // Token is likely expired. Attempt to refresh.
    const refreshResult = await baseQuery(
      {
        url: '/api/auth/token/refresh/', 
        method: 'POST',
        body: { refresh: (api.getState() as RootState).user.refreshToken }, 
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Successfully got new token
      const { access, refresh } = refreshResult.data as { access: string; refresh: string };

      // Store the new credentials in Redux state
      api.dispatch(setCredentials({ accessToken:access, refreshToken: refresh }));

      // Retry the original query with the new token
      result = await baseQuery(
        {
         ...args as  FetchArgs,
          headers: {
            ...((args as FetchArgs).headers || {}),
            Authorization: `Bearer ${access}`,
          },
        },
        api,
        extraOptions
      );
    } else {
      // Refresh failed, logout the user
      api.dispatch(logout());
      toast.error('Session expired. Please log in again.');
    }
  }else{
    
    const strings:any = result.error?.data?.details.reduce(
      (accumulator:string, currentValue:string) => accumulator + currentValue,
      '',
    );
    toast.error(strings);
  }
}


  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
