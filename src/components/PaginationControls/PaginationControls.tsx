import React from 'react'
import { Button } from 'antd'
import styles from './PaginationControls.module.css'
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi'

interface PaginationControlsProps {
  currentPage: number
  pageSize: number
  total: number
  isLoading: boolean
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  pageSize,
  total,
  isLoading,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / pageSize)

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = []

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)

      if (currentPage > 3) {
        pageNumbers.push('...')
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          pageNumbers.push(i)
        }
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push('...')
      }

      if (totalPages > 1) {
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  if (total === 0) return null

  return (
    <div className={styles.paginationContainer}>
      {/* Информация о записях */}
      <div className={styles.paginationShow}>
        {'Показано '}
        <span>
          {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, total)}
        </span>
        {' из '}
        <span>{total}</span>
      </div>

      {/* Кнопки пагинации */}
      <div className={styles.paginationControll}>
        <Button
          className={styles.btn}
          onClick={handlePrevPage}
          icon={<TfiAngleLeft size={20} />}
          disabled={currentPage === 1 || isLoading}
        />

        {/* Номера страниц */}
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} style={{ padding: '0 4px' }}>
                ...
              </span>
            )
          }

          return (
            <Button
              className={`${styles.page} ${currentPage === page ? styles.pageActive : ''}`}
              key={page}
              onClick={() => onPageChange(page as number)}
              disabled={isLoading}
            >
              {page}
            </Button>
          )
        })}

        <Button
          className={styles.btn}
          shape="circle"
          onClick={handleNextPage}
          icon={<TfiAngleRight size={20} />}
          disabled={currentPage === totalPages || isLoading}
        />
      </div>
    </div>
  )
}
