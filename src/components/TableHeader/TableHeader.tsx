import React from 'react'
import { Button, Space } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

interface TableHeaderProps {
  title: string
  isFetching: boolean
  isLoading: boolean
  onRefresh: () => void
  extra?: React.ReactNode
}

export const TableHeader: React.FC<TableHeaderProps> = ({ title, isFetching, isLoading, onRefresh, extra }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <h1 style={{ margin: 0 }}>{title}</h1>
        {isFetching && !isLoading && <span style={{ color: '#1890ff' }}>Обновление...</span>}
      </div>

      <Space>
        {extra}
        <Button icon={<ReloadOutlined />} onClick={onRefresh} loading={isFetching}>
          Обновить
        </Button>
      </Space>
    </div>
  )
}
