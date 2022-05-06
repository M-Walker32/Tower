import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { towersService } from "../services/TowersService.js"
import { BadRequest } from "../utils/Errors.js"
import { commentsService } from "../services/CommentsService.js"

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      // .get('events/:id/comments/:id')
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      // .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }
  async getAll(req, res, next) {
    try {
      const comments = await commentsService.getAll()
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const comment = await commentsService.getById(req.params.id)
      return res.send(comment)
    } catch (error) {
      next (error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.create(req.body)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }
  // async edit(req, res, next) {
  //   try {
  //     req.body.id = req.params.id
  //     req.body.creatorId = req.userInfo.id
  //     const comment = await commentsService.edit(req.body)
  //     return res.send(comment)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
  async remove(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.remove(req.body.id, req.creatorId.id)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

}