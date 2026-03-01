import React from 'react'
import { Spin, Progress } from 'antd'

interface LoadingIndicatorProps {
  isLoading: boolean
  description?: string
  size?: number
  fullScreen?: boolean
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  isLoading,
  description = 'Загрузка...',
  size = 30,
  fullScreen = false,
}) => {
  if (!isLoading) return null

  const indicator = <Progress type="circle" percent={100} format={() => ''} size={size} strokeColor="#1890ff" />

  if (fullScreen) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.8)',
          zIndex: 1000,
        }}
      >
        <Spin indicator={indicator} description={description} size="large" />
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
      }}
    >
      <Spin indicator={indicator} description={description} size="large" />
    </div>
  )
}
