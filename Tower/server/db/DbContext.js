import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TowerSchema} from '../models/Tower.js'
import { TicketSchema} from '../models/Ticket.js'
import { CommentSchema} from '../models/Comment.js'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Towers = mongoose.model('Tower', TowerSchema, 'towers')
  Tickets = mongoose.model('Ticket', TicketSchema, 'tickets')
  Comments = mongoose.model('Comment', CommentSchema, 'comments')
}

export const dbContext = new DbContext()
