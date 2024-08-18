import React, { useState } from 'react'
import { SearchInputProps } from '@/types/index'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const SearchInput = ({placeHolder}:SearchInputProps) => {
    const [input,setInput] = useState<string>('')
  return (
    <div className='boarder rounded-lg flex justify-between items-center'>
        <Input type='text' placeholder={placeHolder} className='boarder-none' />
        <Button variant={'ghost'} size={"icon"} >
            <Search />
            <span className='sr-only'>Search Button</span>
        </Button>
    </div>
  )
}

export default SearchInput