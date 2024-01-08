import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import DialogCustom from '.'
import Button from '../Button'

import {
  ROLES,
  callApiGetUserCommunityActivities,
  checkIsCurrentYear,
  checkRoles2,
  generateAcademyYearOptions,
  getUserId,
  handleError,
} from '../../utils'
import { useSelector } from 'react-redux'
import queryString from 'query-string'
import ItemRowNoData from '../ItemRow/ItemRowNoData'
import ItemRowTableDetailHoatDong from '../ItemRow/ItemRowTableDetailHoatDong'
import Table from '../Table'

export default function DialogDetailCommunityActivityStudent({
  userId,
  isShowDialog,
  setShowDialog,
}) {
  const role = useSelector(state => state.role)
  const academyYearOptions = generateAcademyYearOptions()

  const [communityActivities, setCommunityActivities] = useState([])
  const [selectedAcademyYear, setSelectedAcademyYear] = useState(
    academyYearOptions[0],
  )
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const { studentId } = queryString.parse(location.search)
    console.log('param', studentId)
    fetchCommunityActivities(studentId)
  }, [])

  const fetchCommunityActivities = async () => {
    if (!userId) return

    try {
      const data = await callApiGetUserCommunityActivities(
        userId,
        selectedAcademyYear.value,
      )
      // console.log(data)
      setCommunityActivities(data)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const onClickXacNhanThamGia = () => {
    alert('Xac Nhan tham gia')
  }

  const genHeaderByRole = () => {
    const header = [
      { className: 'w-5%', title: 'stt' },
      { className: 'w-10%', title: 'loại hoạt động' },
      { className: 'w-20%', title: 'tên hoạt động' },
      { className: 'w-5%', title: 'khung điểm' },
      { className: 'w-5%', title: 'điểm tự đánh giá' },
      { className: 'w-5%', title: 'điểm ban cán sự đánh giá' },
      { className: '', title: 'link minh chứng' },
    ]
    if (checkRoles2([ROLES.giaoVien, ROLES.truongKhoa], [role])) {
      return [...header, { className: 'w-5%', title: 'xác nhận' }]
    }
    return [...header, { className: 'w-5%', title: '' }]
  }

  const renderBodyTable = () => {
    return communityActivities.length === 0
      ? [<ItemRowNoData key={-1} colSpan={10} />]
      : communityActivities.map((data, index) => (
          <ItemRowTableDetailHoatDong
            key={index}
            index={index}
            data={data}
            refresh={fetchCommunityActivities}
            academyYear={selectedAcademyYear.value}
          />
        ))
  }
  return (
    <DialogCustom isOpen={isShowDialog} title='chi tiết hoạt động'>
      <div className='mx-auto w-[1600px]'>
        <div>
          <div className='my-2'>
            <Table header={genHeaderByRole()}>{renderBodyTable()}</Table>
          </div>
        </div>
        <div className='col-span-2 mt-4 flex justify-end gap-2'>
          <Button
            label='Huỷ'
            type='outline'
            onClick={() => setShowDialog(false)}
          />
        </div>
      </div>
    </DialogCustom>
  )
}