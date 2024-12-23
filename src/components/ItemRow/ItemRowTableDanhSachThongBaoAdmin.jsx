import React, { useState } from 'react'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

import Button from '../Button'
import InputText from '../Input/InputText'

import {
  caculateIndex,
  callApiDeleteAnnouncement,
  callApiUpdateAnnouncement,
  handleError,
} from '../../utils'

export default function ItemRowTableDanhSachThongBaoAdmin({
  index,
  data,
  refresh,
  objectAnnouncements,
}) {
  const [dataEdit, setDataEdit] = useState(data)
  const [isShowEdit, setShowEdit] = useState(false)
  const navigate = useNavigate()

  const onClickHuy = () => {
    setShowEdit(false)
    setDataEdit(data)
  }

  const onClickLuu = async () => {
    try {
      const data = await callApiUpdateAnnouncement(dataEdit)
      toast.success('Cập nhật thành công')
      setShowEdit(false)
      refresh()
    } catch (e) {
      console.error(e)
      handleError(e, navigate)
    }
  }

  const onClickXoa = async id => {
    const { isDenied } = await Swal.fire({
      title: 'Bạn có chắc muốn xoá?',
      showCancelButton: true,
      cancelButtonText: 'Huỷ',
      showDenyButton: true,
      denyButtonText: 'Xoá',
      showConfirmButton: false,
    })

    if (isDenied) {
      try {
        const data = await callApiDeleteAnnouncement(id)
        toast.success('Xoá thành công')
        setShowEdit(false)
        refresh()
      } catch (e) {
        alert(e.message)
      }
    }
  }

  const onChangeInput = event => {
    const { name, value } = event.target
    setDataEdit({ ...dataEdit, [name]: value })
  }

  return (
    <>
      {isShowEdit ? (
        <tr>
          <td className='border border-primary text-center text-main'>
            {caculateIndex(objectAnnouncements, index)}
          </td>
          <td className='border border-primary text-center text-main'>
            <InputText
              name='title'
              value={dataEdit.title}
              onChange={onChangeInput}
            />
          </td>
          <td className='border border-primary text-main'>
            {format(new Date(data.createdAt), 'dd/MM/yyyy')}
          </td>
          <td className='border border-primary text-center text-main'>
            <InputText
              name='content'
              value={dataEdit.content}
              onChange={onChangeInput}
            />
          </td>
          <td className='border border-primary'>
            <div className='flex justify-center gap-3'>
              <Button label='lưu' onClick={onClickLuu} />
              <Button type='outline' label='huỷ' onClick={onClickHuy} />
            </div>
          </td>
        </tr>
      ) : (
        <tr>
          <td className='border border-primary text-center text-main p-2'>
            {caculateIndex(objectAnnouncements, index)}
          </td>
          <td className='border border-primary text-main p-2'>{data.title}</td>
          <td className='border border-primary text-main p-2'>
            {format(new Date(data.createdAt), 'dd/MM/yyyy')}
          </td>
          <td className='border border-primary text-main p-2'>
            {data.content}
          </td>
          <td className='border border-primary text-main px-1'>
            <div className='flex justify-center gap-1'>
              <Button
                type='edit'
                label='sửa'
                onClick={() => setShowEdit(true)}
              />
              <Button
                type='delete'
                label='xoá'
                onClick={() => onClickXoa(data.id)}
              />
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
