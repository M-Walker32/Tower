import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { eventsService } from "../services/EventsService.js"
import { BadRequest } from "../utils/Errors.js"
import { ticketsService } from "../services/TicketsService.js"

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.remove)
  }
  async getAll(req, res, next) {
    try {
      const tickets = await ticketsService.getAll()
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const ticket = await ticketsService.getById(req.params.id)
      return res.send(ticket)
    } catch (error) {
      next (error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.accountId = req.userInfo.id
      const ticket = await ticketsService.create(req.body)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      req.body.accountId = req.userInfo.id
      const ticket = await ticketsService.remove(req.params.id, req.userInfo.id)
      return res.send('Delorted!')
    } catch (error) {
      next(error)
    }
  }

}