import React from 'react'

interface PriceProps {
  value: number | string
  currency?: string
  className?: string
}

export const CellPrice: React.FC<PriceProps> = ({ value, currency = '', className }) => {
  const formatPrice = (price: number | string): { integer: string; fraction: string } => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price
    const roundedPrice = Math.round(numPrice * 100) / 100

    const [integer, fraction] = roundedPrice.toFixed(2).split('.')

    const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

    return {
      integer: formattedInteger,
      fraction: fraction,
    }
  }

  const { integer, fraction } = formatPrice(value)

  const baseStyle = {
    fontFamily: '"Roboto Mono", sans-serif',
    fontSize: '16px',
    fontWeight: 400,
  }

  return (
    <div className={className} style={{ textAlign: 'center' }}>
      <span style={baseStyle}>{integer}</span>
      <span style={{ ...baseStyle, color: '#999' }}>,{fraction}</span>
      {currency && ` ${currency}`}
    </div>
  )
}
