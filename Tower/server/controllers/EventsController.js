import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { eventsService } from "../services/EventsService.js"
import { commentsService } from "../services/CommentsService.js"
// import { ticketsService } from "../services/TicketsService.js"
import { BadRequest } from "../utils/Errors.js"
import { ticketsService } from "../services/TicketsService.js"

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/tickets', this.getTicketsByEvent)
      .get('/:id/comments', this.getCommentsByEvent)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.cancel)
  }

  async getAll(req, res, next) {
    try {
      const events = await eventsService.getAll()
      res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      req.body.id = req.params.id
      const event = await eventsService.getById(req.params.id)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async getCommentsByEvent(req, res, next) {
    try {
      const comments = await commentsService.getAllComments(req.params.id)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getTicketsByEvent(req, res, next) {
    try {
      const tickets = await ticketsService.getTicketsByEvent(req.params.id)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.create(req.body)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.edit(req.body)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async cancel(req,res,next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.remove(req.body)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  
}
