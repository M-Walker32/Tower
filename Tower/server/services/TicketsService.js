import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { eventsService } from "./EventsService.js"

class TicketsService {
  async getAll() {
    return await dbContext.Tickets.find({}).populate('creator').populate('event')
  }

  // TODO this is get tickets by account, it's not working, I don't think I wrote the controller command
  async getTicketsByAccountId(accountId) {
    return await dbContext.Tickets.find({ accountId }).populate('event')
  }
  async getById(id) {
    const ticket = await dbContext.Tickets.findById(id).populate('creator').populate('event')
    if(!ticket){
      throw new BadRequest('Invalid Id')
    }
    return ticket
  }
  async getTicketsByEvent(eventId) {
    const tickets = await dbContext.Tickets.find({eventId: eventId}).populate('account').populate('event')
    if(!tickets){
      throw new BadRequest('There are no active tickets for this show')
    }
    return(tickets)
  }

  async create(ticket) {
    const exists = await dbContext.Tickets.findOne({ accountId: ticket.accountId, eventId: ticket.eventId }).populate('account')
    if (exists) {
      throw new Forbidden('You can only have one ticket to an event')
    }
    const newTicket = await dbContext.Tickets.create(ticket)
    await newTicket.populate('creator')
    await newTicket.populate('event')
    await newTicket.populate('account')
    await eventsService.modifyEventCapacity(ticket.eventId)
    return newTicket
  }

  async remove(id, userid) {
    const ticket = await this.getById(id)
    if(ticket.creatorId.toString() !== userid){
      throw new Forbidden('This is not your ticket')
    }
    await eventsService.modifyEventCapacity2(ticket.eventId)
    await ticket.remove()
  }
}

export const ticketsService = new TicketsService()
