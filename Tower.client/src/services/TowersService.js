import { applyStyles } from "@popperjs/core"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"
import { ticketsService } from "./TicketsService.js"

class TowersService{
async getAllTowers(){
  const res = await api.get('api/events')
  AppState.towers = res.data
  logger.log(res.data)
}
async getTower(id){
// logger.log(id)
  const res = await api.get('api/events/' + id.id)
  // logger.log(res.data)
  AppState.activeEvent = res.data
}
async createEvent(formData){
  logger.log(formData)
  const res = await api.post('api/events', formData)
  logger.log(res.data)
  return res.data
}
async cancelEvent(id){
  let tower = this.getTower(id)
  tower.isCanceled = true
  const res = await api.delete(`api/events/${id.id}`, tower)
  AppState.towers = AppState.towers
  AppState.tickets = []
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