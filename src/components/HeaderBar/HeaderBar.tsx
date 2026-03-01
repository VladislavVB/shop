import { Flex, Input } from 'antd'
import { useState, useEffect, type FC, useCallback } from 'react'
import debounce from 'lodash/debounce'
import { LuSearch } from 'react-icons/lu'
import { MdClear } from 'react-icons/md'
import style from './HeaderBar.module.css'

type Props = {
  title: string
  onSearch: (value: string) => void
  initialValue?: string
}

const HeaderBar: FC<Props> = ({ title, onSearch, initialValue = '' }) => {
  const [search, setSearch] = useState<string>(initialValue)

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value)
    }, 500),
    [onSearch, 500]
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    debouncedSearch(value)
  }

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  return (
    <Flex justify="space-between" align="center" className={style.headerBarContainer}>
      <h3 style={{ marginRight: '20%' }}>{title}</h3>
      <Input
        value={search}
        placeholder={'Найти'}
        prefix={<LuSearch color="#999" size={24} />}
        variant="filled"
        size="large"
        onChange={handleSearchChange}
        allowClear={{
          clearIcon: <MdClear color="#CACACA" size={24} />,
        }}
      />
      <div style={{ minWidth: '25%' }} />
    </Flex>
  )
}

export default HeaderBar
