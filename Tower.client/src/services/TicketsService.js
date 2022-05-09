import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class TicketsService{

  async getMyTickets(){
    const res = await api.get('account/tickets')
    AppState.myTickets = res.data
    logger.log(res.data)
  }

  async deleteTicket(ticket){
    logger.log(ticket._id)
    const res = await api.delete('api/tickets/'+ ticket._id )
    this.getMyTickets()
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