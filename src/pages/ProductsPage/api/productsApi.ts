import { baseApi } from '@/app/baseApi/baseApi'

import type { ProductsResponse, ProductsQueryParams } from './products.types'

export const productsApi = baseApi.injectEndpoints({
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
      providesTags: (result, _error, { page, sortBy, order, search }) => {
        if (result) {
          // Явно указываем тип тега
          return [{ type: 'Products' as const, id: `${page}-${sortBy}-${order}-${search}` }]
        }
        return [{ type: 'Products' as const }]
      },
    }),

    searchProducts: builder.query<ProductsResponse, string>({
      query: (searchTerm) => `products/search?q=${encodeURIComponent(searchTerm)}`,
      // Если нужно добавить теги и для searchProducts
      providesTags: ['Products'] as const,
    }),
  }),
  overrideExisting: false,
})

export const { useGetProductsQuery, useSearchProductsQuery, usePrefetch } = productsApi