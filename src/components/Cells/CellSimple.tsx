import React from 'react'

interface Props {
  text: string
  fontWeight?: number
}

export const CelSimple: React.FC<Props> = ({ text, fontWeight = 400 }) => {
  return (
    <p className="text-center" style={{ fontWeight: fontWeight, fontSize: '16px' }}>
      {text ? text : '-'}
    </p>
  )
}
