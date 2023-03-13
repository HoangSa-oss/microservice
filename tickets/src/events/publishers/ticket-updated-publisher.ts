import { Publisher, Subjects, TicketUpdatedEvent } from '@saigon/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

