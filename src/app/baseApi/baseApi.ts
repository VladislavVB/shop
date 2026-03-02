import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '@/common/constants'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Products', 'Auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      return headers
    },
  }),
  endpoints: () => ({}),
})
