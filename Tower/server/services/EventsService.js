import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class EventsService {
  async modifyEventCapacity(eventId) {
    const original = await this.getById(eventId)
    if(original.isCanceled == true){
      throw new BadRequest('This event has been cancelled')
    }
    original.capacity -= 1
    await original.save()
    return original
  }
  async modifyEventCapacity2(eventId) {
    const original = await this.getById(eventId)
    if(original.isCanceled == true){
      throw new BadRequest('This event has been cancelled')
    }
    original.capacity += 1
    await original.save()
    return original
  }

  async getAll() {
    return await dbContext.TowerEvents.find({}).populate('creator')
  }

  async getById(id) {
    const foundEvent = await dbContext.TowerEvents.findById(id)
    if (!foundEvent){
      throw new BadRequest('Invalid Id')
    }
    await foundEvent.populate('creator')
    return foundEvent
  }
  async create(body) {
    const event = await dbContext.TowerEvents.create(body)
    await event.populate('creator')
    return event
  }
  async edit(edits) {
    const original = await this.getById(edits.id)
    // @ts-ignore
    if (original.creatorId.toString() !== edits.creatorId) {
      throw new Forbidden('This is not yours to edit')
    }
    if(original.isCanceled == true){
      throw new BadRequest('This event has been cancelled')
    }
    // @ts-ignore
    original.name = edits.name || original.name
    // @ts-ignore
    original.description = edits.description || original.description
    // @ts-ignore
    original.coverImg = edits.coverImg || original.coverImg
    // @ts-ignore
    original.location = edits.location || original.location
    // @ts-ignore
    original.capacity = edits.capacity || original.capacity
    // @ts-ignore
    original.startDate = edits.startDate || original.startDate
    // @ts-ignore
    original.type = edits.type || original.type
    // @ts-ignore
    await original.save()
    return original
  }

async remove(event) {
  const original = await this.getById(event.id)
  if (original.creatorId.toString() !== event.creatorId) {
    throw new Forbidden('This is not yours to edit')
  }
  if(original.isCanceled == true){
    throw new BadRequest('This event has been cancelled')
  }
  original.isCanceled = true
  await original.save()
  return original
}

}

export const eventsService = new EventsService()
