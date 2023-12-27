import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { requestHandler } from '../utils'
import { format } from 'date-fns'
import Pagination from '../components/Pagination'

export default function Home() {
  const [listThongBao, setListThongBao] = useState({})

  useEffect(() => {
    getList(0)
  }, [])

  const getList = async page => {
    try {
      const response = await requestHandler.get(
        `/api/Announcement/GetAnnouncementsPaginationList?ItemPerPage=5&Page=${page}`,
      )
      const data = response.data
      setListThongBao(data)
    } catch (error) {
      console.error(error)
    }
  }

  const renderBody = () => {
    let arrJsx = listThongBao?.data?.map((dt, index) => {
      return (
        <div
          key={index}
          className='flex flex-col text-main border-b-2 px-3 pb-2 my-4 gap-2'
        >
          <div className='flex flex-row gap-8'>
            <p className='text-red-text font-bold'>
              {format(new Date(dt.createdAt), 'dd/MM/yyyy')}
            </p>
            <p className='text-primary font-bold'>{dt.title}</p>
          </div>

          <p className=''>{dt.content}</p>
        </div>
      )
    })
    return arrJsx
  }

  return (
    <>
      <div className='container mx-auto'>
        <Title title='Thông báo' />
        {renderBody()}
      </div>
      <Pagination
        totalItems={listThongBao.totalItems}
        totalPages={listThongBao.totalPages}
        itemPerPage={listThongBao.itemPerPage}
        currentPage={listThongBao.currentPage}
        isNextPage={listThongBao.isNextPage}
        isPreviousPage={listThongBao.isPreviousPage}
        onPageChange={getList}
      />
    </>
  )
}
