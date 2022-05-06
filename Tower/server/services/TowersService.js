import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class TowersService {

  async getAll() {
    return await dbContext.Towers.find({}).populate('creator')
  }

  async getById(id) {
    const tower = await dbContext.Towers.findById(id).populate('creator')
    if (!tower){
      throw new BadRequest('Invalid Id')
    }
  }
  async create(body) {
    const tower = await dbContext.Towers.create(body)
    await tower.populate('creator')
    return tower
  }
  async edit(edits) {
    const original = await this.getById(edits.id)
    if (original.creatorId.toString() !== edits.creatorId) {
      throw new Forbidden('This is not yours to edit')
    }
    original.name = edits.name || original.name
    original.description = edits.description || original.description
    original.coverImg = edits.coverImg || original.coverImg
    original.location = edits.location || original.location
    original.capacity = edits.capacity || original.capacity
    original.startDate = edits.startDate || original.startDate
    original.isCancelled = edits.isCancelled == null ? original.isComplete : edits.isComplete
    original.type = edits.type || original.type
    await original.save()
    return original
  }

}

export const towersService = new TowersService()
