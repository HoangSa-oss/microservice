import express ,{Request,Response} from 'express'
import { body } from 'express-validator'
import { requireAuth ,validateRequest} from '@saigon/common'
const router = express.Router()
import {Ticket} from '../models/ticket'
import {TicketCreatedPublisher} from'../events/publishers/ticket-created-publisher'
import {natsWrapper} from '../nats-wrapper'
router.post('/api/tickets',requireAuth,
[
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title is reuqired'),
    body('price')
        .isFloat({gt:0})
        .withMessage('Price must be greater than 0')

],validateRequest,
async(req:Request,res:Response)=>{
    console.log('concac')
    const {title,price }= req.body
    const ticket = Ticket.build({
        title,
        price,
        userId:req.currentUser!.id
    })
    await ticket.save()
    await new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title:ticket.title,
        price:ticket.price,
        userId:ticket.userId,
        version:ticket.version
    })
    res.status(201).send(ticket)
})
export {router as createTicketRouter} 