import { useState, useCallback, useMemo, useEffect } from 'react'
import type { SortField, SortOrder } from '@/api/productsApi/products.types'

interface QueryParams {
  page: number
  limit: number
  sortBy?: SortField
  order?: 'asc' | 'desc'
  search?: string
}

interface UseTableControlsReturn {
  currentPage: number
  pageSize: number
  sortField: SortField | null
  sortOrder: SortOrder | null
  searchQuery: string
  setCurrentPage: (page: number) => void
  setPageSize: (size: number) => void
  setSorting: (field: SortField, order: SortOrder | null) => void
  setSearchQuery: (query: string) => void
  queryParams: {
    page: number
    limit: number
    sortBy?: SortField
    order?: SortOrder
    search?: string
  }
  resetToDefaults: () => void
}

const STORAGE_KEYS = {
  SORT_FIELD: 'table_sort_field',
  SORT_ORDER: 'table_sort_order',
  PAGE_SIZE: 'table_page_size',
  SEARCH_QUERY: 'table_search_query',
} as const

export const useTableControls = (initialPageSize: number = 20): UseTableControlsReturn => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PAGE_SIZE)
      return saved ? Number(saved) : initialPageSize
    } catch {
      return initialPageSize
    }
  })

  const [sortField, setSortField] = useState<SortField | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.SORT_FIELD) as SortField | null
    } catch {
      return null
    }
  })

  const [sortOrder, setSortOrder] = useState<SortOrder | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.SORT_ORDER) as SortOrder | null
    } catch {
      return null
    }
  })

  const [searchQuery, setSearchQuery] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.SEARCH_QUERY) || ''
    } catch {
      return ''
    }
  })

  useEffect(() => {
    try {
      if (sortField) {
        localStorage.setItem(STORAGE_KEYS.SORT_FIELD, sortField)
      } else {
        localStorage.removeItem(STORAGE_KEYS.SORT_FIELD)
      }
    } catch (error) {
      console.error('Failed to save sort field:', error)
    }
  }, [sortField])

  useEffect(() => {
    try {
      if (sortOrder) {
        localStorage.setItem(STORAGE_KEYS.SORT_ORDER, sortOrder)
      } else {
        localStorage.removeItem(STORAGE_KEYS.SORT_ORDER)
      }
    } catch (error) {
      console.error('Failed to save sort order:', error)
    }
  }, [sortOrder])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PAGE_SIZE, String(pageSize))
    } catch (error) {
      console.error('Failed to save page size:', error)
    }
  }, [pageSize])

  useEffect(() => {
    try {
      if (searchQuery) {
        localStorage.setItem(STORAGE_KEYS.SEARCH_QUERY, searchQuery)
      } else {
        localStorage.removeItem(STORAGE_KEYS.SEARCH_QUERY)
      }
    } catch (error) {
      console.error('Failed to save search query:', error)
    }
  }, [searchQuery])

  const setSorting = useCallback((field: SortField, order: SortOrder | null) => {
    setSortField(field)
    setSortOrder(order)
    setCurrentPage(1)
  }, [])

  const handleSetSearchQuery = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }, [])

  const handleSetPageSize = useCallback((size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }, [])

  const resetToDefaults = useCallback(() => {
    setSortField(null)
    setSortOrder(null)
    setSearchQuery('')
    setPageSize(initialPageSize)
    setCurrentPage(1)

    localStorage.removeItem(STORAGE_KEYS.SORT_FIELD)
    localStorage.removeItem(STORAGE_KEYS.SORT_ORDER)
    localStorage.removeItem(STORAGE_KEYS.SEARCH_QUERY)
    localStorage.removeItem(STORAGE_KEYS.PAGE_SIZE)
  }, [initialPageSize])

  const queryParams = useMemo(() => {
    const params: QueryParams = {
      page: currentPage,
      limit: pageSize,
    }

    if (sortField && sortOrder) {
      params.sortBy = sortField
      params.order = sortOrder
    }

    if (searchQuery) {
      params.search = searchQuery
    }

    return params
  }, [currentPage, pageSize, sortField, sortOrder, searchQuery])

  return {
    currentPage,
    pageSize,
    sortField,
    sortOrder,
    searchQuery,
    setCurrentPage,
    setPageSize: handleSetPageSize,
    setSorting,
    setSearchQuery: handleSetSearchQuery,
    queryParams,
    resetToDefaults,
  }
}
