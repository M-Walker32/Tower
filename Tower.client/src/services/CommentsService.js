import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService{
async getComments(id){
  const res = await api.get(`api/events/${id}/comments`)
  AppState.comments = res.data
  logger.log('comments', res.data)
}
async createComment(newComment){
  logger.log(newComment)
  const comment = await api.post(`api/events/${newComment.eventId}/comments`)
  logger.log(comment)
}
}
export const commentsService = new CommentsService()