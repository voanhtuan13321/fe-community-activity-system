import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Title from '../components/Title'
import InputSelect from '../components/Input/InputSelect'
import Button from '../components/Button'
import Table from '../components/Table'
import ItemRowDanhSachLop from '../components/ItemRow/ItemRowDanhSachLopAdmin'
import ItemRowDanhSachLopAdd from '../components/ItemRow/ItemRowDanhSachLopAdminAdd'
import Pagination from '../components/Pagination'
import ItemRowNoData from '../components/ItemRow/ItemRowNoData'

import {
  ROLES,
  callApiGetClassesPaginationList,
  callApiGetMajorsList,
  checkAndHandleLogin,
  checkPermissionToAccessThePage,
  generateAcademyYearOptions,
  getUserRole,
  handleError,
} from '../utils'

const HEADER_TABLE = [
  { className: 'w-5%', title: 'stt' },
  { className: 'w-20%', title: 'Khoa quản lý' },
  { className: 'w-10%', title: 'Lớp' },
  { className: 'w-10%', title: 'Giáo viên chủ nhiệm' },
  { className: 'w-10%', title: 'khóa' },
  { className: 'w-20%', title: '' },
]

export default function AdminDanhSachLop() {
  const academyYearOptions = generateAcademyYearOptions()

  const [objectClasses, setObjectClasses] = useState({})
  const [majorOptions, setMajorOptions] = useState([])
  const [selectedMajor, setSelectedMajor] = useState({})
  const [selectedAcademyYear, setSelectedAcademyYear] = useState(
    academyYearOptions[0],
  )
  const [isAddNew, setIsAddNew] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    checkAndHandleLogin(navigate)
    checkPermissionToAccessThePage(getUserRole(), [ROLES.ADMIN], navigate)
    fetchMajors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchClasses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAcademyYear, selectedMajor])

  const fetchClasses = async (page = 0) => {
    try {
      const data = await callApiGetClassesPaginationList(
        9999,
        page,
        selectedAcademyYear.value,
        selectedMajor.value,
      )
      setObjectClasses(data)
      // console.log(data)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const fetchMajors = async () => {
    try {
      const data = await callApiGetMajorsList()
      const result = data.map(item => ({
        ...item,
        value: item.id,
      }))
      // console.log(data)
      setMajorOptions(result)
      setSelectedMajor(result[0])
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const renderBodyTable = () => {
    let arrJsx =
      objectClasses.data?.length === 0
        ? [<ItemRowNoData key={-1} colSpan={6} />]
        : objectClasses.data?.map((dt, index) => (
            <ItemRowDanhSachLop
              key={index}
              dt={dt}
              index={index}
              refresh={fetchClasses}
              objectClasses={objectClasses}
            />
          ))
    isAddNew &&
      (arrJsx = [
        ...arrJsx,
        <ItemRowDanhSachLopAdd
          key={-2}
          setIsAddNew={setIsAddNew}
          majorId={selectedMajor.id}
          academicYear={selectedAcademyYear.value}
          refresh={fetchClasses}
        />,
      ])
    return arrJsx
  }

  return (
    <div className='container mx-auto py-2'>
      <Title title='danh sách lớp' />
      <div className='mt-3'>
        <div className='flex items-center justify-between gap-2'>
          <div className='flex items-center gap-2'>
            <span className='font-bold text-primary text-main'>
              Thuộc khoa:
            </span>
            <div className='w-48'>
              <InputSelect
                options={majorOptions}
                value={selectedMajor}
                onChange={setSelectedMajor}
              />
            </div>
            <span className='font-bold text-primary text-main'>Khoá:</span>
            <div className='w-48'>
              <InputSelect
                options={academyYearOptions}
                value={selectedAcademyYear}
                onChange={setSelectedAcademyYear}
              />
            </div>
          </div>
          {!isAddNew && (
            <div className=''>
              <Button
                label='thêm'
                type='add'
                onClick={() => setIsAddNew(true)}
              />
            </div>
          )}
        </div>
      </div>
      <div className='my-2 pb-[88px]'>
        <Table header={HEADER_TABLE}>{renderBodyTable()}</Table>
      </div>
      {objectClasses.totalPages > 1 && (
        <Pagination
          totalItems={objectClasses.totalItems}
          totalPages={objectClasses.totalPages}
          itemPerPage={objectClasses.itemPerPage}
          currentPage={objectClasses.currentPage}
          isNextPage={objectClasses.isNextPage}
          isPreviousPage={objectClasses.isPreviousPage}
          onPageChange={fetchClasses}
        />
      )}
    </div>
  )
}
