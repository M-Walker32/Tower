import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class TowersService {

  async getAll() {
    return await dbContext.Towers.find({}).populate('creator')
  }

  async getById(id) {
    const tower = await dbContext.Towers.findById(id).populate('creator')
    if (!tower){
      throw new BadRequest('Invalid Id tower is false')
    }
    return tower
  }
  async create(body) {
    const tower = await dbContext.Towers.create(body)
    await tower.populate('creator')
    return tower
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

async remove(tower) {
  const original = await this.getById(tower.id)
  if(original.isCanceled == true){
    throw new BadRequest('This event has been cancelled')
  }
  original.isCanceled = true
  await original.save()
  return original
}

}

export const towersService = new TowersService()
