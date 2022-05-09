import { toHandlers } from "vue"
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
  const comment = await api.post(`api/comments`, newComment)
  this.getComments(comment.data.eventId)
  return comment.data

}
async deleteComment(comment){
  const res = await api.delete('api/comments/'+comment.id)
  // logger.log(res.data)
  this.getComments(comment.eventId)

}
}
export const commentsService = new CommentsService()