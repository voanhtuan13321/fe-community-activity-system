import { requestHandler } from '../requestHandler'

// major
const baseApiMajor = 'api/Major'

export const callApiGetMajorsList = async () => {
  const url = `${baseApiMajor}/GetMajorsList`
  const config = { params: { time: new Date().getTime() } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiGetMajorsPaginationList = async (ItemPerPage, Page) => {
  const url = `api/Major/GetMajorsPaginationList`
  const config = { params: { ItemPerPage, Page, time: new Date().getTime() } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiGetMajorsListByMajorHeadId = async majorHeadId => {
  const url = `api/Major/GetMajorsListByMajorHeadId`
  const config = { params: { majorHeadId, time: new Date().getTime() } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiUpdateMajor = async dataEdit => {
  const url = `api/Major/UpdateMajor`
  const repsonse = await requestHandler.put(url, dataEdit)
  return await repsonse.data
}

export const callApiDeleteMajor = async majorId => {
  const url = `api/Major/DeleteMajor`
  const config = { params: { majorId } }
  const repsonse = await requestHandler.delete(url, config)
  return await repsonse.data
}