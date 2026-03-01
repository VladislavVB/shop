import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ProductsResponse, ProductsQueryParams } from './products.types'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, ProductsQueryParams>({
      query: ({ page, limit, sortBy, order, search }) => {
        const skip = (page - 1) * limit

        if (search && search.trim() !== '') {
          return `products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
        }

        let url = `products?limit=${limit}&skip=${skip}&select=title,description,category,price,rating,brand,sku,stock,thumbnail`

        if (sortBy && order) {
          url += `&sortBy=${sortBy}&order=${order}`
        }

        return url
      },
      providesTags: (result, _error, { page, sortBy, order, search }) =>
        result ? [{ type: 'Products', id: `${page}-${sortBy}-${order}-${search}` }] : ['Products'],
    }),

    searchProducts: builder.query<ProductsResponse, string>({
      query: (searchTerm) => `products/search?q=${encodeURIComponent(searchTerm)}`,
    }),
  }),
})

export const { useGetProductsQuery, useSearchProductsQuery, usePrefetch } = productsApi
