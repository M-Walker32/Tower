import { applyStyles } from "@popperjs/core"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowersService{
async getAllTowers(){
  const res = await api.get('api/events')
  AppState.towers = res.data
  logger.log(res.data)
}
async createEvent(formData){
  logger.log(formData)
  const res = await api.post('api/events', formData)
  logger.log(res.data)
  return res.data
}
async changePage(page){
  const res = await api.get('api/events/', page)
  // logger.log(res.dat)
  AppState.towers = res.data
  // AppState.searchResults = res.data
  AppState.currentPage = page
}
}

export const towersService = new TowersService()