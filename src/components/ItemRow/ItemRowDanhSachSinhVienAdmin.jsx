import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../Button'
import InputCheckbox from '../Input/InputCheckbox'
import DialogChangePassword from '../DialogCustom/DialogChangePassword'

import {
  STATUS_USER,
  callApiDeleteUser,
  callApiUpdateClassPresident,
  callApiUpdateUserStatus,
  handleError,
} from '../../utils'
import Swal from 'sweetalert2'

export default function ItemRowDanhSachSinhVienAdmin({
  data,
  index,
  classPresidentId,
  refresh,
}) {
  const [user, setUser] = useState(data)
  const [isShowDialog, setShowDialog] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setUser(data)
  }, [data])

  const changeStatusAccountUser = async () => {
    console.log('changeStatusAccountUser')
    try {
      const dataRequest = { userId: user.id, status: revertStatus(user.status) }
      const data = await callApiUpdateUserStatus(dataRequest)
      console.log(data)
      setUser(data)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const handleDelete = async () => {
    const { isDenied } = await Swal.fire({
      title: 'Bạn có chắc muốn xoá?',
      showConfirmButton: false,
      showDenyButton: true,
      denyButtonText: 'Xoá',
      showCancelButton: true,
      cancelButtonText: 'Huỷ',
    })
    if (isDenied) {
      try {
        const data = await callApiDeleteUser(user.id)
        refresh()
      } catch (error) {
        console.error(error)
        handleError(error, navigate)
      }
    }
  }

  const revertStatus = status =>
    status === STATUS_USER.ACCOUNT_LOCKED
      ? STATUS_USER.ACCOUNT_UNLOCK
      : STATUS_USER.ACCOUNT_LOCKED

  const changeClassPresident = async () => {
    try {
      const dataRequest = { classId: user.classId, classPresidentId: user.id }
      const data = await callApiUpdateClassPresident(dataRequest)
      // console.log(data)
      refresh()
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  return (
    <tr key={index}>
      <td className='border border-primary text-center text-main'>
        {++index}
        <DialogChangePassword
          userId={user.id}
          isShowDialog={isShowDialog}
          setShowDialog={setShowDialog}
        />
      </td>
      <td className='border border-primary text-center text-main'>
        {user.studentId}
      </td>
      <td className='border border-primary px-3 text-main'>{`${user.firstName} ${user.lastName}`}</td>
      <td className='border border-primary text-center'>
        <Button type='edit' label='sửa' onClick={() => setShowDialog(true)} />
      </td>
      <td className='border border-primary text-center'>
        <Button type='delete' label='xoá' onClick={handleDelete} />
      </td>
      <td className='border border-primary'>
        <InputCheckbox
          value={user.status === STATUS_USER.ACCOUNT_LOCKED}
          onClick={changeStatusAccountUser}
          onChange={() => {}}
        />
      </td>
      <td className='border border-primary'>
        <InputCheckbox
          value={classPresidentId === user.id}
          onClick={changeClassPresident}
          onChange={() => {}}
        />
      </td>
    </tr>
  )
}
