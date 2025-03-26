import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import type {UserData} from "../../types/user";

const baseQuery = fetchBaseQuery({
    baseUrl:'http://localhost:3000/'
})

const baseQueryApi = retry(baseQuery, {maxRetries: 1})
export const Api = createApi({
    reducerPath:'serverApi',
    baseQuery: baseQueryApi,
    endpoints: () => ({})
})

export const serverApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<{ data: UserData[]; totalCount: number }, {start: number, limit?:number}>({
          query: ({start, limit = 30}) => ({
            url: 'users',
            method: 'GET',
            params:{
              _start: start,
              _limit: limit
            }
          }),
          transformResponse: (data: UserData[], meta) => {
            const totalCount = Number(meta?.response?.headers.get('X-Total-Count'));
            return { data, totalCount };
          },
        }),
        getUser: builder.query<UserData, string>({
            query: (id) => ({
              url: `users/${id}`,
              method: 'GET',
            })
        }),
        editUser: builder.mutation<UserData, UserData>({
          query:(body) =>({
            url: `users/${body.id}`,
            method: 'PUT',  
            body,
          })
        })
      })
})

export const {useGetUsersQuery, useGetUserQuery, useEditUserMutation} = serverApi
export const {endpoints:{getUsers, getUser, editUser}} = serverApi