import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class CommentsService {

  async getAll() {
    return await dbContext.Comments.find({}).populate('creator').populate('event')
  }

  async getAllComments(eventId) {
    const comments = await dbContext.Comments.find({eventId: eventId}).populate('creator').populate('event')
    return comments
  }

  async getById(id) {
    const comment = await dbContext.Comments.findById(id).populate('creator').populate('event')
    if (!comment){
      throw new BadRequest('Invalid id')
    }
    return comment
  }

  async create(body) {
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator')
    await comment.populate('event')
    return comment
  }

  async remove(id, userid){
    const comment = await this.getById(id)
    if (comment.creatorId.toString() !== userid) {
      throw new Forbidden('Not yours to delete')
    }
    await comment.remove()
  }

}

export const commentsService = new CommentsService()
