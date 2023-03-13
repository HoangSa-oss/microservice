import { Publisher,OrderStatus,OrderCreatedEvent,Subjects } from "@saigon/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}