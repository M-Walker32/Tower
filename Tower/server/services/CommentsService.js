import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class CommentsService {

  async getAll() {
    return await dbContext.Comments.find({}).populate('creator').populate('tower')
  }

  async getById(id) {
    const comment = await dbContext.Comments.findById(id).populate('creator').populate('tower')
    if (!comment){
      throw new BadRequest('Invalid id')
    }
    return comment
  }

  async create(body) {
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator')
    await comment.populate('tower')
    return comment
  }

  async remove(id, userid){
  
    // if (comment.creatorId !== userid) {
    //   throw new Forbidden('Not yours to delete')
    // }
    await dbContext.Comments.findByIdAndDelete(id)
  }

}

export const commentsService = new CommentsService()
