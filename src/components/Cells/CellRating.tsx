import React from 'react'

interface Props {
  rating: number
}

export const CelRating: React.FC<Props> = ({ rating }) => {
  const baseStyle: React.CSSProperties = {
    fontFamily: '"Roboto Mono", sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    textAlign: 'center',
    letterSpacing: -2.5
  }

  return (
    <div style={baseStyle}>
      <span style={{ color: rating < 3 ? 'red' : 'inherit' }}>{rating.toFixed(1)}</span>/5
    </div>
  )
}
