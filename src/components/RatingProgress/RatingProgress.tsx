import React from 'react'
import { Space, Progress } from 'antd'

interface RatingProgressProps {
  rating: number
  maxRating?: number
}

export const RatingProgress: React.FC<RatingProgressProps> = ({ rating, maxRating = 5 }) => {
  const percent = (rating / maxRating) * 100

  const getStrokeColor = (rating: number): string => {
    if (rating >= 4) return '#52c41a'
    if (rating >= 3) return '#faad14'
    return '#f5222d'
  }

  return (
    <Space>
      <Progress
        percent={percent}
        size="small"
        format={() => rating.toFixed(1)}
        strokeColor={getStrokeColor(rating)}
        style={{ width: 80 }}
      />
    </Space>
  )
}
