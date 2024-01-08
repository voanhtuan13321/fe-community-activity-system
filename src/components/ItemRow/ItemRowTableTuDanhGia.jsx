import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import InputSelect from '../Input/InputSelect'
import InputNumber from '../Input/InputNumber'
import InputText from '../Input/InputText'
import InputCheckbox from '../Input/InputCheckbox'
import Button from '../Button'

import { ROLES, checkRoles2 } from '../../utils'

const loaiHoatDong = [
  { name: 'Hiến máu', value: 1, khungDiem: { min: 200, max: 300 } },
  { name: 'Dọn vệ sinh', value: 2, khungDiem: { min: 100, max: 200 } },
]

export default function ItemRowTableTuDanhGia({
  index,
  data,
  onClickDeleteItem,
}) {
  const role = useSelector(state => state.role)
  const [listLoaiHoatDong, setListLoaiHoatDong] = useState([])
  const [selected, setSelected] = useState({})
  const [rowData, setRowData] = useState({
    loaiHoatDong: 0,
    diemTuDanhGia: data.diemTuDanhGia,
    diemBanCanSuDanhGia: data.diemBanCanSuDanhGia,
    linkMinhChung: data.linkMinhChung,
  })

  const [isEdit, setShowEdit] = useState(false)

  useEffect(() => {
    fetchListLoaiHoatDong()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchListLoaiHoatDong = () => {
    setListLoaiHoatDong(loaiHoatDong)
    setSelected(getLoaiHoatDong(data.loaiHoatDong))
    setRowData({
      ...rowData,
      loaiHoatDong: getLoaiHoatDong(data.loaiHoatDong).value,
    })
  }

  const getLoaiHoatDong = loaiHD => {
    return !loaiHD
      ? loaiHoatDong[0]
      : loaiHoatDong.filter(hd => hd.value === loaiHD)[0]
  }

  const onSelectOption = selected => {
    setSelected(selected)
    setRowData({ ...rowData, loaiHoatDong: selected.value })
  }

  const onChangeValue = event => {
    const { name, value } = event.target
    let newValue = Number(value)
    setRowData({ ...rowData, [name]: newValue || value })
  }

  const onClickCancel = () => {
    setShowEdit(false)
  }

  return (
    <>
      {isEdit ? (
        <tr className='text-main'>
          <td className='border border-primary p-1 text-center'>{index + 1}</td>
          <td className='border border-primary p-1'>
            <InputSelect
              options={listLoaiHoatDong}
              value={selected}
              onChange={onSelectOption}
            />
          </td>
          <td className='border border-primary p-1 text-center'>
            {`${selected.khungDiem?.min} - ${selected.khungDiem?.max}`}
          </td>
          <td className='border border-primary p-1'>
            <InputNumber
              name='diemTuDanhGia'
              value={data.diemTuDanhGia}
              onChange={onChangeValue}
            />
          </td>
          <td className='border border-primary p-1'>
            {/* {data.diemBanCanSuDanhGia} */}
            <InputNumber
              name='diemBanCanSuDanhGia'
              value={data.diemBanCanSuDanhGia}
              onChange={onChangeValue}
            />
          </td>
          <td className='border border-primary p-1'>
            {/* {data.linkMinhChung} */}
            <InputText
              name='linkMinhChung'
              value={data.linkMinhChung}
              onChange={onChangeValue}
            />
          </td>
          {!checkRoles2([ROLES.giaoVien, ROLES.truongKhoa], [role]) && (
            <td className='border border-primary p-1 text-center flex gap-1 justify-center'>
              <Button type='' label='lưu' onClick={() => {}} />
              <Button type='outline' label='huỷ' onClick={onClickCancel} />
            </td>
          )}
          {checkRoles2([ROLES.giaoVien, ROLES.truongKhoa], [role]) && (
            <td className='border border-primary p-1 text-center'>
              <InputCheckbox />
            </td>
          )}
        </tr>
      ) : (
        <tr className='text-main'>
          <td className='border border-primary p-1 text-center'>{index + 1}</td>
          <td className='border border-primary p-1'>hoat dong</td>
          <td className='border border-primary p-1 text-center'>
            {`${selected.khungDiem?.min} - ${selected.khungDiem?.max}`}
          </td>
          <td className='border border-primary p-1'>{data.diemTuDanhGia}</td>
          <td className='border border-primary p-1'>
            {data.diemBanCanSuDanhGia}
          </td>
          <td className='border border-primary p-1'>{data.linkMinhChung}</td>
          {!checkRoles2([ROLES.giaoVien, ROLES.truongKhoa], [role]) && (
            <td className='border border-primary p-1 text-center flex gap-1'>
              <Button
                type='edit'
                label='sửa'
                onClick={() => setShowEdit(true)}
              />
              <Button
                type='delete'
                label='xoá'
                onClick={() => onClickDeleteItem(index)}
              />
            </td>
          )}
          {checkRoles2([ROLES.giaoVien, ROLES.truongKhoa], [role]) && (
            <td className='border border-primary p-1 text-center'>
              <InputCheckbox />
            </td>
          )}
        </tr>
      )}
    </>
  )
}
