export class StorageService {
  private static instance: StorageService

  private constructor() {}

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService()
    }
    return StorageService.instance
  }

  getItem<T>(key: string, defaultValue: T | null = null): T | null {
    try {
      const item = localStorage.getItem(key)
      if (item === null) return defaultValue
      try {
        return JSON.parse(item) as T
      } catch {
        return item as unknown as T
      }
    } catch (error) {
      console.error(`Error reading from localStorage (key: ${key}):`, error)
      return defaultValue
    }
  }

  setItem(key: string, value: any): void {
    try {
      const valueToStore = typeof value === 'string' ? value : JSON.stringify(value)
      localStorage.setItem(key, valueToStore)
    } catch (error) {
      console.error(`Error writing to localStorage (key: ${key}):`, error)
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing from localStorage (key: ${key}):`, error)
    }
  }

  clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }
}

export const STORAGE_KEYS = {
  SORT_FIELD: 'table_sort_field',
  SORT_ORDER: 'table_sort_order',
  PAGE_SIZE: 'table_page_size',
  CURRENT_PAGE: 'table_current_page',
} as const
