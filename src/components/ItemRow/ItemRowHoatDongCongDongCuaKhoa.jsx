import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { callApiGetClassById, handleError } from '../../utils'

export default function ItemRowHoatDongCongDongCuaKhoa({ index, data }) {
  const [className, setClassName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchClassName(data.classId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const fetchClassName = async classId => {
    try {
      const { name } = await callApiGetClassById(classId)
      setClassName(name)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  return (
    <tr>
      <td className='border border-primary text-main p-1 text-center'>
        {index + 1}
      </td>
      <td className='border border-primary text-main p-1 text-center'>
        {data.studentId}
      </td>
      <td className='border border-primary text-main p-1 '>{`${data.firstName} ${data.lastName}`}</td>
      <td className='border border-primary text-main p-1 text-center'>
        {className}
      </td>
      <td className='border border-primary text-main p-1 text-center'>
        {data.sumScoreHeadTeacherConfirmed > 0
          ? data.sumScoreHeadTeacherConfirmed
          : data.sumScoreMajorHeadConfirmed}
      </td>
      <td className='border border-primary text-main p-1 text-center'>
        {data.sumScoreMajorHeadConfirmed > 0 && (
          <span className='font-bold text-main text-green-500 my-2'>
            Đã xác nhận
          </span>
        )}
      </td>
    </tr>
  )
}
