import { Listener,Subjects,ExpirationCompleteEvent, OrderStatus } from "@saigon/common";
import { queueGroupName } from "./queue_group_name";
import { Message } from "node-nats-streaming";
import { Order } from "../../model/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent>{
    queueGroupName = queueGroupName;
    subject:Subjects.ExpirationComplete = Subjects.ExpirationComplete
    async onMessage(data:ExpirationCompleteEvent['data'],msg:Message){
        const order = await Order.findById(data.orderId).populate('ticket')
        if(!order){
            throw new Error('Order not found')
        }
        console.log('concac')
        console.log(order)
        order.set({
            status:OrderStatus.Cancelled,
        })
        await order.save()
        new OrderCancelledPublisher(this.client).publish({
            id:order.id,
            version:order.version,
            ticket:{
                id:order.ticket.id
            }
        })
        msg.ack()
    }
}