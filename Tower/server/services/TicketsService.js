import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { eventsService } from "./EventsService.js"

class TicketsService {
  async getAll() {
    return await dbContext.Tickets.find({}).populate('creator').populate('account').populate('event')
  }
  async getTicketsByAccountId(accountId) {
    return await dbContext.Tickets.find({ accountId }).populate('creator').populate('account').populate('event')
  }

  async getById(id) {
    const ticket = await dbContext.Tickets.findById(id).populate('creator').populate('account').populate('event')
    if(!ticket){
      throw new BadRequest('Invalid Id')
    }
    return ticket
  }
  async getTicketsByEvent(eventId) {
    const tickets = await dbContext.Tickets.find({eventId: eventId}).populate('creator').populate('account').populate('event')
    if(!tickets){
      throw new BadRequest('There are no active tickets for this show')
    }
    return(tickets)
  }

  async create(ticket) {
    const exists = await dbContext.Tickets.find({ accountId: ticket.accountId , eventId: ticket.eventId})
    // @ts-ignore
    if (exists.id) {
      throw new Forbidden('You can only have one ticket to an event')
    }
    // TODO fix this atttempt to find the event capacity
    // @ts-ignore
    if(!exists.id){
      // find the event by it's Id
    const event = await eventsService.getById(ticket.eventId)
    // TODO check if there's capacity check to see if this value is null
    if (event.capacity <= 0){
      throw new BadRequest('This event is sold out')
    }
    // If there is capacity create a ticket
    if (event.capacity > 0){
      const newTicket = await dbContext.Tickets.create(ticket)
      await newTicket.populate('creator')
      await newTicket.populate('event')
      await newTicket.populate('account')
      await eventsService.modifyEventCapacity(ticket.eventId)
      return newTicket
    }
    }
  }
// TODO this is not working, might be the id
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
