import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class TicketsService{
  async getTickets(){
    const res = await api.get('api/tickets')
    AppState.tickets = res.data
    logger.log('tickets', res.data)
  }
async createTicket(eventId, accountId){
  const accountexists = AppState.tickets.find((t => t.accountId === accountId))
  const eventexists = AppState.tickets.find(t => t.eventId === eventId)
  // logger.log('ids:', eventId, accountId, 'params', info)
  if(accountexists && eventexists){
    Pop.toast('You can only have one ticket.')
  }
  else{
    let ticket = {}
    ticket.accountId = accountId
    ticket.eventId = eventId
    ticket.creatorId = accountId
    logger.log(ticket)
    const res = await api.post('api/tickets', ticket)
    this.getTickets()
  }
}
}
export const ticketsService = new TicketsService()