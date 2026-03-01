export interface Product {
  id: string | number
  title: string
  category: string
  brand?: string
  sku: string
  rating: number
  price: number
  thumbnail: string
}

export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type SortField = 'price' | 'rating' | 'title' | 'brand' | 'category'
export type SortOrder = 'asc' | 'desc'

export interface ProductsQueryParams {
  page: number
  limit: number
  sortBy?: SortField
  order?: SortOrder
  search?: string
}
