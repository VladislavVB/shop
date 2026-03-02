import React, { useState } from 'react'
import { Table, Button, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { Product } from '@/pages/ProductsPage/api/products.types'
import { useGetProductsQuery } from '@/pages/ProductsPage/api/productsApi'
import HeaderBar from '@/pages/ProductsPage/ui/HeaderBar/HeaderBar'
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons'
import { useTableControls } from '@/common/hooks/useTableControls'
import { PaginationControls } from '@/components/PaginationControls/PaginationControls'
import { LoadingIndicator } from '@/components/LoadingIndicator/LoadingIndicator'
import { CellProductImage } from '@/components/Cells/CellProductImage'
import { useNavigate } from 'react-router-dom'
import { CelRating } from '@/components/Cells/CellRating'
import { CelSimple } from '@/components/Cells/CellSimple'
import { CellPrice } from '@/components/Cells/CellPrice'
import { BiPlusCircle } from 'react-icons/bi'
import { TfiReload } from 'react-icons/tfi'
import styles from './ProductsTable.module.css'
import { ROUTES } from '@/app/router'

const ProductsTable: React.FC = () => {
  const navigate = useNavigate()

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const {
    currentPage,
    pageSize,
    sortField,
    sortOrder,
    searchQuery,
    setCurrentPage,
    setSorting,
    setSearchQuery,
    queryParams,
  } = useTableControls(20)

  const { data, error, isLoading, refetch } = useGetProductsQuery(queryParams)

  const currentPageProductsCount = data?.products?.length ?? 0

  const handleRefetch = () => {
    message.success({
      content: 'Обновленно',
    })
    refetch()
  }

  const handleRowSelect = (record: Product) => {
    setSelectedRowKeys((prev) => {
      if (prev.includes(record.id)) {
        return prev.filter((id) => id !== record.id)
      } else {
        return [...prev, record.id]
      }
    })
  }

  const handleSelectAll = () => {
    if (data?.products && data.products.length > 0) {
      if (selectedRowKeys.length === data.products.length) {
        setSelectedRowKeys([])
      } else {
        setSelectedRowKeys(data.products.map((product) => product.id))
      }
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setSelectedRowKeys([])
  }

  const handleTableChange = (_pagination: any, _filters: any, sorter: any) => {
    if (sorter.field) {
      const field = sorter.field as any
      const order = sorter.order === 'ascend' ? 'asc' : sorter.order === 'descend' ? 'desc' : null
      setSorting(field, order)
    }
    setSelectedRowKeys([])
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setSelectedRowKeys([])
  }

  const optionsColumn: ColumnsType<Product>[number] = {
    title: '',
    key: 'options',
    width: 180,
    render: () => (
      <div>
        <Button
          icon={<PlusOutlined size={24} />}
          style={{
            backgroundColor: '#242EDB',
            color: 'white',
            width: '57px',
            borderRadius: '23px',
          }}
        />

        <Button
          shape="circle"
          icon={<EllipsisOutlined size={24} />}
          style={{
            marginLeft: '30px',
            borderColor: '#b2b3ba',
            color: '#b2b3ba',
          }}
        />
      </div>
    ),
  }

  const selectionColumn: ColumnsType<Product>[number] = {
    title: (
      <div style={{ alignSelf: 'center' }}>
        <Button
          className={styles.cheackBox}
          type={
            selectedRowKeys.length === currentPageProductsCount && currentPageProductsCount > 0 ? 'primary' : 'default'
          }
          size="small"
          onClick={handleSelectAll}
          disabled={currentPageProductsCount === 0}
        />
      </div>
    ),
    key: 'selection',
    width: 40,
    render: (_: unknown, record: Product) => (
      <Button
        className={styles.cheackBox}
        type={selectedRowKeys.includes(record.id) ? 'primary' : 'default'}
        size="small"
        onClick={() => handleRowSelect(record)}
      />
    ),
  }

  const columns: ColumnsType<Product> = [
    selectionColumn,
    {
      title: 'Наименование',
      dataIndex: 'title',
      key: 'title',
      sorter: true,
      sortOrder: sortField === 'title' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : null,
      ellipsis: true,
      render: (title: string, record: Product) => (
        <CellProductImage src={record.thumbnail} alt={record.title} title={title} description={record.category} />
      ),
    },
    {
      title: 'Вендор',
      dataIndex: 'brand',
      key: 'brand',
      sorter: true,
      width: 320,
      sortOrder: sortField === 'brand' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : null,
      render: (brand: string) => <CelSimple text={brand} fontWeight={700} />,
    },
    {
      title: 'Артикул',
      dataIndex: 'sku',
      key: 'sku',
      sorter: true,
      width: 220,
      render: (sku: string) => <CelSimple text={sku} />,
    },

    {
      title: 'Оценка',
      dataIndex: 'rating',
      key: 'rating',
      sorter: true,
      width: 120,
      sortOrder: sortField === 'rating' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : null,
      render: (rating: number) => <CelRating rating={rating} />,
    },
    {
      title: 'Цена, ₽',
      dataIndex: 'price',
      key: 'price',
      sorter: true,
      sortOrder: sortField === 'price' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : null,
      align: 'right',
      render: (price: number) => <CellPrice value={price} />,
    },
    optionsColumn,
  ]

  const handleAddClick = () => {
    navigate(ROUTES.ADD_PRODUCT)
  }

  return (
    <>
      <HeaderBar title="Товары" onSearch={handleSearch} initialValue={searchQuery} />

      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <h5 className="h6">Все позиции</h5>
          <div className={styles.tableButton}>
            <Button
              onClick={handleRefetch}
              className={styles.relaod}
              type="default"
              icon={<TfiReload size={15} color="#515161" />}
            />

            <Button
              className={styles.addProduct}
              icon={<BiPlusCircle size={20} />}
              size="large"
              onClick={handleAddClick}
            >
              Добавить
            </Button>
          </div>
        </div>

        {isLoading && !data && <LoadingIndicator isLoading={true} description="Загрузка товаров..." />}

        {error && JSON.stringify(error)}

        {data && (
          <div>
            <Table
              columns={columns}
              dataSource={data.products}
              rowKey="id"
              loading={{
                spinning: isLoading && !!data,
                description: 'Загрузка...',
              }}
              pagination={false}
              onChange={handleTableChange}
              bordered
              scroll={{ x: 1500, y: 'calc(100vh - 480px)' }}
              sticky
              rowClassName={(record) => {
                return selectedRowKeys.includes(record.id) ? styles.rowSelected : ''
              }}
            />

            {data.total > 0 && (
              <PaginationControls
                currentPage={currentPage}
                pageSize={pageSize}
                total={data.total}
                isLoading={isLoading}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default ProductsTable
