import React from 'react'
import style from './CellProductImage.module.css'

interface Props {
  src: string
  alt: string
  title: string
  description: string
}

export const CellProductImage: React.FC<Props> = ({ src, alt, title, description }) => {
  return (
    <div className={style.tablePrevItem}>
      <img src={src} alt={alt} className={style.tablePrevItemImg} loading="lazy" />
      <div className={style.tablePrevItemDescription}>
        <h6 title={title} className={'h6'}>
          {title}
        </h6>
        <p>{description}</p>
      </div>
    </div>
  )
}
