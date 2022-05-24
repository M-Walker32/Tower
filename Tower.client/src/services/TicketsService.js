import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class TicketsService{
  async getEventTickets(id){
    if(!id){return}
    const res = await api.get(`api/events/${id}/tickets`)
    AppState.tickets = res.data
  }
  async getMyTickets(){
    const res = await api.get('account/tickets')
    logger.log('is this the error?')
    AppState.myTickets = res.data
  }

  async deleteTicket(ticket){
    const res = await api.delete('api/tickets/'+ ticket._id )
    this.getMyTickets()
  }
  async deleteTickets(eventId){
    // const ticketsToDelete = this.getEventTickets(eventId)
  }
async createTicket(eventId, accountId){
  const accountexists = AppState.tickets.find((t => t.accountId === accountId))
  const eventexists = AppState.tickets.find(t => t.eventId === eventId)
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
    AppState.myTickets.unshift(res.data)
  }
}
}
export const ticketsService = new TicketsService()