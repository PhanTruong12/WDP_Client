import axios from "axios"
import http from "../index"
import {
  apiChangeProfitPercent,
  apiGetListDistrict,
  apiGetListProvince,
  apiGetListSystemKey,
  apiGetListTab,
  apiGetProfitPercent,
  apiInsertParentKey,
} from "./urls"

const getListSystemkey = () => http.get(apiGetListSystemKey)
const getListProvince = () => axios.get(apiGetListProvince)
const getListDistrict = provineCode => axios.get(`${apiGetListProvince}/${provineCode}?depth=2`)
const getListWard = districtCode => axios.get(`${apiGetListDistrict}/${districtCode}?depth=2`)
const insertParentKey = body => http.post(apiInsertParentKey, body)
const getListTab = () => http.get(apiGetListTab)
const getProfitPercent = () => http.get(apiGetProfitPercent)
const changeProfitPercent = body => http.post(apiChangeProfitPercent, body)

const CommonService = {
  getListSystemkey,
  getListProvince,
  getListDistrict,
  getListWard,
  insertParentKey,
  getListTab,
  getProfitPercent,
  changeProfitPercent,
}

export default CommonService
