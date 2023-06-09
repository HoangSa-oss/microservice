import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Payment } from '../model/payment';
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
} from '@saigon/common';
import {stripe} from '../stripe'
import { Order } from '../model/order';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const {token,orderId} = req.body
    const order = await Order.findById(orderId)

    if(!order){
      throw new NotFoundError()
    }
    if(order.userId!==req.currentUser!.id){
      throw new NotAuthorizedError()

    }
    if(order.status === OrderStatus.Cancelled){
      throw new BadRequestError('Canot pay for an cancelled order')
    }
    const charge = await stripe.charges.create({
      currency:'usd',
      amount: order.price * 100,
      source:token
    })
    const payment = Payment.build({
      orderId,
      stripeId:charge.id
    })
    payment.save()
    res.send({success:true})
  }
);

export { router as createChargeRouter };
