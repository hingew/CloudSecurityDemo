import fileDownload from 'js-file-download'
import React, { useEffect, useState } from 'react'
import List from '../common/list'
import ListItem from '../lists/ListItem'
import BackDoorAPI from './BackdoorAPI'

const BackdoorView = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const downloadPart = async (item) => {
    BackDoorAPI.decryptPart(item.id).then(res => {
      fileDownload(res, item.fileName.split('_aes')[0])
    }).catch(err => console.log(err))
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const res = await BackDoorAPI.getParts()
      setData(res)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className='bg-gray-200 h-screen flex overflow-hidden'>
      <div className='flex flex-col w-0 flex-1 overflow-hidden'>
        <h1 className='text-center text-lg'>Backdoor</h1>
        <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none order-last'>
          <List
            isLoading={isLoading}
            className='relative z-0 divide-y divide-gray-200'
            data={data}
            renderItem={(item) => <ListItem {...item} onClick={() => downloadPart(item)} />}
          />
        </main>
      </div>
    </div>
  )
}

export default BackdoorView
