import { Publisher,OrderStatus,OrderCancelledEvent,Subjects } from "@saigon/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}