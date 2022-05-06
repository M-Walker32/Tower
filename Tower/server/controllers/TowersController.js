import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { towersService } from "../services/TowersService.js"
import { BadRequest } from "../utils/Errors.js"

export class TowersController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const towers = await towersService.getAll()
      return res.send(towers)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const tower = await towersService.getById(req.params.id)
      return res.send(tower)
    } catch (error) {
      next (error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const tower = await towersService.create(req.body)
      return res.send(tower)
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const tower = await towersService.edit(req.body)
      return res.send(tower)
    } catch (error) {
      next(error)
    }
  }
  async remove(req,res,next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const tower = await towersService.remove(req.body)
      return res.send(tower)
    } catch (error) {
      next(error)
    }
  }
  
}
