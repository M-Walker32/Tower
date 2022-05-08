import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowersService{
async getAllTowers(){
  const res = await api.get('api/events')
  AppState.towers = res.data
  logger.log(res.data)
}
}

export const towersService = new TowersService()