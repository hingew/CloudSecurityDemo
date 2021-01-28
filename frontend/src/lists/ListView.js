import React, { useState, useEffect } from 'react'
import Button from '../common/button'
import Header from '../common/header'
import List from '../common/list'
import SearchInput from './SearchInput'
import ListAPI from './ListAPI'
import ListItem from './ListItem'
import FileDownload from 'js-file-download'
import FileModal from './FileModal'

const ListView = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)

  const searchFiles = (e) => {
    e.preventDefault()
    setFilteredData(data.filter(item => item.fileName.includes(search)))
  }

  const downloadFile = (item) => {
    ListAPI.download(item.id).then(res => {
      FileDownload(res, item.fileName)
    }).catch(err => console.log(err))
  }

  const uploadFile = async (file) => {
    setOpen(false)
    setIsLoading(true)
    ListAPI.upload(file).then(async () => {
      const res = await ListAPI.getAll()
      setData(res)
      setFilteredData(res.filter(item => item.fileName.includes(search)))
      setIsLoading(false)
    })
    setIsLoading(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const res = await ListAPI.getAll()
      setData(res)
      setFilteredData(res.filter(item => item.fileName.includes(search)))
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className='flex flex-col w-0 flex-1 overflow-hidden'>
      <Header>
        <form className='w-full flex lg:ml-0' onSubmit={(e) => searchFiles(e)}>
          <SearchInput value={search} onChange={e => setSearch(e.target.value)} placeholder='Search your files...' />
          <div className='ml-6 flex items-center'>
            <Button
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900'
              type='submit'
            >
              Search
            </Button>
            <Button
              className='inline-flex items-center px-4 py-2 ml-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-900'
              type='button'
              onClick={() => setOpen(!open)}
            >
              Upload
            </Button>
          </div>
        </form>
      </Header>
      <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none order-last'>
        <List
          isLoading={isLoading}
          className='relative z-0 divide-y divide-gray-200'
          data={filteredData}
          renderItem={(item) => <ListItem {...item} onClick={() => downloadFile(item)} />}
        />
      </main>
      <FileModal
        open={open}
        close={() => setOpen(false)}
        onSubmit={files => uploadFile(files[0])}
      />
    </div>
  )
}

export default ListView
